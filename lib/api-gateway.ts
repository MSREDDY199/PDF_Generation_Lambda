import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface PdfGenerationProps {
    pdfLambdaFunction: IFunction
}

export class PdfGenerationGateway extends Construct {
    constructor(scope: Construct, id: string, props: PdfGenerationProps) {
        super(scope, id)

        this.createPdfGenerationApi(props.pdfLambdaFunction)

    }

    private createPdfGenerationApi(pdfLambdaFunction: IFunction) {
    
        const api = new LambdaRestApi(this, 'PdfGenerationApi', {
            restApiName: 'PdfGenerationApi',
            handler: pdfLambdaFunction,
            proxy: false,
            deploy: true,
            deployOptions: {
                variables: {
                    alias: "production"
                },
                description: "Production Stage"
            },

        });

        api.root.addMethod('GET');

    }
}