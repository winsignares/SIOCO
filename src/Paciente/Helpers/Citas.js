

export const creacionCita = async (subdomain, token, data) => {
    try {
        const dataCita = {
            "patient_id": data.patient_id,
            "dentist_id": data.dentist,
            "secretary_id": 13,
            "date": formatDate(data.time),
        };

        const url = `http://${subdomain}:8000/appointments/`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(dataCita),
        });

        const responseData = await response.json(); // Parse the response body

        if (response.ok) {
            console.log("Cita creada exitosamente.");
            return {
                status: true
            };
        } else {
            // Check if the error is the specific one you want to handle
            if (responseData.error === "Patient has another appointment at same date.") {
                console.error("El paciente ya tiene otra cita en la misma fecha.");
                return {
                    status: false,
                    message: "El paciente ya tiene otra cita en la misma fecha."
                };
            } else {
                console.error("Error al crear la cita:", responseData.error);
                return {
                    status: false,
                    message: responseData.error || "Error desconocido"
                };
            }
        }
    } catch (error) {
        console.error('Error fetching appointment:', error);
        return {
            status: false,
            message: "Error de conexión o servidor"
        };
    }
};



function formatDate(dateString) {
    // Convert the input date to a Date object
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date)) {
        console.error('Invalid date:', dateString);
        return null;  // Return null if the date is invalid
    }

    // Ensure the date is in the future
    const currentDate = new Date();
    if (date <= currentDate) {
        console.error('The date must be in the future:', date);
        return null;  // Return null if the date is in the past
    }

    // Return the date in the correct format (YYYY-MM-DDTHH:MM:SS)
    return date.toISOString().split('.')[0];  // Removes milliseconds
}


export const getPatientAppointments = async (subdomain, jwtToken, patientId) => {
    const url = `http://${subdomain}:8000/patient-appointments/${patientId}`;

    try {
        // Send the GET request
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${jwtToken}`,
                'Content-Type': 'application/json',
            },
        });

        // Parse and return the JSON response
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return null;
    }
};