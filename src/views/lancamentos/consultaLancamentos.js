import React from "react";
import Card from "../../components/card";
import FormGroup from '../../components/form-group';
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localStorageService";
import * as messages from '../../components/toastr';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import withNavigateHook from "../../utils/withNavigateHook";
class ConsultaLancamentos extends React.Component {

    constructor(props){
        super(props);
        this.service = new LancamentoService();
    }
    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        lancamentos: []
    }
    buscar = () => {
        if(!this.state.ano){
            messages.mensagemErro('O preenchimento do campo Ano é obrigatório. ');
            return false;
        }
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }
        this.service
            .consultar(lancamentoFiltro)
            .then( response => {
                const list = response.data;
                if(list.length < 1){
                    messages.mensagemAlert("Nenhum resultado encontrado.");
                }
                this.setState({ lancamentos: list })
            }).catch(error =>{
                console.log(error);
            })
    }

    editar = (id) => {
        this.props.navigation(`/cadastro-lancamentos/${id}`);
    }

    deletar = () => {
        this.service.deletar(this.state.lancamentoDeletar.id)
        .then(response => {
            const lancamentos = this.state.lancamentos;
            const index = lancamentos.indexOf(this.lancamentoDeletar);
            lancamentos.splice(index, 1);
            this.setState({lancamentos: lancamentos, showConfirmDialog: false});
            messages.mensagemSucesso("Lançamento deletado com sucesso!");
        }).catch(error => {
            messages.mensagemErro("Ocorreu um erro ao tentar deletar o Lançamento.");
        });
    }

    abrirModalConfirmacao = (lancamento) => {
        this.setState({showConfirmDialog: true, lancamentoDeletar: lancamento })
    }

    cancelarDelecao = () => {
        this.setState({showConfirmDialog: false, lancamentoDeletar: {} })
    }

    preparaFormularioCadastro = () => {
        this.props.navigation("/cadastro-lancamentos");
    }

    alterarStatus = (lancamento, status) => {
        this.service.alterarStatus(lancamento.id, status)
        .then(response => {
            const lancamentos = this.state.lancamentos;
            const index = lancamentos.indexOf(lancamento);
            if(index !== -1){
                lancamento['status'] = status;
                lancamentos[index] = lancamento;
                this.setState({lancamento});
            }
            messages.mensagemSucesso("Status atualizado com sucesso!");
        })
    }

    render(){
        const meses = this.service.obterListaMeses();

        const tipos = this.service.obterListaTipos();

        const footerContent = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} autoFocus />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-text" />
            </div>
        );

        return(
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text" className="form-control" id="inputAno"
                                aria-describedby="inputHelp" 
                                value={this.state.ano}
                                onChange={e => this.setState({ano: e.target.value})}
                                placeholder="Digite o Ano" required/>
                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mês: ">
                                <SelectMenu className="form-control" 
                                value={this.state.mes}
                                onChange={e => this.setState({mes: e.target.value})}
                                lista={meses}/>
                            </FormGroup>
                            <FormGroup htmlFor="inputDescricao" label="Descrição: ">
                                <input type="text" className="form-control" id="inputDescricao"
                                aria-describedby="inputHelp" 
                                value={this.state.descricao}
                                onChange={e => this.setState({descricao: e.target.value})}
                                placeholder="Digite a descrição" required/>
                            </FormGroup>
                            <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: ">
                                <SelectMenu id="inputTipo" className="form-control" 
                                  value={this.state.tipo}
                                  onChange={e => this.setState({tipo: e.target.value})}
                                lista={tipos}/>
                            </FormGroup>
                            
                            <button type="button" onClick={this.buscar} className="btn btn-success">
                                <i className="pi pi-search"></i> Buscar
                            </button> 
                            <button type="button" onClick={this.preparaFormularioCadastro} className="btn btn-danger">
                             <i className="pi pi-plus"></i> Cadastrar
                            </button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos} 
                            editAction={this.editar}
                            deleteAction={this.abrirModalConfirmacao}
                            alterarStatus={this.alterarStatus}
                            />
                        </div>
                    </div>
                </div>
                <div>
                <Dialog header="Confirmar remoção Lançamento" visible={this.state.showConfirmDialog} style={{ width: '50vw' }} 
                modal={true}
                footer={footerContent}
                onHide={() => this.setState({showConfirmDialog: false})}>
                    <p className="m-0">
                        Deseja realmente remover esse lançamento?
                    </p>
                </Dialog>
                </div>
            </Card>
        );
    }
}

export default withNavigateHook(ConsultaLancamentos);