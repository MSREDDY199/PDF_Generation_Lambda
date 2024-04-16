import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Pdf_Lambda } from './microservices';
import { PdfGenerationGateway } from './api-gateway';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class PdfGenerationLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const microservices = new Pdf_Lambda(this, 'Microservices')
    const api_gateway = new PdfGenerationGateway(this, "Api-Gateway", {
      pdfLambdaFunction : microservices.pdfFunction
    })
  }
}
