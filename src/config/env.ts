import Constants from 'expo-constants';

export const API_URL = "https://api.thecatapi.com/v1";

const extra = (Constants?.expoConfig as any)?.extra ?? (Constants as any)?.manifest?.extra ?? {};
export const API_KEY: string | undefined = extra.API_KEY;