import AuthService from '../../services/AuthService'
import { observable, action } from 'mobx'

export default class UserStore {
    @observable userName = 'Guest'

    constructor() {}

    @action getInformation(session_id) {
        AuthService.get('/account', { session_id })
    }

    @action logout() {
        this.userName = 'Guest'
    }
}