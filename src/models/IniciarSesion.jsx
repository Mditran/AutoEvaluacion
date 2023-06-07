import React, { useState } from "react";
import '../css/root.css';
import Space01 from '../img/Space04.jpg';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes realizar la lógica de autenticación o enviar los datos al servidor
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <main className="container">
            <section className="manejo image-section">
                <img src={Space01} className="background-image" alt="Imagen de fondo" />
            </section>
            <section className="formulario">
                <h2>Bienvenido de vuelta</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Correo:</label>
                        <input
                            type="email"
                            className="caja"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Ingresa tu correo"
                            required
                        />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Iniciar Sesion</button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Login;
