import firebase from "../config";
import Cliente from "../../core/Cliente";
import ClienteRepositorio from "@/src/core/ClienteRepositorio";
import { stringify } from "querystring";

export default class ColecaoCliente implements ClienteRepositorio {
    #conversor = {
        toFirestore(cliente: Cliente) {
            return {
                nome: cliente.nome,
                idade: cliente.idade
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot,options:firebase.firestore.SnapshotOptions):Cliente {
            const dados = snapshot.data(options)
            return new Cliente(dados.nome,dados.idade,snapshot.id)
        }
    }

    salvar(cliente:Cliente): Promise<Cliente>{
        if(cliente?.id){
            return this.colecao(+cliente.id)
        }else{
            return this.colecao(+cliente.id!)
        }
    }
    excluir(cliente: Cliente): Promise<void> {
        return this.colecao(+cliente.id!)
    }
    async obterTodos(): Promise<Cliente[]> {
        return await this.colecao()
    }

    private async colecao(codigo?: number,method?: string) {
        const resp = await fetch(`http://localhost:3004/users/${codigo || ''}`,{ method: method || 'GET' })
        return await resp.json()
    }
}