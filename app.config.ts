import 'dotenv/config';

export default ({ config }: any) => ({
  ...config,
  extra: {
    ...(config?.extra ?? {}),
    API_KEY: process.env.API_KEY,
  },
});

