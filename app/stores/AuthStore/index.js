import config from '../../config.js'
import AuthService from '../../services/AuthService'
import { observable, action } from 'mobx'
import { getCache, clearCache } from '../../services/CahceService.js'

export default class AuthStore {
    @observable isSignedIn = false
    @observable token = null
    @observable user = null

    constructor() {
        getCache('token').then(token => {
            this.isSignedIn = true
            this.token = token
        })
    }



    @action clear() {
        this.isSignedIn = false
        this.token = null
        this.user = null
        clearCache()
    }
}