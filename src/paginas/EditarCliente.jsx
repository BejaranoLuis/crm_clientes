import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Formulario from "../components/Formulario"

const EditarCliente = () => {
    const [cargando, setCargando] = useState(true);
    const [cliente, setCliente] = useState({});
    const { id } = useParams();

    useEffect(() => {

        const datosCliente = async () => {
            const URL = `${import.meta.env.VITE_API_URL}/${id}`;
            const respuesta = await fetch(URL);
            const resultado = await respuesta.json();
            setCliente(resultado);
        }

        setTimeout(() => {
            setCargando(!cliente);
        }, 500);

        datosCliente();
    }, []);



    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
            <p className='mt-3'>Edita los campos necesarios</p>

            {Object.keys(cliente).length === 0 ? <p>Cliente no valido</p> : (
                <Formulario
                    title='Editar Cliente'
                    cliente={cliente}
                    cargando={cargando}
                />
            )}
        </>
    )
}

export default EditarCliente