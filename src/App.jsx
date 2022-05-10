import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import EditarCliente from "./paginas/EditarCliente"
import Inicio from "./paginas/Inicio"
import NuevoCliente from "./paginas/NuevoCliente"
import VerCliente from "./paginas/VerCliente"



const App = () => {
    console.log(import.meta.env.VITE_API_URL);
    return (
        //PERMITE LA NAVEGACION ENTRE PAGINAS
        <BrowserRouter>
            <Routes>
                {/*en routerv6 se introdujo nested route, basicamente este permite navegar entre pestañas pero dentro de la 
                misma pagina
                GRUPO DE RUTAS*/}
                <Route path="/clientes" element={<Layout />}>
                    <Route index element={<Inicio />} />
                    <Route path="nuevo" element={<NuevoCliente />} />
                    <Route path="editar/:id" element={<EditarCliente />} />
                    <Route path=":id" element={<VerCliente />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App