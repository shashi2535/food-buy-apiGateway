export const getEnv = (key: string) => {
    const envValue = process.env[key];
    if (!envValue) {
      throw new Error(`${key} is not defined in env`);
    }
    return envValue;
  };