import React, { useState } from 'react'
import 'bootstrap'
import './index.css'

export const Eventos = ({evObj, img}) => {
    return (
        <div className="eventos">

            <div class="card" >
                <img class="card-img-top" src={img} alt="Imagem do status"/>
                <div class="card-body">
                    <h5 class="card-title">{evObj.descricao}</h5>
                    <p class="card-text">Data: {evObj.data}</p>
                    <p class="card-text">está: {evObj.unidade.local}</p>
                    <p class="card-text">agencia: {evObj.unidade.tipounidade}</p>
                    <p class="card-text">enviado para: { !!evObj.destino ? evObj.destino[0].cidade : 'Sem informação no momento'}</p>
                </div>
            </div>

        </div>
    )
}