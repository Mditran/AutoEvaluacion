import React from 'react'
import Astro from '../../../assets/img/Astro.png'

const Dashboard = () => {

    const userData = JSON.parse(localStorage.getItem('userData'));

    return (
        <div className="container mx-auto flex flex-col items-center" style={{backgroundColor: 'white'}}>
            <div className="flex flex-col items-center">
                <h2 className="mt-3 font-bold text-4xl">Bienvenido {userData.rol_descripcion}</h2>
                <h4 className="mt-3 font-bold text-3xl">{userData.usr_nombre} {userData.usr_apellido}</h4>
            </div> 
            <div className="mt-6 ">
                <img src={Astro} alt="..." className="flex items-center max-h-96 mt-6"/>
            </div>
        </div>
    )
}

export default Dashboard