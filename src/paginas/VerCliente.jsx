import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner';

const VerCliente = () => {
    const { id } = useParams();
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerDatos = async () => {

            try {
                const URL = `${import.meta.env.VITE_API_URL}/${id}`;
                const respuesta = await fetch(URL);
                const resultado = await respuesta.json();
                setCliente(resultado);
            } catch (error) {
                console.log(`ERROR: ${error}`);
            }
        }

        setTimeout(() => {
            setCargando(!cargando);
        }, 1000);

        obtenerDatos();
    }, [])

    const { nombre, empresa, email, telefono, notas } = cliente;

    return (
        cargando ? <Spinner /> : (
            Object.keys(cliente).length === 0 ? <p>El usuario solicitado no existe</p> : (
                <div>
                    <h1 className='font-black text-4xl text-blue-900'>Ver Cliente:</h1>
                    <p className='mt-3'>Información del cliente</p>

                    <p className='text-2xl text-gray-700 mt-10'>
                        <span className='uppercase font-bold'>Nombre: </span>
                        {nombre}
                    </p>

                    <p className='text-2xl text-gray-700 mt-2'>
                        <span className='uppercase font-bold'>Empresa: </span>
                        {empresa}
                    </p>

                    <p className='text-2xl text-gray-700 mt-2'>
                        <span className='uppercase font-bold'>Email: </span>
                        {email}
                    </p>

                    {telefono && (
                        <p className='text-2xl text-gray-700 mt-2'>
                            <span className='uppercase font-bold'>Telefono: </span>
                            {telefono}
                        </p>
                    )}


                    {notas && (
                        <p className='text-2xl text-gray-700 mt-2'>
                            <span className='uppercase font-bold'>Notas: </span>
                            {notas}
                        </p>
                    )}
                </div>
            )
        )
    )
}

export default VerCliente