import config from '../config.js'
import { Alert } from 'react-native'

function get(call, params) {
    let urlParameters = ''
    params = { ...params, api_key: config.api_key }
    if (params) {
        if (params.constructor === Array) {
            urlParameters += '?';
            urlParameters += params.map(i => i[0] + '=' + i[1]).join('&');
        } else {
            urlParameters += '?';
            urlParameters += Object.keys(params).map((i) => i + '=' + params[i]).join('&');
        }
    }
    let callUrl = `${config.domain}` + call + urlParameters;
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener('readystatechange', function (event) {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    let parsed;
                    try {
                        parsed = JSON.parse(this.responseText)
                    } catch (e) {
                        parsed = { error: e, response: this.responseText };
                    }
                    resolve(parsed);
                } else {
                    let responseJson;
                    try {
                        responseJson = JSON.parse(this.responseText);
                    } catch (e) {
                        responseJson = { error: e, response: this.responseText };
                        return reject(responseJson);
                    }

                    setTimeout(() => {
                        Alert.alert(
                            'ERROR',
                            responseJson.status_message,
                            [{ text: 'Got it', onPress: () => reject(responseJson) }],
                            { cancelable: false }
                        );
                    }, 100)


                }
            }
        });
        xhr.open('GET', callUrl, true);
        xhr.setRequestHeader('cache-control', 'no-cache');
        xhr.send();
    });
}

function post(call, pass_data) {
    let callUrl = `${config.domain}` + call + `?api_key=${config.api_key}`;
    return new Promise(function (resolve, reject) {
        let data = new FormData();
        let postData = JSON.stringify(pass_data);
        data.append('request_token', pass_data.request_token);
        data.append('username', pass_data.username);
        data.append('password', pass_data.password);
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener('readystatechange', function (event) {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    let parsed;
                    try {
                        parsed = JSON.parse(this.responseText)
                    } catch (e) {
                        parsed = { error: e, response: this.responseText };
                    }
                    resolve(parsed);

                    //}
                } else {
                    let responseJson;
                    try {
                        responseJson = JSON.parse(this.responseText);
                    } catch (e) {
                        responseJson = { error: e, response: this.responseText };
                        return reject(responseJson);
                    }
                    setTimeout(() => {
                        Alert.alert(
                            responseJson.msg,
                            'ERROR',
                            [
                                { text: 'Got it' },
                            ],
                            { cancelable: false }
                        );
                    }, 100)
                    reject(responseJson);
                }
            }
        });

        xhr.open('POST', callUrl, true);
        xhr.setRequestHeader('cache-control', 'no-cache');
        xhr.send(data);
    });
}

function signIn(username, password) {
    return new Promise(function (resolve, reject) {
        try {
            get(`/authentication/token/new`)
                .then(res =>
                    post('/authentication/token/validate_with_login', { username, password, request_token: res.request_token })
                        .then(res =>
                            post('/authentication/session/new', { request_token: res.request_token })
                                .then(res => resolve(res))
                        )
                )
        } catch (err) {
            Alert.alert(
                'Error',
                err,
                [
                    { text: 'Got it' },
                ],
                { cancelable: false }
            )
            reject()
        }
    })
}

function signInAsGuest() {
    return get('/authentication/guest_session/new')
}

export default { get, post, signIn, signInAsGuest };
