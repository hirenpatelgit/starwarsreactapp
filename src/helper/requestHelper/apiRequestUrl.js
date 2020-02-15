import { BASE_URL } from "./urlSchema";

/**
 * pass only endpoint
 * @param {*} str_endpoint 
 */
const CREATE_REQUEST_URL = (str_endpoint) => {
    return BASE_URL.URL+str_endpoint
}

export {
    CREATE_REQUEST_URL
}