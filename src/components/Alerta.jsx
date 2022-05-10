const Alerta = ({ children }) => {
    return (
        <div className={`text-center bg-red-600 p-2 text-white font-bold text-lg my-2`}>
            {children}
        </div>
    )
}

export default Alerta