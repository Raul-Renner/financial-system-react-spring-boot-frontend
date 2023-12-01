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

    validar(){
        const mensagens = [];

        if(!this.state.nome){
            mensagens.push('O campo nome é obrigatório.')
        }

        if(!this.state.email){
            mensagens.push('O campo email é obrigatório.')
        }else if(!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            mensagens.push('Informe um email válido.')
        }

        if(!this.state.senha || !this.state.senhaRepeticao){
            mensagens.push('Preencha os campos de senha.')
        }else if(this.state.senha !== this.state.senhaRepeticao){
            mensagens.push('As senhas não são iguais.')
        }

        return mensagens;
    }

    cadatrar = () =>{
        const mensagens = this.validar();

        if(mensagens && mensagens.length > 0){
            mensagens.forEach((
                mensagem, index
            ) =>{
                mensagemErro(mensagem);
            });
            return false;
        }
        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
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

                                    <button onClick={this.cadatrar} type="button" class="btn btn-success">Salvar</button>
                                    <button onClick={this.cancelar} type="button" class="btn btn-danger">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </>
        );
    }
}

export default withNavigateHook(CadastroUsuario);