import React from "react";
import withNavigateHook from '../../utils/withNavigateHook';
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localStorageService";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import * as messages from '../../components/toastr';

class CadastroLancamentos extends React.Component {


    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: ''
    };

    constructor(props) {
        super(props);
        this.service = new LancamentoService();
    }

    componentDidMount(){
            const params = this.props.params;
            if(params.id){
                this.service.obterPorId(params.id)
                .then(response => {
                    this.setState({...response.data});
                })
                .catch(error => {
                    messages.mensagemErro(error.response.data);
                })
                
            }
    }

    submit = () => {

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const { descricao, valor, mes, ano, tipo } = this.state;
        const lancamento = {descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id};

        this.service
        .salvar(lancamento)
        .then( response =>{
            this.props.navigation("/consulta-lancamentos");
            messages.mensagemSucesso("Lançamento cadastrado com sucesso!");
        }).catch(error => {
            messages.mensagemErro(error.response.data);
        });
    }

    atualizar = () => {
        const { descricao, valor, mes, ano, tipo, status, id, usuario } = this.state;
        const lancamento = {descricao, valor, mes, ano, tipo, status ,id, usuario};

        this.service
        .atualizar(lancamento)
        .then( response =>{
            this.props.navigation("/consulta-lancamentos");
            messages.mensagemSucesso("Lançamento atualizado com sucesso!");
        }).catch(error => {
            messages.mensagemErro(error.response.data);
        });
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name] : value
         });
    }

    render(){

        const tipos = this.service.obterListaTipos();
        const meses = this.service.obterListaMeses();
            
        return (
            <Card title="Cadastro de Lançamento">
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *" >
                            <input  id="inputDescricao"
                             type="text" 
                             name="descricao"
                             className="form-control"
                             value={this.state.descricao}
                             onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno"
                             type="text" 
                             className="form-control"
                             name="ano"
                             value={this.state.ano}
                             onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes" 
                                lista={meses} 
                                name="mes"
                                className="form-control"
                                value={this.state.mes}
                                onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor"
                             type="text" 
                             name="valor"
                             className="form-control"
                             value={this.state.valor}
                             onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu 
                            id="inputTipo" 
                            name="tipo"
                            lista={tipos} 
                            className="form-control"
                            value={this.state.tipo}
                            onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: ">
                            <input 
                            id="inputStatus" 
                            type="text" 
                            name="status"
                            value={this.state.status}
                            className="form-control" disabled />
                        </FormGroup>
                    </div>

                    
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <button onClick={this.submit} className="btn btn-success">Salvar</button>
                        <button onClick={this.atualizar} className="btn btn-dark">Atualizar</button>
                        <button onClick={e => this.props.navigation("/consulta-lancamentos")} className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
                    
            </Card>
        );
    }
}

export default withNavigateHook(CadastroLancamentos);