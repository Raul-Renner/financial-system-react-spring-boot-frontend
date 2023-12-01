import React from 'react';
//HashRouter
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import CadastroUsuario from '../views/cadastroUsuario';
import Login from '../views/login';
import Home from '../views/Home';
import ConsultaLancamentos from '../views/lancamentos/consultaLancamentos';
import CadastroLancamentos from '../views/lancamentos/cadastroLancamentos';
function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route exact path="home"  element={<Home/>}/>
                <Route exact path="login" element={<Login/>} />
                <Route exact path="cadastro-usuarios" element={<CadastroUsuario/>} />        
                <Route exact path="consulta-lancamentos" element={<ConsultaLancamentos/>} />        
                <Route exact path="cadastro-lancamentos" element={<CadastroLancamentos/>} />        
                <Route exact path="cadastro-lancamentos/:id" element={<CadastroLancamentos/>} />        
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;