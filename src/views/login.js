import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import withNavigateHook from '../utils/withNavigateHook';
import LocalStorageService from '../app/service/localStorageService';
import UsuarioService from '../app/service/usuarioService';

import {mensagemErro} from '../components/toastr';

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
    entrar = async () => {
        //try/catch
             this.service.autenticar({
                email: this.state.email,
                senha: this.state.senha
            }).then(response => {
                LocalStorageService.adicionarItem('_usuario_logado', response.data);
                this.props.navigation("/home");
            }).catch(error => {
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
                                                <button onClick={this.entrar} className="btn btn-success">Entrar</button>
                                                <button onClick={this.prepareCadastro} className="btn btn-danger">Cadastrar</button>
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

export default withNavigateHook(Login);