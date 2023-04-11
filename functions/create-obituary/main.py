# add your create-obituary function here
import json 
import boto3
import requests
from requests_toolbelt.multipart import decoder
import base64
import hashlib
import time

# Connects to AWS SSM
ssm_client = boto3.client("ssm")

# Gets parameters from AWS SSM
ssm_res = ssm_client.get_parameters_by_path(
    Path='/the-last-show/',
    Recursive=True,
    WithDecryption=True
)
ssm_res = {key["Name"]: key["Value"] for key in ssm_res["Parameters"]}

# Connects to AWS Polly
polly_client = boto3.client("polly")

# Connects to AWS DynamoDB
dynamodb_resource = boto3.resource("dynamodb")
table = dynamodb_resource.Table("the-last-show-30147741")

def create_handler(event, context):

    body = event["body"]
    if event["isBase64Encoded"]:
        body = base64.b64decode(body)

    try:
        content_type = event["headers"]["content-type"]
        data = decoder.MultipartDecoder(body, content_type)

        binary_data = [part.content for part in data.parts]
        id = binary_data[0].decode()
        name = binary_data[1].decode()
        born = binary_data[2].decode()
        died = binary_data[3].decode()

        # Generates biography
        gpt_response = requests.post("https://api.openai.com/v1/completions", 
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {ssm_res['/the-last-show/gpt-key']}"
            },
            json={
                "model": "text-curie-001",
                "prompt": f"write an obituary about a fictional character named {name} who was born on {born} and died on {died}.",
                "max_tokens": 600
            })
        biography = gpt_response.json()["choices"][0]["text"].strip()

        # Convert biography to speech
        polly_response = polly_client.synthesize_speech(
            OutputFormat='mp3',
            SampleRate='8000',
            Text=biography,
            TextType='text',
            VoiceId='Joanna',
        )
        audio = polly_response["AudioStream"].read() # Audio now contains binary data

        # Generate timestamp and signature for cloudinary
        timestamp = int(time.time())
        cloudinary_signature = hashlib.sha1(f"timestamp={timestamp}{ssm_res['/the-last-show/cloudinary-secret']}".encode('utf-8')).hexdigest()

        # Write audio to cloudinary
        audio_response = requests.post(f"https://api.cloudinary.com/v1_1/{ssm_res['/the-last-show/cloud-name']}/video/upload", 
            params={
                "api_key": ssm_res['/the-last-show/cloudinary-key'],
                "timestamp": timestamp,
                "signature": cloudinary_signature
            },
            files={
                "file": audio
            })
        audio_url = audio_response.json()["secure_url"]

        # Write image to cloudinary
        image_response = requests.post(f"https://api.cloudinary.com/v1_1/{ssm_res['/the-last-show/cloud-name']}/image/upload", 
            params={
                "api_key": ssm_res['/the-last-show/cloudinary-key'],
                "timestamp": timestamp,
                "signature": cloudinary_signature
            },
            files={
                "file": binary_data[4]
            })
        image_url = image_response.json()["secure_url"]
        index = image_url.find("upload/")
        image_url = image_url[:index + 7] + "e_art:zorro/" + image_url[index + 7:] # Apply zorro filter to image

        # Write to dynamodb
        newBody = {
            "id": id,
            "name": name,
            "born": born,
            "died": died,
            "biography": biography,
            "audio": audio_url,
            "image": image_url
        }

        table.put_item(Item=newBody)
        return {
            "statusCode": 200,
                "body": json.dumps({
                    "message": "success",
                    "biography": biography,
                    "audio": audio_url,
                    "image": image_url
                })
        }

    except Exception as exp:
        print(f"exception: {exp}")
        return {
            "statusCode": 500,
                "body": json.dumps({
                    "message":str(exp)
            })
        }
