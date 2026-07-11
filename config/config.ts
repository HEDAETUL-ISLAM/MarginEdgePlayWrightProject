import devConfig from './dev.json';

function loadConfig() {
  const config = { ...devConfig };
  const env = process.env.TEST_ENV;

  if (env) {
    config.baseUrl = `https://${env}.dev.marginedge.com`;
    console.log(`[Config] Using environment: ${env} → ${config.baseUrl}`);
  } else {
    console.log(`[Config] No TEST_ENV set, using default: ${config.baseUrl}`);
  }

  return config;
}

export const config = loadConfig();
