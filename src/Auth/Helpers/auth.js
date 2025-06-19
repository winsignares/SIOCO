
import { toast } from "react-hot-toast";
import useAuthStore from "../../store/authStore";

export const login = async (username, password, setDisable) => {
    const loginAction = useAuthStore.getState().login;

    try {
        setDisable(true);
        // const response = await fetch('http://localhost:8000/auth/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         username,
        //         password,
        //     }),
        // });


        // const data = await response.json();
                
        // if(data.error == "Invalid Credentials"){ 
        //     toast.error('Credenciales inválidas');
        //     return
        // } 

        // loginAction(data.token, data.odontologies,  data.role , username, data.user_id);
        
        loginAction("token1234", "odontologies1234" ,  "patient" , username, "id1234");
        return "data.token";
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    } finally {
        setDisable(false);
    }
};





