//
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
export const fetchPostAuthData = async (endPoint = "", postData, setError = () => { }) => {
    //
    setError(false);
    const accessToken = await readData("token");
    // console.log("access token ---> ", postData);
    //
    try {
        const res = await fetch(`${BASE_URL}${endPoint}`, {
            method: "PUT",
            headers: { authorization: `${accessToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),
        });
        const data = await res.json();
        if (data?.success == false)
            setError(data.message)
        return data;
    } catch (error) {
        console.log('Error happen when updating FCM Token in API folder', error);
        // setError(error);
    }
};
//
export const fetchGetAuthData = async (endPoint = "") => {
    //
    const accessToken = await readData("token");
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
//
export const UpdateData = async (endPoint = "", postData, setError = () => { }) => {
    setError(false);
    try {
        const res = await fetch(`${BASE_URL}${endPoint}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),
        });
        const data = await res.json();
        if (data?.success == false)
            setError(data.message)
        //
        return data;
    } catch (error) {
        console.log('error happen in the PostData in API File', error);
        // setError(error);
    }
};
//
export const deleteItem = async (endPoint) => {
    try {
        const response = await fetch(`${BASE_URL}${endPoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // You may need to include authentication headers if required.
            },
        });
        return response
        // if (response.status === 204) {
        //     // Successful deletion
        //     console.log('Item deleted successfully.');
        // } else {
        //     // Handle errors
        //     console.error('Failed to delete item.');
        // }
    } catch (error) {
        console.error('Error:', error);
    }
};