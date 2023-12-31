import React from "react";
import LocalStorageService from "../app/service/localStorageService";
import UsuarioService from "../app/service/usuarioService";
class Home extends React.Component {

    constructor(){
        super();
        this.usuarioService = new UsuarioService();
    }
    componentDidMount(){
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        this.usuarioService.obterSaldoPorUsuario(usuarioLogado.id)
            .then( response => {
                this.setState({saldo: response.data})
            }).catch(error => {
                console.error(error.response);
            });
    }

    state = {
        saldo: 0,
    }
    render(){
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                <hr className="my-4" />
                <p>Esse teste</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" role="button" href="/cadastro-usuarios">
                        <i className="fas fa-users"></i> Cadastrar Usuário
                    </a>
                    <a  href="/cadastro-lancamentos" className="btn btn-danger btn-lg" role="button">
                    <i className="fas fa-users"></i> Cadastrar Lançamento</a>
                </p>
            </div>
        );
    }
}

export default Home;