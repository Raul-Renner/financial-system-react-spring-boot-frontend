import React from 'react';
import NavbarItem from './navbarItem';
import { AuthConsumer } from '../main/providerAuth';

// const deslog = () => {
//     AuthService.removeUserAuthenticated()
// }

// const isUserAuthenticated = () => {
//     return AuthService.isUserAuthenticated();
// }

function Navbar(props){
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="/home" className="navbar-brand">Minhas Finanças</a>
                <button className="navbar-toggler" type="button"
                data-toggle="collapse" data-target="#navbarResponsive"
                aria-controls="navbarResponsive" aria-expanded="false">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavbarItem render={props.isUserAuthenticated}  href="/home" label="Home"/>
                        <NavbarItem render={props.isUserAuthenticated}  href="/cadastro-usuarios" label="Usuários"/>
                        <NavbarItem render={props.isUserAuthenticated}  href="/consulta-lancamentos" label="Lançamentos"/>
                        <NavbarItem render={props.isUserAuthenticated}  onClick={props.deslog} href="/login" label="Sair"/>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default () => (
    <AuthConsumer>
        {
            (context) => (
                <Navbar isUserAuthenticated={context.isAuthenticated} deslog={context.closeSession} />
            ) 
        }
    </AuthConsumer>
)