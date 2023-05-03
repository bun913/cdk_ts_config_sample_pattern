import * as cdk from "aws-cdk-lib";
import { ConfigsSampleStack } from "./stacks/configSampleStack";
import { Construct } from "constructs";
import { validateEnvironment, getConfigs } from "./config";

const app = new cdk.App();
const env = app.node.tryGetContext("env") || "dev";
if (!validateEnvironment(env)) {
  throw new Error("environment context is invalid");
}
const config = getConfigs(env);

const sampleConfigStack = new ConfigsSampleStack(
  app,
  `ConfigsSampleStack-${env}`,
  config,
  {
    env: {
      region: "ap-northeast-1",
      account: process.env.CDK_DEFAULT_ACCOUNT,
    },
  }
);
cdk.Tags.of(sampleConfigStack).add("project", "config-sample");
cdk.Tags.of(sampleConfigStack).add("env", env);
