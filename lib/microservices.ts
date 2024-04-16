import { Duration } from "aws-cdk-lib";
import { Code, IFunction, LayerVersion, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

export class Pdf_Lambda extends Construct {

    public readonly pdfFunction: IFunction;

    constructor(scope: Construct, id: string) {
        super(scope, id)

        this.pdfFunction = this.createPdfLambdaFunction();

    }

    private createPdfLambdaFunction(): NodejsFunction {

        const pdfLayer = new LayerVersion(this, "pdfLayer", {
            layerVersionName: "pdfGenerationLayer",
            code: Code.fromAsset('/POCs/pdf_generation-lambda/src/sparticuz_chrome'),
            compatibleRuntimes: [Runtime.NODEJS_18_X]
        })

        const pdfLambdaFunctionProps: NodejsFunctionProps = {
            bundling: {
                externalModules: [
                    'aws-sdk'
                ]
            },
            runtime: Runtime.NODEJS_18_X,
            timeout: Duration.seconds(120),
            layers: [pdfLayer]
        }

        const pdfLambdaFunction = new NodejsFunction(this, 'pdfLambdaFunction', {
            entry: join(__dirname, `/../src/pdf_generation-lambda/index.js`),
            ...pdfLambdaFunctionProps,
            bundling: {
                externalModules: ['@sparticuz/chromium'], // Mark chrome-aws-lambda as external
            }
        })

        return pdfLambdaFunction;
    }
}