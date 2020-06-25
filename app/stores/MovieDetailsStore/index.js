import config from '../../config.js'
import AuthService from '../../services/AuthService'
import { observable, action } from 'mobx'

export default class MovieDetailsStore {
    @observable movie = null

    @action getDetails(movieId) {
        AuthService.get(`/movie/${movieId}`)
            .then(res => {
                if(res) {
                    this.movie = res
                }
            })
    }

    @action clear() {
        this.movie = null
    }
}