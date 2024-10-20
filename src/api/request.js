import axios from "axios";

function parseJSON(response) {
    if (response.status === 204 || response.status === 205) {
        return null;
    }
    return response.data;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
    console.log('parse json', response);
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

async function apiRequest(path, data, method = "post") {
    const requestUrl = `${process.env.REACT_APP_API_URL}/api${path}`;

    const options = {
        method,
        url: requestUrl,
        headers: { "Content-Type": 'application/json' },
        data
    }
    const response = await axios(options);
    const response_1 = await checkStatus(response);
    return parseJSON(response_1);
}


export default apiRequest;