import * as cdk from "aws-cdk-lib";
import { ConfigsSampleStack } from "./stacks/configSampleStack";
import { Construct } from "constructs";

const app = new cdk.App();
const sampleConfigStack = new ConfigsSampleStack(app, "ConfigsSampleStack", {
  env: {
    region: "ap-northeast-1",
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
cdk.Tags.of(sampleConfigStack).add("project", "config-sample");
cdk.Tags.of(sampleConfigStack).add("env", "dev");
