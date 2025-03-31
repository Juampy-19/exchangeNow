// import React from 'react';
import { useState } from "react";
import axios from "axios";

const Fiat = () => {
    const [from, setFrom] = useState('USD');
    const [to, setTo] = useState('ARS');
    const [price, setPrice] = useState(null);

    const handleGetFiatPrice = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/fiat?from=${from}&to=${to}`);
            setPrice(response.data.fiat);
        } catch (error) {
            console.error('Error al obtener el precio de la moneda: ', error);
            setPrice('Error al obtener el precio.');
        }
    };

  return (
    <div>
        <h1>Precio de moneda</h1>

        <div>
            <input type="text" placeholder="Moneda de origen" value={from} onChange={(e) => setFrom(e.target.value.toUpperCase())} />
            <input type="text" placeholder="Moneda de destino" value={to} onChange={(e) => setTo(e.target.value.toUpperCase())} />

            <button onClick={handleGetFiatPrice}>Cotizar</button>
        </div>

        {price && (<p>1 {from} = {price} {to}</p>)}
    </div>
  )
}

export default Fiat;
