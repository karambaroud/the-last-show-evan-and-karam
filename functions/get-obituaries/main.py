# add your get-obituaries function here

# add your get-notes function here

import json
import boto3
from boto3.dynamodb.conditions import Key
import urllib.request

dynamodb_resource = boto3.resource("dynamodb")
table = dynamodb_resource.Table("obituaries-30146985")

def get_handler(event, context):
    
    access_token = event["headers"]["authorization"].split()[1]

    
    response =  urllib.request.urlopen()
    data = json.loads(response.read().decode())

    
    queryParameter = event["queryStringParameters"]

    try:
        return {
            "statusCode": 200,
                "body": json.dumps({
                    "message": "success",
                    "notes": "something"
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
