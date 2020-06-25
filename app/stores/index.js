import AuthStore from "./AuthStore";
import UserStore from "./UserStore";
import MoviesStore from './MoviesStore'
import MovieDetailsStore from "./MovieDetailsStore";

authStore = new AuthStore()
userStore = new UserStore()
moviesStore = new MoviesStore()
movieDetailsStore = new MovieDetailsStore()

export default stores = {
	authStore,
	userStore,
	moviesStore,
	movieDetailsStore
};
