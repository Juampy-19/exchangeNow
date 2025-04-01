import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from './Loading.jsx';

const Fiat = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [currencies, setCurrencies] = useState([]);
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    // Obtengo las monedas al cargar el componente.
    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
                setCurrencies(Object.keys(response.data.rates));
            } catch (error) {
                console.error('Error al obtener las monedas: ', error);
            }
        };
        fetchCurrencies();
    }, []);

    // Manejo la cotización.
    const handleGetFiatPrice = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3001/api/fiat?from=${from}&to=${to}`);
            const fiat = response.data.fiat;
            setResult(`1 ${from} = ${fiat} ${to}`);
        } catch (error) {
            console.error('Error al obtener el precio de la moneda: ', error);
            setResult('Error al obtener el precio.');
        } finally  {
            setLoading(false);
        }
    };

    // Desactivación del botón cotizar.
    const disabled = !from || !to || from === to;

  return (
    <div>
        <h1>Precio de monedas oficiales</h1>

        <div>
            <select id='from' value={from} onChange={(e) => setFrom(e.target.value)}>
                <option value='' disabled>Seleccione una moneda</option>
                {currencies.map((currency) => (
                    <option key={currency} value={currency}>{currency}</option>
                ))}
            </select>

            <select id='to' value={to} onChange={(e) => setTo(e.target.value)}>
                <option value='' disabled>Seleccione una moneda</option>
                {currencies.map((currency) => (
                    <option key={currency} value={currency}>{currency}</option>
                ))}
            </select>

            <button onClick={handleGetFiatPrice} disabled={disabled}>Cotizar</button>
        </div>

        { loading ? (
            <Loading />
        ) : (
            result && <p>{result}</p>
        )}

        <Link to='/'>
            <button>Inicio</button>
        </Link>
    </div>
  )
}

export default Fiat;
