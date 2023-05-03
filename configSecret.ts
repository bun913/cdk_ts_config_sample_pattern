// 機密情報をパラメーターストアから取得することを意識したパターン
import { SecretParameter } from "./secretParameter";

const arrayEnvironments = ["dev", "prd"] as const;
export type Environment = (typeof arrayEnvironments)[number];

export type ConfigParameters = {
  VpcProp: {
    Cidr: string;
    MaxAzs: number;
  };
};

interface ISytemConfig {
  readonly env: Environment;
  readonly secretParameter: SecretParameter;
  getSystemConfig(): Promise<ConfigParameters> ;
}

class DevConfig implements ISytemConfig {
  readonly env = "dev"
  readonly secretParameter: SecretParameter;

  constructor(project: string, region: string) {
    const secretParameter = new SecretParameter(this.env, project, region);
    this.secretParameter = secretParameter;
  }

  async getSystemConfig(): Promise<ConfigParameters> {
    const maxazs = await this.secretParameter.getSecureString("MaxAzs");
    return {
      VpcProp: {
        Cidr: "10.10.0.0/16",
        MaxAzs: Number(maxazs),
      },
    };
  }
}

class PrdConfig implements ISytemConfig {
  readonly env = "prd"
  readonly secretParameter: SecretParameter;

  constructor(project: string, region: string) {
    const secretParameter = new SecretParameter(this.env, project, region);
    this.secretParameter = secretParameter;
  }

  async getSystemConfig(): Promise<ConfigParameters> {
    const maxazs = await this.secretParameter.getSecureString("MaxAzs");
    return {
      VpcProp: {
        Cidr: "10.20.0.0/16",
        MaxAzs: Number(maxazs),
      },
    };
  }
}

const SystemMap = new Map<Environment, ISytemConfig>([
  ["dev", new DevConfig("config-sample", "ap-northeast-1")],
  ["prd", new PrdConfig("config-sample", "ap-northeast-1")],
]);

export const getSystemConfig = async (env: Environment): Promise<ConfigParameters>  => {
  const system = SystemMap.get(env);
  if (system == null) {
    throw new Error("Please specify like `cdk deploy -c env=dev``");
  }
  return await system.getSystemConfig();
};
