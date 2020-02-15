
/**
 * convert object to form data
 */

 const API_REQUEST_BODY_FORM_DATA = (parameter) => {
    let allKey = Object.keys(parameter);
    var strParameter = new FormData()
    allKey.forEach(key => {
        strParameter.append(key, parameter[key]);
    });
    return strParameter
 }

export {
    API_REQUEST_BODY_FORM_DATA
}