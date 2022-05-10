import { Field, Form, Formik, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
//Permite realizar validaciones de formulario
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'


const Formulario = ({ title, cliente, cargando }) => {
    const navigate = useNavigate();

    const nuevoClienteSchema = Yup.object().shape({
        //VALIDACIONES QUE SE VAN A LLEVAR ACABO
        nombre: Yup.string()
            .min(3, "El nombre es muy corto")
            .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string()
            .required("El nombre de la empresa es obligatorio"),
        email: Yup.string()
            .email('El e-mail no es válido')
            .required('El e-mail es obligatorio'),
        telefono: Yup.number()
            .integer('Número no valido')
            .positive('El Número no es valido')
            .typeError('El número no es valido')
    })

    const handleSubmit = async (values) => {
        let respuesta;
        try {
            if (cliente.id) {
                //EDITANDO USUARIO
                const URL = `${import.meta.env.VITE_API_URL}/${cliente.id}`;
                respuesta = await fetch(URL, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            } else {
                //Creando usuario
                const URL = import.meta.env.VITE_API_URL;
                respuesta = await fetch(URL, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }

            await respuesta.json();
            navigate('/clientes');

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{title}</h1>

            {cargando ? <Spinner /> : (
                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? '',
                        empresa: cliente?.empresa ?? '',
                        email: cliente?.email ?? '',
                        telefono: cliente?.telefono ?? '',
                        notas: cliente?.notas ?? ''
                    }}
                    //PERMITE QUE LOS INPUTE TENGAN UN VALOR
                    enableReinitialize={true}

                    onSubmit={(values) => {
                        handleSubmit(values);
                    }}

                    validationSchema={nuevoClienteSchema}
                >
                    {({ errors, touched }) => {
                        //console.log(errors);
                        return (
                            <Form
                                className='mt-10'
                            >
                                <div className='mb-4'>
                                    <label
                                        htmlFor="nombre"
                                        className='text-gray-800'
                                    >
                                        Nombre:
                                    </label>
                                    <Field
                                        id="nombre"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-50"
                                        placeholder="Nombre del Cliente"
                                        name="nombre"
                                    />
                                    {errors.nombre && touched.nombre &&
                                        <Alerta>
                                            {errors.nombre}
                                        </Alerta>
                                    }
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor="empresa"
                                        className='text-gray-800'
                                    >
                                        Empresa:
                                    </label>
                                    <Field
                                        id="empresa"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-50"
                                        placeholder="Empresa del Cliente"
                                        name="empresa"
                                    />
                                    {errors.empresa && touched.empresa &&
                                        <Alerta>
                                            {errors.empresa}
                                        </Alerta>
                                    }
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor="email"
                                        className='text-gray-800'
                                    >
                                        E-mail:
                                    </label>
                                    <Field
                                        id="email"
                                        type="email"
                                        className="mt-2 block w-full p-3 bg-gray-50"
                                        placeholder="Nombre del Cliente"
                                        name="email"
                                    />
                                    {errors.email && touched.email &&
                                        <Alerta>
                                            {errors.email}
                                        </Alerta>
                                    }
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor="telefono"
                                        className='text-gray-800'
                                    >
                                        Telefono:
                                    </label>
                                    <Field
                                        id="telefono"
                                        type="tel"
                                        className="mt-2 block w-full p-3 bg-gray-50"
                                        placeholder="Telefono del Cliente"
                                        name="telefono"
                                    />
                                    {errors.telefono && touched.telefono &&
                                        <Alerta>
                                            {errors.telefono}
                                        </Alerta>
                                    }
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor="notas"
                                        className='text-gray-800'
                                    >
                                        Notas:
                                    </label>
                                    <Field
                                        /*Con AS se indica si se quiere otro tipo de entrada*/
                                        as="textarea"
                                        id="notas"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-50 max-h-20"
                                        placeholder="Notas del Cliente"
                                        name="notas"
                                    />
                                </div>

                                <input
                                    type='submit'
                                    value={title}
                                    className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg hover:cursor-pointer hover:bg-blue-900'
                                />
                            </Form>
                        )
                    }}
                </Formik>
            )}
        </div>
    )
}

Formulario.defaultProps = {
    title: 'Agregar Cliente',
    cliente: {},
    cargando: false
}


export default Formulario