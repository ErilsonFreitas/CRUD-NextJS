import { useState } from "react";
import Cliente from "../core/Cliente";
import Entrada from "./Entrada";
import Botao from "./Botao";

interface FormularioProps{
    cliente:Cliente
    clienteMudou?: (cliente: Cliente) => void
    cancelado?: () => void
}

export default function Formulario(props: FormularioProps){
    const id = props.cliente?.id
    const [nome,setNome] = useState(props.cliente?.nome ?? '') //o Interrogação indica que o valor nome só será acessado se existir o cliente.
    const [idade,setIdade] = useState(props.cliente?.idade ?? '') //o Interrogação indica que o valor nome só será acessado se existir o cliente.
    return (
        <div>
            {id ? (
                <Entrada 
                    texto="Código" 
                    valor={id} 
                    somenteLeitura 
                    className="mb-4"
                />  
            ):false}
            
            <Entrada 
                texto="Nome" 
                valor={nome}
                valorMudou={setNome}
                className="mb-4"
            />
            <Entrada 
                texto="Idade" 
                tipo="number" 
                valor={idade}
                valorMudou={setIdade}
            />
            <div className="flex justify-end mt-7">
                <Botao cor="blue" className="mr-2" 
                    onClick={()=> props.clienteMudou?.(new Cliente(nome,+idade,id))}
                >
                    {id ? 'Alterar': 'Salvar'}
                </Botao>
                <Botao onClick={props.cancelado}>
                    Cancelar
                </Botao>                
            </div>

        </div>
    )
}