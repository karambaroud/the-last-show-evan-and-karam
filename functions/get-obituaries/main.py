# add your get-obituaries function here
import json
import boto3

dynamodb_resource = boto3.resource("dynamodb")
table = dynamodb_resource.Table("the-last-show-30147741")

def get_handler(event, context):
    try:
        res = table.scan()
        data = res["Items"]

        # Scan has 1 MB limit so this loop will make sure to fetch all results
        while 'LastEvaluatedKey' in res:
            res = table.scan(ExclusiveStartKey=res['LastEvaluatedKey'])
            data.extend(res['Items'])

        return {
            "statusCode": 200,
                "body": json.dumps({
                    "message": "success",
                    "obituaries": data
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

