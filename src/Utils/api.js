import axios from "axios";
const BASE_URL = "https://api.themoviedb.org/3";
const TMBD_TOKKEN = import.meta.env.VITE_APP_TMBD_TOKKEN;

const headers = {
 Authorization: `bearer ${TMBD_TOKKEN}`,

};

export const FetchDataFromApi = async (url, params) => {
    try{
        const{data} = await axios.get(BASE_URL + url, {
            headers,
            params
        })
        return data;
    } catch (err) {
        console.log(err)
        return err;
    }
}
