import LocalStorageService from "./localStorageService";
export const USER_AUTHENTICATED = '_usuario_logado';
export default class AuthService{
    
    static isUserAuthenticated(){
        const user = LocalStorageService.obterItem(USER_AUTHENTICATED);
        return user && user.id;
    }

    static removeUserAuthenticated(){
        LocalStorageService.removeItem(USER_AUTHENTICATED);
    }

    static login(user){
        LocalStorageService.adicionarItem(USER_AUTHENTICATED, user);
    }

    static getUserAuthenticated(){
        return LocalStorageService.obterItem(USER_AUTHENTICATED);
    }
}