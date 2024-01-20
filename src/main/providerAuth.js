import React from "react";
import AuthService from '../app/service/authService';

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

class ProviderAuthentication extends React.Component {

    state = {
        userAuthenticated: null,
        isAuthenticated: false
    }

    initSession = (user) => {
        AuthService.login(user);
        this.setState({isAuthenticated: true, userAuthenticated: user});
    }

    closeSession = () => {
        AuthService.removeUserAuthenticated();
        this.setState({isAuthenticated: false, userAuthenticated: null});
    }

    render() {
        const context = {
            userAuthenticated: this.state.userAuthenticated,
            isAuthenticated: this.state.isAuthenticated,
            initSession: this.initSession,
            closeSession: this.closeSession
        };
        return (
            <AuthProvider value={context}>
                {this.props.children}
            </AuthProvider>
        );
    }
}

export default ProviderAuthentication;