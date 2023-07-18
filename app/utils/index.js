//
import { readData } from "./localStorage/AsyncStorage";
//
export const sliceText = (text = '', numberOfLetters = 36) => {
    text = text.toString()
    if (text.length > numberOfLetters)
        return text.slice(0, numberOfLetters) + '...'
    return text;
}
// 
export const getServiceMask = (companyName) => {
    // Hormuud Mask
    if (companyName == 'Hormuud')
        return {
            placeHolder: '(61) X-XX-XX-XX',
            mask: ['(', /[6-7]/, /[1]/, ')', ' ', /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
        }
    // Somtel Mask
    else if (companyName == 'Somtel')
        return {
            placeHolder: '(62) X-XX-XX-XX',
            mask: ['(', /[6]/, /[2]/, ')', ' ', /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
        }
    // Somnet Mask
    else if (companyName == 'Somnet')
        return {
            placeHolder: '(68) X-XX-XX-XX',
            mask: ['(', /[6]/, /[8]/, ')', ' ', /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
        }
    // Defaul Mask
    else
        return {
            placeHolder: '(61) X-XX-XX-XX',
            mask: ['(', /[6-7]/, /[1]/, ')', ' ', /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
        }
}

export const formDataGenerator = (obj = {}) => {
    const formData = new FormData();
    Object.keys(obj).map((key) => {
        formData.append(key, obj[key])
    })
    return formData;
}
//
export const checkIfTheUserIsLogin = async () => {
    const { token_type, access_token } = await readData("userInfo");
    const result = token_type & access_token ? true : false;
    return result;
}