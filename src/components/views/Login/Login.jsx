import React, { useState } from "react";
import '../../../css/root.css';
import Space01 from '../../../img/Space04.jpg';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [body, setBody] = useState({ username: '', password: '' })
    const navigate = useNavigate()


    const handleChange = e => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = () => {
        navigate('/app')
        console.log(body)
    }

    return (
        <main className="container">
            <section className="manejo image-section">
                <img src={Space01} className="background-image" alt="Imagen de fondo" />
            </section>
            <section className="formulario">
                <h2>Bienvenido de vuelta</h2>
                <form>
                    <div>
                        <label>Correo:</label>
                        <input
                            type="text"
                            className="caja"
                            value={body.username}
                            onChange={handleChange}
                            placeholder="Ingresa tu correo"
                            required
                        />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={body.password}
                            onChange={handleChange}
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" onClick={() => onSubmit()}>Iniciar Sesion</button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Login;
