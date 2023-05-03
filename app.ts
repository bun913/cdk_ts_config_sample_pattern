import * as cdk from "aws-cdk-lib";
import { ConfigsSampleStack } from "./stacks/configSampleStack";
import { Construct } from "constructs";
// import { getSystemConfig } from "./config";
import { getSystemConfig } from "./configSecret";

async function main() {
  const app = new cdk.App();

  const env = app.node.tryGetContext("env") || "dev";
  const project = "config-sample";
  const region = "ap-northeast-1";

  const config = await getSystemConfig(env);
  const sampleConfigStack = new ConfigsSampleStack(
    app,
    `ConfigsSampleStack-${env}`,
    config,
    {
      env: {
        region: region,
        account: process.env.CDK_DEFAULT_ACCOUNT,
      },
    }
  );
  cdk.Tags.of(sampleConfigStack).add("project", "config-sample");
  cdk.Tags.of(sampleConfigStack).add("env", env);
}

main();
