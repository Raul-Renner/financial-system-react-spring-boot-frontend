import React from 'react';
import UsuarioService from '../app/service/usuarioService';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import withNavigateHook from '../utils/withNavigateHook';
import {mensagemErro, mensagemSucesso} from '../components/toastr';

class CadastroUsuario extends React.Component {
    constructor(props) {
        super(props);
        this.cancelar = this.cancelar.bind(this);
        this.service = new UsuarioService();
    }
    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    };



    cadatrar = () =>{

        const {nome, email, senha, senhaRepeticao} = this.state
        const usuario = {nome,  email,  senha,  senhaRepeticao}

        try{
            this.service.validar(usuario);
        }catch(error){
            const msgs = error.mensagens;
            msgs.forEach(msg => mensagemErro(msg));
            return false;
        }
        
        this.service.salvar(usuario)
             .then( response => {
                 mensagemSucesso("Cadastro realizado com sucesso! Faça o login para acessar o sistema.")
                 this.props.navigation("/login");
             }).catch(error => {
                 mensagemErro(error.response.data);
             })
    }

    cancelar(){
        this.props.navigation("/login");
    }

    render(){
        return (
                <>
                    <Card title="Cadastro de Usuário">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <FormGroup label="Nome: *" htmlFor="inputNome">
                                        <input class="form-control" type="text" id="inputNome" name="nome"
                                        onChange={e => this.setState({nome: e.target.value})}/>
                                    </FormGroup>
                                    <FormGroup label="Email: *" htmlFor="inputEmail">
                                        <input class="form-control" type="email" id="inputEmail" name="email"
                                        onChange={e => this.setState({email: e.target.value})}/>
                                    </FormGroup>
                                    <FormGroup label="Senha: *" htmlFor="inputPassword">
                                        <input type="password" class="form-control" 
                                        id="inputPassword" name="password"
                                        onChange={e => this.setState({senha: e.target.value})}/>
                                    </FormGroup>
                                    <FormGroup label="Confirmar Senha: *" htmlFor="inputConfirmPassword">
                                        <input type="password" class="form-control" 
                                        id="inputConfirmPassword" name="password"
                                        onChange={e => this.setState({senhaRepeticao: e.target.value})}/>
                                    </FormGroup>

                                    <button onClick={this.cadatrar} type="button" class="btn btn-success">
                                    <i className="pi pi-save"></i> Salvar</button>
                                    <button onClick={this.cancelar} type="button" class="btn btn-danger">
                                    <i className="pi pi-times"></i> Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </>
        );
    }
}

export default withNavigateHook(CadastroUsuario);