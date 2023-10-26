import { useState } from "react";
import Botao from "../components/Botao";
import Formulario from "../components/Formulario";
import Layout from "../components/Layout";
import Tabela from "../components/Tabela";
import Cliente from "../core/Cliente";

export default function Home(){

    const [cliente,setCliente] = useState<Cliente>(Cliente.vazio())
    const [visivel,setVisivel] = useState<'tabela' | 'form'>('tabela')

    const clientes = [
        new Cliente('Ana',34,'1'),
        new Cliente('Bia',24,'2'),
        new Cliente('Pedro',45,'3'),
        new Cliente('João',52,'4')
    ]

    function novoCliente(){
        setCliente(Cliente.vazio())
        setVisivel('form')
    }
    function clienteSelecionado(cliente: Cliente){
        setCliente(cliente)
        setVisivel('form')
    }
    function clienteExcluido(cliente: Cliente){
        console.log(`Excluir... ${cliente.nome}`)
    }
    function salvarCliente(cliente: Cliente){
        console.log(cliente)
        setVisivel('tabela')
    }
    return (
        <div className={`
            flex h-screen justify-center items-center
            bg-gradient-to-r from-blue-500 to-purple-500
            text-white
        `}>
            <Layout titulo="Cadastro Simples">
                
                {visivel === 'tabela' ? (
                    <>   
                        <div className="flex justify-end">
                            <Botao 
                                cor="green" 
                                onClick={novoCliente} 
                                className="mb-4">
                                Novo Cliente
                            </Botao>
                        </div>
                        <Tabela clientes={clientes} clienteSelecionado={clienteSelecionado} clienteExcluido={clienteExcluido}></Tabela>
                    </>
                ):(
                    <>
                        <Formulario 
                            cliente={cliente} 
                            clienteMudou={salvarCliente}
                            cancelado={()=> setVisivel('tabela')}
                        />  
                    </>
                )}
                

                
            </Layout>
        </div>
    )
}