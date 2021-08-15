import React, { useState } from 'react'
import './index.css'

export const Eventos = ({evObj, img}) => {

    return (
        <div className="eventos">
            <div className="divImg">
                <img className="img" src={img} alt="" />
            </div>
            <div className="divInfos">
                <p>Data: {evObj.data}</p>
                <p>Descrição: {evObj.descricao}</p>
                <p>está: {evObj.unidade.local} </p>
                <p>agencia: {evObj.unidade.tipounidade}</p>
            </div>
        </div>
    )
}