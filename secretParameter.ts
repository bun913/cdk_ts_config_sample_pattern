import { SSM } from "@aws-sdk/client-ssm";
import { Environment } from "./configSecret";

export class SecretParameter {
  readonly env: Environment;
  readonly project: string;
  readonly region: string;
  readonly client: SSM;

  constructor(env: Environment, project: string, region: string) {
    this.env = env;
    this.project = project;
    this.region = region;
    this.client = new SSM({ region: this.region });
  }

  async getSecureString(name: string): Promise<string> {
    const path = `/${this.project}/${this.env}/${name}`;
    const params = {
      Name: path,
      WithDecryption: true,
    };
    const response = await this.client.getParameter(params);
    if (response.Parameter?.Value == undefined) {
      throw new Error(`Parameter Store ${path} is not found`);
    }
    return response.Parameter.Value;
  }

  async getStringList(name: string): Promise<string[]> {
    const path = `/${this.project}/${this.env}/${name}`;
    const params = {
      Name: path,
      WithDecryption: true,
    };
    const response = await this.client.getParameter(params);
    if (response.Parameter?.Value == undefined) {
      throw new Error(`Parameter Store ${path} is not found`);
    }
    return response.Parameter.Value.split(",");
  }
}
