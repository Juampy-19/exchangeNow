import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import Button from './Button.jsx';
import Loading from './Loading.jsx';

const Fiat = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [currencies, setCurrencies] = useState([]);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
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

    const handleSelectFromChange = (e) => {
        setFrom(e.target.value);
    }

    const handleSelectToChange = (e) => {
        setTo(e.target.value);
    }

    useEffect(() => {
        setResult('');
        setError('');
    }, [from, to]);

    // Manejo la cotización.
    const handleGetFiatPrice = async () => {
        if (!from || !to) {
            setError('Debe seleccionar ambas monedas');
            return;
        }
        setResult('');
        setError('');
        setLoading(true);
        try {
            // const response = await axios.get(`http://localhost:3001/api/fiat?from=${from}&to=${to}`);
            const response = await axios.get(`https://exchange-now-back.onrender.com/api/fiat?from=${from}&to=${to}`);
            const fiat = response.data.fiat;
            setResult(`1 ${from} = ${fiat} ${to}`);
        } catch (error) {
            console.error('Error al obtener el precio de la moneda: ', error);
            setResult('Error al obtener el precio.');
        } finally  {
            setLoading(false);
        }
    };

  return (
      <div className='flex flex-col items-center justify-between gap-20'>
          <h1 className='mt-[50px] text-xl font-semibold'>
              Precio de Monedas Oficiales
          </h1>

          <div className='flex flex-col justify-center gap-[15px] h-[6em]'> {/* h-[15%] */}
              <select id='from' value={from} onChange={handleSelectFromChange} className='bg-slate-800 dark:bg-slate-400 text-white dark:text-black rounded-xl text-lg px-2'>
                  <option value='' disabled>Seleccione una moneda</option>
                  {currencies.map((currency) => (
                      <option key={currency} value={currency}>{currency}</option>
                  ))}
              </select>

              <select id='to' value={to} onChange={handleSelectToChange} className='bg-slate-800 dark:bg-slate-400 text-white dark:text-black rounded-xl text-lg px-2'>
                  <option value='' disabled>Seleccione una moneda</option>
                  {currencies.map((currency) => (
                      <option key={currency} value={currency}>{currency}</option>
                  ))}
              </select>
          </div>

          <div className='h-[6em] flex items-center'>
              {loading ? (
                  <Loading />
              ) : result ? (
                  <p>{result}</p>
              ) : error ? (
                    <p>{error}</p>
              ) : null}
          </div>

          <div className='flex flex-col gap-5 mb-[15px]'>
              <Button onClick={handleGetFiatPrice}>Cotizar</Button>
              <Button to='/'>Inicio</Button>
          </div>
      </div>
  )
}

export default Fiat;
