import AuthStore from "./AuthStore";
import UserStore from "./UserStore";

authStore = new AuthStore()
userStore = new UserStore()

export default stores = {
	authStore,
	userStore
};
