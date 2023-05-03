import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { ConfigParameters } from "../config";

export class ConfigsSampleStack extends cdk.Stack {
  readonly config: ConfigParameters;

  constructor(
    scope: Construct,
    id: string,
    config: ConfigParameters,
    props?: cdk.StackProps
  ) {
    super(scope, id, props);
    this.config = config;
    const vpc = new ec2.Vpc(this, "ConfigsSampleVpc", {
      ipAddresses: ec2.IpAddresses.cidr(this.config.VpcProp.Cidr),
    });
  }
}
