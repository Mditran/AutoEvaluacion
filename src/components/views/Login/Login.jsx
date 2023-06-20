import React, { useState } from "react";
import '../../../css/root.css';
import Space01 from '../../../assets/img/Space04.jpg';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



const Login = () => {
    const [body, setBody] = useState({ username: '', password: '' })
    const navigate = useNavigate()
    //const classes = useStyles()

    const handleChange = e => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/api/login', body)
        .then(({data}) => {
            console.log('NO SE QUE PASA');
            localStorage.setItem('auth', true)
            navigate('/app')
        })
        .catch(({response})=>{
            console.log(response)
        })
    }

    return (
        <main className="bg-gray-900 flex flex-col md:flex-row h-screen items-center">
            <section className="hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen border-gray-900	border-s-4" dir="rtl">
                <img className="w-full h-full object-cover" src={Space01} alt="" />
            </section>
            <section className="bg-gray-950 text-white text-opacity-70 w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
            <div className="w-full h-100">
                <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12 text-center">Inicio de sesion</h1>
                <form className="mt-6">
                    <div className="mt-6">
                        <label className="block">Usuario</label>
                        <input type="text" placeholder="Digite usuario" className="w-full px-4 py-3 rounded-lg bg-gray-800 mt-2 border focus:border-blue-500 focus:bg-gray-900 focus:outline-none" 
                        label='username'
                        value={body.username}
                        onChange={handleChange}
                        name='username'
                        required/>
                    </div>
                    <div className="mt-4">
                        <label className="block">Contrasena</label>
                        <input type="password" placeholder="Digite constrasenia" className="w-full px-4 py-3 rounded-lg bg-gray-800 mt-2 border focus:border-blue-500 focus:bg-gray-900 focus:outline-none" 
                        label='password'
                        value={body.password}
                        onChange={handleChange}
                        name='password'
                        required/>
                    </div>
                    <button type="submit" className="w-full block bg-blue-900 hover:bg-blue-800 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                    onClick={onSubmit}>
                        Iniciar Sesion
                    </button>
                </form>
            </div>
            </section>
        </main>
    );
};

export default Login;
