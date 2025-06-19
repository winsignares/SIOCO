import axios from 'axios';

export async function GetDentists(subdomain, token) {
  try {

    const baseURL = `http://${subdomain}:8000`;

    const response = await axios.get(`${baseURL}/dentists/`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching dentists:', error);
    throw error;
  }
}
