import AuthStore from "./AuthStore";
import UserStore from "./UserStore";
import MoviesStore from './MoviesStore'

authStore = new AuthStore()
userStore = new UserStore()
moviesStore = new MoviesStore()

export default stores = {
	authStore,
	userStore,
	moviesStore
};
