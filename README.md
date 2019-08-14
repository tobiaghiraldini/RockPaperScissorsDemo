# Rock Paper Scissors api on AWS Lambda in TypeScript

This sample uses the [Serverless Application Framework](https://serverless.com/) to implement an AWS Lambda function in TypeScript, deploy it via CloudFormation, and publish it through API Gateway.

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![Dependencies](https://david-dm.org/balassy/aws-lambda-typescript/status.svg)](https://david-dm.org/balassy/aws-lambda-typescript)
[![DevDependencies](https://david-dm.org/balassy/aws-lambda-typescript/dev-status.svg)](https://david-dm.org/balassy/aws-lambda-typescript#type=dev)
[![codebeat badge](https://codebeat.co/badges/cd3e0118-3d7f-4c0d-8d27-14d05df5a356)](https://codebeat.co/projects/github-com-balassy-aws-lambda-typescript-master)
[![Greenkeeper badge](https://badges.greenkeeper.io/balassy/aws-lambda-typescript.svg)](https://greenkeeper.io/)
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/2154/badge)](https://bestpractices.coreinfrastructure.org/projects/2154)

## Features

- Full **[TypeScript](https://www.typescriptlang.org/)** codebase with **strict** type annotation - _get as many compile time errors as possible._
- **Deployment to AWS** from the command line with [Serverless](https://serverless.com/) - _just run an npm script._
- Optional Publishing to your **custom [Route53](https://aws.amazon.com/route53/) domain name** - _for API URLs that live forever._
- **Offline** execution - _call your endpoints without deploying them to AWS._
- Minimal IAM policy to follow the **principle of least privilege** - _because with great power comes great responsibility_.
- **Code analysis** with [TSLint](https://palantir.github.io/tslint/)
- **Unit testing** with [Mocha](https://mochajs.org/), mocking with [ts-mockito](https://github.com/NagRock/ts-mockito) - _be free to change your implementation._
- **Integration testing** after release - _to verify your deployment._
- Generated **[Swagger](https://swagger.io/) documentation** for the endpoints, which works well with [SwaggerHub](https://app.swaggerhub.com) - _the expected description of your API._
- Multiple layers in the code to **separate concerns** and independently test them - _avoid monolith and complexity._
- **Health check** endpoints - _to quickly test your service._
- **Dependency checks** and continuous update with [David](https://david-dm.org/), [Greenkeeper](https://greenkeeper.io/) and [Snyk](https://snyk.io)- _because the majority of your app is not your code._
- **[EditorConfig](http://editorconfig.org/)** settings - _for consistent coding styles between different editors._

## Setup

1. **Install [Node.js](https://nodejs.org).**

2. **Install the [Serverless Application Framework](https://serverless.com/) as a globally available package:**

```bash
npm install serverless -g
```

Verify that Serverless was installed correctly:

```
serverless -v
```

3. **Setup AWS credentials:**

  * Create a new IAM Policy in AWS using the `aws-setup/aws-policy.json` file. Note that the file contains placeholders for your `<account_no>`, `<region>`, `<service_name>`, and `<your_deployment_bucket>`.
  You can replace all those `Resource` ARNs with `*`, if you intentionally don't want to follow the Principle of Least Privilege, but want to avoid permission issues.
  (If you prefer minimal permissions, just like me, you may want to follow [Issue 1439: Narrowing the Serverless IAM Deployment Policy](https://github.com/serverless/serverless/issues/1439). )

  * Create a new IAM User for Programmatic Access only, assign the previously created policy to it, and get the Access Key ID and the Secret Access Key of the user.

  * Save the credentials to the `~/.aws/credentials` file:

  ```bash
  serverless config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY
  ```

  You can read more about setting up AWS Credentials on the [AWS - Credentials page](https://serverless.com/framework/docs/providers/aws/guide/credentials/) of the Serverless Guide.

4. **Clone this repository.**

5. **Install the dependencies:**

```bash
npm install
```

## What you can find in the code

### Endpoints

This project shows example Lambda function implementations with the following layers (see the `src/game` folder):

- **Handler**: The handler is the endpoint that is called by AWS when it executes your Lambda. See `game.ts`.
- **Controller**: The controller is responsible for transforming any operation result to an HTTP response. See `game.controller.ts`.
- **Service**: The service is responsible for implementing the business logic, and provide the operation result. See `game.service.ts`.
- **Repository**: The repository is responsible for providing the data for the service. See `game.repository.ts`.
- **Rules**: The rule is responsible for providing the game rule implementation. See `game.rules.ts`.

All layers have unit tests with mocking the underlying layers.

Additional terms:

- **Response**: The HTTP output for an endpoint call. It includes the HTTP status code, the response headers and the response body. The controller is responsible for building the response, using the `ResponseBuilder` helper class.
- **Result**: The outcome of the service call. It can be a success result or an error result.

To understand the code, open `src/game/game.ts`, find the `getGameResult` function and follow the call chain.

### Tests cases

- **GameController**:
    - Response Status Code check
    - Response Result check
- **GameService**:
    - IsValid check
    - Result check

### Swagger export

The `src/swagger` folder contains the `/swagger.json` endpoint which exports the documentation of the API in [Swagger](https://swagger.io/) format. Call the endpoint after deploying your API and paste the response JSON into the [Swagger Editor](https://editor.swagger.io) to display it in a friendly way.

### Health check endpoints

The `/health/check` and the `/health/check/detailed` endpoints in the `src/health` folder are provided to run quick checks on your API after deployment.

## Developer tasks

Frequently used `npm script`s:

| Script name   | Description                                                                                                         |
|---------------|---------------------------------------------------------------------------------------------------------------------|
| `analyse`     | Runs all code analysis tools, including linters and unit tests.                                                     |
| `deploy`      | Runs all analysis tools, creates the deployment package, installs it on AWS and finally runs the integration tests. |
| `start`       | Runs the service locally, so you can call your API endpoints on http://localhost.                                   |

Additional useful `npm script`s:

| Script name        | Description                                                                                                                     |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `build`            | Runs all pre-deploy analysis and creates the deployment package, but does not install it onto AWS.                              |
| `clean`            | Removes all tool-generated files and folders (build output, coverage report etc.). Automatically runs as part of other scripts. |
| `deploy:init`      | Creates the domain in Route53. Required to manually execute once.                                                               |
| `lint`             | Runs the static code analyzers. Automatically runs before deployment.                                                           |
| `test`             | Runs the unit tests. Automatically runs before deployment.                                                                      |
| `test:integration` | Runs the integration tests. Automatically runs after deployment.                                                                |

### Test the service locally

**To invoke the Lambda function locally, run:**

```
serverless invoke local --function getGameResult
```

**To run the service locally, run:**

```bash
npm start
```

or

```bash
serverless offline start
```

This command will not terminate, but will keep running a webserver that you can use to locally test your service. Verify that the service runs perfectly by opening the `http://localhost:3000` URL in your browser. The console window will log your requests.

You can modify your code after running this command, Serverless will automatically recognize the changes and recompile your code.

### Deploy to AWS

**To create a custom domain for your service in AWS, run this command once:**

```bash
npm run deploy:init
```

According to AWS, after this command it may take up to 40 minutes to initialize the domain with a CloudFront distribution. In practice it usually takes about 10 minutes.

**To deploy the service to AWS, run:**

```bash
serverless deploy
```

or you can use the NPM script alias, which is recommended, because it runs the analysers (linter + tests) before deployment, and integration tests after deployment:

```bash
npm run deploy
```

Verify that the deployment is completed successfully by opening the URL displayed in your console window in your browser. To see all resources created in AWS navigate to CloudFormation in the AWS Console and look for the stack named with the name of your service you specified in Step 6.

**To download the Swagger description** of your service, open the following URL in your browser:

```
https://<your_custom_domain_name>/api/swagger.json
```

Note that this endpoint always downloads the Swagger documentation from the live, published API, even if the code is running locally!

If you don't want to deploy your code, just want to peek into the deployment package, you can run:

```bash
npm run build
```

This command is not only an alias to `serverless package`, but also runs all analyzers that the deploy process also runs.

### Run linter

**To check your codebase with TSLint, run:**

```bash
npm run lint
```

The linter automatically checks your code before deployment, so you don't need to run it manually.

### Run unit tests

**To check your code with unit tests, run:**

```
npm test
```

The unit tests are automatically running before deployment, so you don't need to run them manually.

### Run integration tests

**To verify that your deployment completed successfully, run:**

```
npm run test:integration
```

The integration tests are automatically running after deployment, so you don't need to run them manually.

### View the documentation

To view the generated Swagger documentation, deploy your API or start it locally, and then call the `/swagger.json` endpoint.

### Demo Deploy

```bash
Serverless: Compiling with Typescript...
Serverless: Using local tsconfig.json
Serverless: Typescript compiled.
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service rockpaperscissors.zip file to S3 (24.38 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
....................................
Serverless: Stack update finished...
Service Information
service: rockpaperscissors
stage: demo
region: eu-central-1
stack: rockpaperscissors-demo
resources: 37
api keys:
  None
endpoints:
  GET - https://1vevegreue.execute-api.eu-central-1.amazonaws.com/demo/swagger.json
  GET - https://1vevegreue.execute-api.eu-central-1.amazonaws.com/demo/health/check
  GET - https://1vevegreue.execute-api.eu-central-1.amazonaws.com/demo/health/detailed
  POST - https://1vevegreue.execute-api.eu-central-1.amazonaws.com/demo/game
functions:
  getSwaggerJson: rockpaperscissors-demo-getSwaggerJson
  getHealthCheck: rockpaperscissors-demo-getHealthCheck
  getHealthCheckDetailed: rockpaperscissors-demo-getHealthCheckDetailed
  getResult: rockpaperscissors-demo-getResult
layers:
  None
-------------------
documentation version already exists, skipping upload
Serverless: Stack Output saved to file: .serverless/output.json
Serverless: Removing old service artifacts from S3...
Serverless: Run the "serverless" command to setup monitoring, troubleshooting and testing.

```

### Live Demo endpoints

[Swagger](https://1vevegreue.execute-api.eu-central-1.amazonaws.com/demo/swagger.json)
[Health check](https://1vevegreue.execute-api.eu-central-1.amazonaws.com/demo/health/check)
[Health check detailed](https://1vevegreue.execute-api.eu-central-1.amazonaws.com/demo/health/detailed)
[Game api demo](https://1vevegreue.execute-api.eu-central-1.amazonaws.com/demo/game)
