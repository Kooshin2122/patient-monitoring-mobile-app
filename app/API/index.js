import { readData } from "../utils/localStorage/AsyncStorage";

//
const BASE_URL = 'http://192.168.1.9:3000/';
// const BASE_URL = 'http://192.168.35.245:5000/';
//
export const fetchPostData = async (endPoint = "", postData, setError = () => { }) => {
    setError(false);
    try {
        const res = await fetch(`${BASE_URL}${endPoint}`, {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),
        });
        const data = await res.json();
        // console.log(`response -------->`, data);
        if (data?.success == false)
            setError(data.message)
        return data;
    } catch (error) {
        console.log('error happen in the fetch post method', error);
        // setError(error);
    }
};
//
export const fetchGetAuthData = async (endPoint = "") => {
    //
    const accessToken = await readData("token");
    // console.log("accessToken", accessToken);
    //
    try {
        const res = await fetch(`${BASE_URL}${endPoint}`, {
            method: "get",
            headers: { authorization: `${accessToken}` },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error happen in the fetch get auth method', error);
    }
    finally {
        // console.log("Final");
    }
}