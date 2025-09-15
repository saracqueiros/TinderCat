import { API_URL, API_KEY } from "../config/env";

const request = async <T>(method: string, endpoint: string, params?: any) => {

  try {
    const url = API_URL + endpoint;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    };

    if (!API_KEY) {
      console.error('API_KEY is not set');
      return null;
    }

    const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(params),
    });
    
    let jsonResponse = null;
    try {
        const textContent = await response.text();
        jsonResponse = JSON.parse(textContent);
    } catch {
        console.error('Error parsing JSON response');
        jsonResponse = {};
    }
    return jsonResponse;
  } catch (error) {
      console.error('Error fetching data', error);
      return null;
  }
};

export default request;
