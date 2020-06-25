import config from '../../config.js'
import AuthService from '../../services/AuthService'
import { observable, action } from 'mobx'

export default class MoviesStore {
    @observable isSearchBar = false
    @observable search = ''
    @observable isMoviesLoading = false
    @observable movies = []

    totalMoviesCount = 0
    currentPage = 1

    constructor() { }

    @action openSearchBar() {
        this.search = ''
        this.isSearchBar = true
    }

    @action closeSearchBar() {
        this.isSearchBar = false
    }

    @action searchChange(value) {
        this.search = value
    }

    @action searchMovies() {
        this.isMoviesLoading = true
        AuthService.get('/search/movie', { query: this.search, page: this.currentPage })
            .then(res => {
                if (res && res.results && res.results.length > 0) {
                    this.movies.push(...res.results)
                    this.totalMoviesCount = res.total_results
                    this.currentPage += 1
                }
            })
            .catch(err => {
                this.clear()
            })
            .finally(() => {
                this.closeSearchBar()
                this.isMoviesLoading = false
            })
    }

    @action checkAvailableMovies() {
        if (!this.isMoviesLoading && this.movies.length < this.totalMoviesCount) {
            this.searchMovies()
        }
    }

    @action resetData() {
        this.movies = []
        this.totalMoviesCount = 0
        this.currentPage = 1
    }

    @action clear() {
        this.isSearchBar = false
        this.search = ''
        this.isMoviesLoading = false
        this.movies = []
        this.totalMoviesCount = 0
        this.currentPage = 1
    }
}