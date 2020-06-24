import config from '../../config.js'
import AuthService from '../../services/AuthService'
import { observable, action } from 'mobx'
import { getCache, clearCache, setCache } from '../../services/CahceService.js'

export default class AuthStore {
    @observable isSignedIn = false
    @observable sessionId = null
    @observable userName = ''
    @observable password = ''
    @observable isDataLoading = false

    constructor() {
        getCache('sessionId').then(sessionId => {
            if (sessionId) {
                this.sessionId = sessionId
                this.isSignedIn = true
            }
        })
    }

    @action onUserNameChange(value) {
        this.userName = value
    }

    @action onPasswordChange(value) {
        this.password = value
    }

    @action signIn() {
        this.isDataLoading = true
        AuthService.signIn(this.userName, this.password)
            .then(res => {
                if (res && res.success) {
                    setCache('sessionId', res.session_id)
                    this.userName = ''
                    this.password = ''
                    this.sessionId = res.session_id
                    this.isSignedIn = true
                }
            })
            .catch(() => this.isDataLoading = false)
            .finally(() => this.isDataLoading = false)
    }

    @action signInAsGuest() {
        this.isDataLoading = true
        AuthService.signInAsGuest(this.userName, this.password)
            .then(res => {
                if (res && res.success) {
                    this.sessionId = res.guest_session_id
                    this.isSignedIn = true
                }
            })
            .finally(() => this.isDataLoading = false)
    }

    @action logout() {
        AuthService.del('/authentication/session', { session_id: this.sessionId })
            .then(() => this.clear())
    }

    @action clear() {
        this.isSignedIn = false
        this.token = null
        this.userName = ''
        this.password = ''
        this.isDataLoading = false
        setCache('sessionId', null)
    }
}