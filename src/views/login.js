import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import withNavigateHook from '../utils/withNavigateHook';
import UsuarioService from '../app/service/usuarioService';

import {mensagemErro} from '../components/toastr';

import { AuthContext } from '../main/providerAuth';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.prepareCadastro = this.prepareCadastro.bind(this);
        this.service = new UsuarioService();
    }
    state = {
        email: '',
        senha: '',
    }
    entrar = () => {
        //try/catch
             this.service.autenticar({
                email: this.state.email,
                senha: this.state.senha
            }).then(response => {
                this.context.initSession(response.data);
                this.props.navigation("/home");
            }).catch(error => {
                console.log(error);
                mensagemErro(error.response.data);
        })
  
    };

    prepareCadastro(){
        this.props.navigation("/cadastro-usuarios");
    }

    render(){ 
            
        return(
                <div className="row">
                    <div className="col-md-6" style={{position: 'relative', left: '300px'}}>
                        <div className="bs-docs-section">
                            <Card title="Login">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">
                                            <fieldset>
                                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                                    <input type="email" className="form-control" 
                                                    value={this.state.email}
                                                    onChange={e => this.setState({email: e.target.value})}
                                                    id="inputEmail" aria-describedby="email" placeholder="Digite o Email"/>
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="inputPassword">
                                                <input 
                                                value={this.state.senha}
                                                onChange={e  => this.setState({senha: e.target.value})}
                                                type="password" className="form-control"
                                                id="inputPassword" placeholder="Password"/>
                                            </FormGroup>
                                                <button onClick={this.entrar} className="btn btn-success">
                                                <i className="pi pi-sign-in"></i> Entrar</button>
                                                <button onClick={this.prepareCadastro} className="btn btn-danger">
                                                <i className="pi pi-plus"></i> Cadastrar</button>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div> 
            )
    }
}

Login.contextType = AuthContext;

export default withNavigateHook(Login);