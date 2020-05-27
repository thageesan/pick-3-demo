function request(address: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', params: object | null = null, headers: Record<string, string> = {
    'content-type': 'application/json'
}): Promise<object> {
    return new Promise( async (resolve, reject) => {

        let config = {
            method: `${method}`, // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: headers,
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
        }
        if (method === 'POST') {
            // @ts-ignore
            config['body'] = JSON.stringify(params) // body data type must match "Content-Type" header
        }

        try {
            // @ts-ignore
            const response = await fetch(address, config);
            const json = await response.json();
            resolve(json);
        } catch (e) {
            reject(e);
        }
    });
}

export {
    request
}
