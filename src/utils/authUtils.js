import axios from "axios";
import config from '../config.json';


const trySilentRefresh = async () => {
    try {
        const res = await axios.post(`${config['path']}/auth/refreshToken`,{}, { withCredentials: true });
        if (res.data.success) {
            console.log(res.data);
            return {
                user: res.data.ref,
                accessToken: res.data.accessToken
            };
        }
        return null;
    } catch (err) {
        const mute = err;
    }
};

export {
    trySilentRefresh
}