import {
    GET_API_REQUEST
} from '../../helper/requestHelper/apiRequest';

import {
    PEOPLE
} from '../../helper/requestHelper/urlSchema';

import { CREATE_REQUEST_URL } from '../../helper/requestHelper/apiRequestUrl';

// login api for authantication
const login = (userName) => {
    return new Promise((resolve, rejects) => {
        let str_url = CREATE_REQUEST_URL(PEOPLE.PEOPLE_URL) + "?search=" + userName;
        GET_API_REQUEST(str_url, '')
            .then(response => {
                if (response && Object.keys(response).length > 0) {
                    resolve(response['results'])
                }
            })
            .catch(error => {
                rejects(error.message)
            })
    })
}

export {
    login
}