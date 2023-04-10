# add your create-obituary function here
import json 
import boto3
import requests

client = boto3.client("ssm")

response = client.get_parameters_by_path(
    Path='/the-last-show/',
    Recursive=True,
    WithDecryption=True
)

response = {key["Name"]: key["Value"] for key in response["Parameters"]}

dynamodb_resource = boto3.resource("dynamodb")
table = dynamodb_resource.Table("the-last-show-30147741")

def create_handler(event, context):
        
    body = json.loads(event["body"])
    # Body should contain things like name, date born, date died, image
    # We'll syntehsize speech from amazon polly
    # We'll pass the polly speech and image to cloudinary for storage
    # We'll pass the prompt to the ChatGPT API and store it in the dynamoDB as well

    try:
        table.put_item(Item=body)
        return {
            "statusCode": 200,
                "body": json.dumps({
                    "message": "success"
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