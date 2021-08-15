import React, { useState } from 'react'
import axios from 'axios'
import './index.css'
import { Eventos } from '../Eventos'
import entregue from './../../assets/img/entregue.png'
import andamento from './../../assets/img/a-caminho.png'
import pagamentoConfirmado from './../../assets/img/pagamento-confirmado.png'
import pagar from './../../assets/img/pagar.png'
import ficalizando from './../../assets/img/inspection.png'
import ficalizacaoFinalizado from './../../assets/img/okay.png'
import saiuEntregar from './../../assets/img/entrega.png'
import postadoImg from './../../assets/img/send.png'

export const Barra = () => {
    const [codigo,  setCodigo] = useState('')
    const [restreio, setRastreio] = useState()
    const [rastreioObj, setRastreioObj] = useState()
    const [img, setImg] = useState()

    const defineImg = (evObj) => {
        if( evObj.descricao == 'Objeto recebido pelos Correios do Brasil'){
            return ( andamento )
        }else if( evObj.descricao == 'Encaminhado para fiscalização aduaneira' ){
            return ( ficalizando )
        }else if( evObj.descricao == 'Aguardando pagamento' ){
            return ( pagar )
        }else if( evObj.descricao == 'Pagamento confirmado' ) {
            return ( pagamentoConfirmado )
        }else if( evObj.descricao == 'Objeto em trânsito - por favor aguarde'){
            return ( andamento )
        }else if( evObj.descricao == 'Objeto entregue ao destinatário' ){
            return ( entregue )
        }else if( evObj.descricao == 'Fiscalização aduaneira finalizada' ){
            return ( ficalizacaoFinalizado )
        }else if( evObj.descricao == 'Objeto saiu para entrega ao destinatário' ){
            return ( saiuEntregar )
        }else if( evObj.descricao == 'Objeto postado' ){
            return ( postadoImg )
        }
    }

    

    const rastrear = () => {
        if(codigo.trim().length == 13){
            axios.post('https://correios.contrateumdev.com.br/api/rastreio', {
                "code": codigo,
                "type": "LS"
            }).then(resp => {
                setRastreio(resp.data)
                setRastreioObj(resp.data.objeto[0])
                console.log('conteceu algo aqui')
            }).catch(e => {
                alert('Aguardando postagem pelo remetente.')
                setRastreio(null)
                return
            })
        }else{
            alert('Codigo tem que ter pelo menos 13 digitos :' + codigo.trim().length)
        }

    }

    return (
        <div className="container">
            <label>Seu codigo de rastreio aqui:</label>
            <input 
                type="text" 
                value={codigo} 
                onChange={ (text) => setCodigo(text.target.value) }
                className="inputCode"
            />
            <button
                className="buttonCode"
                onClick={rastrear}
            >Rastrear</button>
            <h3>{ restreio ? `Rastreando: ${codigo}` : '' }</h3>
            <div>
                {rastreioObj ? 
                    <div>
                        <p>pesquisa:{restreio.pesquisa}</p>
                        {/* <p>categoria: { rastreioObj.categoria ? rastreioObj.categoria : '' }</p> */}
                        <p>quantidade: {restreio.quantidade}</p>
                        <p>resultado: {restreio.resultado}</p>
                        <p>eventos: </p>
                        { rastreioObj ? rastreioObj.evento.map(e => {
                            let imagem = defineImg(e)  
                            return (<Eventos evObj={e} img={ imagem } />)
                            } ) : '' }
                    </div>
                    
                    : 'nada' 

                }
            </div>
        </div>
    )
}

// teste
// LE320470430SE
// LB227596074HK