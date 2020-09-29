import { User } from '../user.model';
import * as authActions from '../store/auth.actions';

export interface State {
    user: User;
    authErrorMessage: string;
    loading: boolean;
}

const initialState = {
    user: null,
    authErrorMessage: '',
    loading: false
};
export function AuthReducer(state = initialState, action: authActions.AuthActions) {

    switch (action.type) {
        case authActions.AUTHENTICATE_SUCCESS:
            const userr = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
            return {
                ...state,
                user: userr,
                authErrorMessage: null,
                loading: false
            };
        case authActions.LOGOUT:
            return {
                ...state,
                user: null
            };
        case authActions.LOGIN_START:
        case authActions.SIGNUP_START:
            return {
                ...state,
                authErrorMessage: null,
                loading: true
            };
        case authActions.AUTHENTICATE_FAIL:
            return {
                ...state,
                user: null,
                authErrorMessage: action.payload,
                loading: false
            };
        case authActions.CLEAR_ERROR:
            return {
                ...state,
                authErrorMessage: null
            };
        default: return state;
    }
}
