import React, {useEffect, useState} from 'react'
import ApiRequest from '../../../helpers/axiosInstances'

const Notificacion = () => {
 //const url = 'http://localhost/4000/api';

	const [notificacionList, setNotificacionList] = useState([]);
	const [estado, setEstado] = useState(true);



    const getNotificaciones = async (valor) => { 
        await ApiRequest().post('/notificaciones', {body: valor})
        .then(({data}) => {
            setNotificacionList(data);
            console.log(data);
        })
        .catch(({response})=>{
            console.log(response)
        })
	} 
    
    return (
        <div >
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <button className={`px-4 py-2 ml-96 mb-8 ${estado? 'bg-green-800 text-white':'bg-yellow-500 text-white'}`} 
                onClick={()=>{                  
                        console.log(estado);
                        if(estado){
                            getNotificaciones(1)
                            setEstado(false)
                        }else{
                            getNotificaciones(0)
                            setEstado(true)
                        }
                    }
                }>{!estado?'Mostrar Pendientes':'Mostrar Completados'}</button>
                
                <table className="sticky w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope='col' className='border px-6 py-3'>#</th>
                            <th scope='col' className='border px-6 py-3'>Nombre de Labor</th>
                            <th scope='col' className='border px-6 py-3'>Tipo Labor</th>
                            <th scope='col' className='border px-6 py-3'>Descripcion</th>
                            <th scope='col' className='border px-6 py-3'>Identificacion</th>
                            <th scope='col' className='border px-6 py-3'>Nombre</th>
                            <th scope='col' className='border px-6 py-3'>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                    {notificacionList.map((notificar,i)=>(
                        <tr key={i}>
                            <td className='border px-6 py-4'>{(i+1)}</td>
                            <td className='border px-6 py-4'>{notificar.lab_nombre}</td>
                            <td className='border px-6 py-4'>{notificar.tl_descripcion}</td>
                            <td className='border px-6 py-4'>{notificar.lab_descripcion}</td>
                            <td className='border px-6 py-4'>{notificar.usr_identificacion}</td>
                            <td className='border px-6 py-4'>{notificar.usr_nombre} {notificar.usr_apellido}</td>
                            <td className='border px-6 py-4'>{estado? 'Por realizar': 'Completado'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
	)
}
export default Notificacion