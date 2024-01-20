import React from 'react';
//HashRouter
import {Route, BrowserRouter, Routes, Navigate, Outlet} from 'react-router-dom';
import CadastroUsuario from '../views/cadastroUsuario';
import Login from '../views/login';
import Home from '../views/Home';
import ConsultaLancamentos from '../views/lancamentos/consultaLancamentos';
import CadastroLancamentos from '../views/lancamentos/cadastroLancamentos';
import { AuthConsumer } from './providerAuth';

// const isUserAuthenticated = () => {
//     return false;
// }
// function RouteAuthenticated({ component: Component, ...props }){
//     return(
//         <Route {...props} render={(componentProps) => {
//             if(isUserAuthenticated()){
//                 return (
//                     <Component {...componentProps}/>
//                 );
//             }else{
//                 <Navigate to='/login' state= {{from: componentProps.location}} replace />
//             }
//         }}
        

//         />
//     )
// }

function PrivateRoutes(isUserAuthenticated){
    let auth = {token: isUserAuthenticated}
    return(
        auth.token ? <Outlet/> : <Navigate to="/login" replace/>
    )
}
function Rotas(props){
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="login" element={<Login/>} />
                <Route exact path="cadastro-usuarios" element={<CadastroUsuario/>} />        
                <Route element={<PrivateRoutes isUserAuthenticated={props.isUserAuthenticated} />}>
                    <Route  exact path="consulta-lancamentos" element={<ConsultaLancamentos/>} />        
                    <Route  exact path="home"  element={<Home/>}/>
                    <Route  exact path="cadastro-lancamentos" element={<CadastroLancamentos/>} />        
                    <Route  exact path="cadastro-lancamentos/:id" element={<CadastroLancamentos/>} />        
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default () => (
    <AuthConsumer>
        {
            (context) => (<Rotas isUserAuthenticated={context.isAuthenticated}/>)
        }
    </AuthConsumer>
)