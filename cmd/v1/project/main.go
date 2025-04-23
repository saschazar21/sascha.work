package main

import (
	"net/http"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/awslabs/aws-lambda-go-api-proxy/httpadapter"
	v1 "github.com/saschazar21/sascha.work/api/v1"
)

func main() {
	lambda.Start(httpadapter.New(http.HandlerFunc(v1.HandleProject)).ProxyWithContext)
}
