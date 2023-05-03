const arrayEnvironments = ["dev", "prd"] as const;
export type Environment = (typeof arrayEnvironments)[number];

export type ConfigParameters = {
  VpcProp: {
    Cidr: string;
  };
};

type Configs = {
  [key in Environment]: ConfigParameters;
};

const configs: Configs = {
  dev: {
    VpcProp: {
      Cidr: "10.10.0.0/16",
    },
  },
  prd: {
    VpcProp: {
      Cidr: "10.20.0.0/16",
    },
  },
};

export const validateEnvironment = (
  environment: string | null | undefined
): boolean => {
  if (environment == null) {
    return false;
  }
  const environmentSet = new Set<string>(arrayEnvironments);
  return environmentSet.has(environment);
};

export const getConfigs = (env: Environment): ConfigParameters => {
  return configs[env];
};
