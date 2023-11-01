import { useEffect, useState } from "react";
import ColecaoCliente from "../backend/db/ColecaoCliente"
import ClientJsonServer from "../backend/db/ClientJsonServer"
import ClienteRepositorio from "../core/ClienteRepositorio"
import Cliente from "../core/Cliente"
import useTableOuForm from "./useTabelaOuForm";

export default function useClientes(){
    //const repo: ClienteRepositorio = new ColecaoCliente()
    const repo: ClienteRepositorio = new ClientJsonServer()

    const {exibirFormulario,exibirTabela,formularioVisivel,tabelaVisivel} = useTableOuForm()

    const [cliente,setCliente] = useState<Cliente>(Cliente.vazio())
    const [clientes,setClientes] = useState<Cliente[]>([])

    useEffect(obterTodos,[])

    function obterTodos(){
        repo.obterTodos().then(clientes => {
            setClientes(clientes)
            exibirTabela()
        })
    }

    function novoCliente(){
        setCliente(Cliente.vazio())
        exibirFormulario()
    }
    function selecionarCliente(cliente: Cliente){
        setCliente(cliente)
        exibirFormulario()
    }
    async function excluirCliente(cliente: Cliente){
        await repo.excluir(cliente)
        obterTodos()
    }
   async function salvarCliente(cliente: Cliente){
        await repo.salvar(cliente)
        obterTodos()
    }

    return {
        cliente,
        clientes,
        salvarCliente,
        excluirCliente,
        selecionarCliente,
        novoCliente,
        obterTodos,
        tabelaVisivel,
        exibirTabela
    }
}