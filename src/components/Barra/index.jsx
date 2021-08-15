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
import loading from './../../assets/img/loading.gif'

export const Barra = () => {
    const [codigo,  setCodigo] = useState('')
    const [restreio, setRastreio] = useState()
    const [rastreioObj, setRastreioObj] = useState()
    const [load, setLoad] = useState(false)
    const [msg, setMsg] = useState('Esperando...')

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
        setLoad(false)
        setMsg('Vamos Lá')
        if(codigo.trim().length == 13){
            axios.post('https://correios.contrateumdev.com.br/api/rastreio', {
                "code": codigo,
                "type": "LS"
            }).then(resp => {
                setRastreio(resp.data)
                setRastreioObj(resp.data.objeto[0])
                if( resp.data.objeto[0].categoria == 'ERRO: Objeto não encontrado na base de dados dos Correios.' ){
                    setLoad(false)
                    setMsg('Não encontrado ou Aguardando postagem pelo remetente.')
                }else {
                    setLoad(true)
                    setMsg('Encontrado')
                }
            }).catch(e => {
                alert('Não encontrado ou Aguardando postagem pelo remetente.')
                setMsg('Não encontrado ou Aguardando postagem pelo remetente.')
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
                { load  ? 
                    <div>
                        <table>
                            <thead>
                                <th>Pesquisa</th>
                                <th>Categoria</th>
                                <th>Quantidade</th>
                                <th>Resultado</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{restreio.pesquisa}</td>
                                    <td>{ rastreioObj.categoria ? rastreioObj.categoria : '' }</td>
                                    <td>{restreio.quantidade}</td>
                                    <td>{restreio.resultado}</td>
                                </tr>
                            </tbody>
                            </table>
                            <p>eventos: </p>
                            { rastreioObj ? rastreioObj.evento.map(e => {
                                let imagem = defineImg(e)  
                                return (<Eventos evObj={e} img={ imagem } />)
                            } ) : '' }
                    </div>
                    
                    :  <div className="msgGif"> {msg} { msg == 'Não encontrado ou Aguardando postagem pelo remetente.' || msg == 'Esperando...' ? '' : <img src={loading} /> } </div>

                }
            </div>
        </div>
    )
}

// teste
// LE320470430SE
// LB227596074HK