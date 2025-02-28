import dotenv from 'dotenv';

async function globalSetup(): Promise<void> {
  dotenv.config({ override: true });
  // eslint-disable-next-line no-console
  console.log('⚠️ URL:', process.env.BASE_URL);
}

export default globalSetup;
