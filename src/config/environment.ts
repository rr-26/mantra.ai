const ENV_CONFIG = {
    development: {
      baseUrl: 'http://52.195.171.228:8080',
      timeout: 10000,
    },
    staging: {
      baseUrl: import.meta.env?.VITE_API_URL || 'https://staging-api.mantra.com',
      timeout: 10000,
    },
    production: {
      baseUrl: import.meta.env?.VITE_API_URL || 'https://prod-api.mantra.com',
      timeout: 10000,
    },
  } as const;
  
  const getEnvironment = () => {
    if (import.meta.env?.DEV) {
      return 'development';
    }
    if (import.meta.env?.PROD) {
      return 'production';
    }
    return 'development';
  };
  
  export type Environment = keyof typeof ENV_CONFIG;
  
  export const getCurrentConfig = () => {
    const env = getEnvironment() as Environment;
    return ENV_CONFIG[env];
  };