terraform {
  required_providers {
    aws = {
      version = ">= 4.0.0"
      source  = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = "ca-central-1"
}

# two lambda functions w/ function url
# one dynamodb table
# roles and policies as needed
# step functions (if you're going for the bonus marks)

# the locals block is used to declare constants that 
# you can use throughout your code
locals {
  create_function_name = "create-obituary-30146985"
  get_function_name = "get-obituaries-30146985"

  create_handler_name  = "main.create_handler"
  get_handler_name = "main.get_handler"

  create_artifact_name = "create-artifact.zip"
  get_artifact_name = "get-artifact.zip"
}

# read the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dynamodb_table
resource "aws_dynamodb_table" "the-last-show-30147741" {
  name         = "the-last-show-30147741"
  billing_mode = "PROVISIONED"

  # up to 8KB read per second (eventually consistent)
  read_capacity = 1

  # up to 1KB per second
  write_capacity = 1

  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

# create a role for the Lambda function to assume
# every service on AWS that wants to call other AWS services should first assume a role and
# then any policy attached to the role will give permissions
# to the service so it can interact with other AWS services
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role
resource "aws_iam_role" "lambda" {
  name               = "iam-for-lambda-the-last-show"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

# create archive file from main.py
data "archive_file" "get-archive" {
  type = "zip"
  # this file (main.py) needs to exist in the same folder as this 
  # Terraform configuration file
  source_file = "../functions/get-obituaries/main.py"
  output_path = local.get_artifact_name
}

data "archive_file" "create-archive" {
  type = "zip"
  # Using source-dir here because we'll most likely need to download and include all 
  # dependencies in the create-obituary folder
  source_dir = "../functions/create-obituary" 
  output_path = local.create_artifact_name
}

# create a Lambda function
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
resource "aws_lambda_function" "get-obituaries-30146985" {
  role             = aws_iam_role.lambda.arn
  function_name    = local.get_function_name
  handler          = local.get_handler_name
  filename         = local.get_artifact_name
  source_code_hash = data.archive_file.get-archive.output_base64sha256

  # see all available runtimes here: https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-Runtime
  runtime = "python3.9"
}

resource "aws_lambda_function" "create-obituary-30146985" {
  role             = aws_iam_role.lambda.arn
  function_name    = local.create_function_name
  handler          = local.create_handler_name
  filename         = local.create_artifact_name
  source_code_hash = data.archive_file.create-archive.output_base64sha256
  timeout          = 20

  # see all available runtimes here: https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html#SSS-CreateFunction-request-Runtime
  runtime = "python3.9"
}

# create a policy for publishing logs to CloudWatch
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy
resource "aws_iam_policy" "policy" {
  name        = "the-last-show-policy"
  description = "IAM policy for logging from a lambda"

# We might need more actions here, maybe to access cloudinary keys and other stuff
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "dynamodb:Query"
      ],
      "Resource": ["arn:aws:logs:*:*:*", "${aws_dynamodb_table.the-last-show-30147741.arn}"],
      "Effect": "Allow"
    }
  ]
}
EOF
}

# attach the above policy to the function role
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy_attachment
resource "aws_iam_role_policy_attachment" "policy_attachment" {
  role       = aws_iam_role.lambda.name
  policy_arn = aws_iam_policy.policy.arn
}

# create a Function URL for Lambda 
# see the docs: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function_url
resource "aws_lambda_function_url" "create-url" {
  function_name      = aws_lambda_function.create-obituary-30146985.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["POST"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}

resource "aws_lambda_function_url" "get-url" {
  function_name      = aws_lambda_function.get-obituaries-30146985.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}

# show the Function URL after creation
output "get_obituaries_url_output" {
    value = aws_lambda_function_url.get-url.function_url
}

output "create_obituary_url_output" {
    value = aws_lambda_function_url.create-url.function_url
}