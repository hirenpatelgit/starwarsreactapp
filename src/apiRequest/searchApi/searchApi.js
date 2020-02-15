import {
    GET_API_REQUEST
} from '../../helper/requestHelper/apiRequest';

import {
    PLANET
} from '../../helper/requestHelper/urlSchema';

import { CREATE_REQUEST_URL } from '../../helper/requestHelper/apiRequestUrl';

// planet search api.
const searchPlanet = (planetName) => {
    return new Promise((resolve, rejects) => {
        let str_url = CREATE_REQUEST_URL(PLANET.PLANET_URL) + "?search=" + planetName+"&format=json";
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
    searchPlanet
}