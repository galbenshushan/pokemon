import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteFromLocalStorage, setItemToLocalStorage } from "../helpers/localStorage"
import { authActions } from "../store/authSlice";

const UseLogout = () => {

    const history = useHistory()

    const dispatch = useDispatch();

    const logout = () => {
        history.replace('/home')
        deleteFromLocalStorage('auth-token')
        deleteFromLocalStorage('isAuth')
        setItemToLocalStorage('user', {
            first_name: '',
            last_name: '',
            email: '',
            role: 0
        })
        dispatch(authActions.destroyAuthSession());

    }
    return { logout };
}

export default UseLogout;