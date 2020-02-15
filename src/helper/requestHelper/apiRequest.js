
/**
 * GET REQUEST
 * @param {*} str_url 
 * @param {*} access_token 
 */
const GET_API_REQUEST = (str_url) => {
    var dict_header = {}
    dict_header['Accept'] = "application/json"
    dict_header['Content-Type'] = "application/json"
    return fetch(str_url, {
        method: 'GET',
        headers: dict_header
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong ...');
            }
        }
        ).then(responseData => {
            return responseData;
        })
        .catch((error) => {
            return error
        })

}

/**
 * POST REQUEST
 * @param {*} str_url 
 * @param {*} str_body 
 * @param {*} access_token 
 */
const POST_API_REQUEST = (str_url, str_body, access_token) => {
    var dict_header = {}
    dict_header['Accept'] = "application/json"
    dict_header['Content-Type'] = "application/json"

    return fetch(str_url, {
        method: 'POST',
        body: str_body,
        headers: dict_header,
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong ...');
            }
        }
        ).then(responseData => {
            return responseData;
        })
        .catch((error) => {
            return error
        })
}




export {
    GET_API_REQUEST,
    POST_API_REQUEST
}