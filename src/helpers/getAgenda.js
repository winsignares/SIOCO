import axios from 'axios';

export async function GetAgenda(subdomain, token, idDentista) {
    try {
        const baseURL = `http://${subdomain}:8000`;

        const response = await axios.get(`${baseURL}/dentist-details/${idDentista}`, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return response.data.schedule;

    } catch (error) {
        console.error('Error fetching dentists:', error);
        throw error;
    }
}
