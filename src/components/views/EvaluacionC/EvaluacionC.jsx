import React, {useEffect, useState} from 'react'
import ApiRequest from '../../../helpers/axiosInstances'

const EvaluacionC = () => {
 //const url = 'http://localhost/4000/api';
    const initialState = {
        eva_id: 0,
        lab_id: 0,
        lab_nombre: "",
        tl_id: 0,
        tl_descripcion: "",
        lab_descripcion: "",
        lab_horas: 0,
        per_id: 0,
        per_nombre: "",
        per_fechainicio: "",
        per_fechafin: "",
        usr_identificacion: 0,
        rol_id: 0,
        
        eva_estado:"En ejecucion",
        eva_resultado:"",
        eva_evidencia:"",
        eva_puntaje: 0,
        eva_sugerencias:'',
        eva_observaciones:'',

	}
    const initialStateUser = [{
        usr_identificacion: "",
        usr_nombre: "",
        usr_apellido: "",
        rol_id:0
	}]

    const datosUsuario = JSON.parse(localStorage.getItem('userData'));


	const [evaluacionList, setEvaluacionList] = useState([]);
	const [body, setBody] = useState(initialState);
	const [title, setTitle] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalMensaje, setShowModalMensaje] = useState(false);
	const [idDelete, setIdDelete] = useState('');
	const [periodoDelete, setPeriodoDelete] = useState('');
	const [isId, setIsId] = useState('');
	const [usuario, setUsuario] = useState(initialStateUser);
	const [periodos, setPeriodos] = useState([]);
	const [labores, setLabores] = useState([]);
	const [isEdit, setIsEdit] = useState(false);
	const [isSelected, setIsSelected] = useState(false);
	const [isFound, setIsFound] = useState(false);
	const [mensaje, setMensaje] = useState('')
    let totalHoras = 0;

    

    const getEvaluaciones = async (idPeriodo) => {
		if(Number(idPeriodo)===0){
            setEvaluacionList([])
        }else{
            const { data } = await ApiRequest().post('/evaluaciones', {usr_identificacion: usuario[0].usr_identificacion, per_id: idPeriodo})
            //console.log(data);
            setEvaluacionList(data)
        }
	}

    const getLabores = async (idPeriodo) => {
        if(usuario[0].rol_id === 3){
		    const { data } = await ApiRequest().get('/labores3')
            setLabores(data)
        }else{
            
		    const { data } = await ApiRequest().get('/labores2')
            setLabores(data)
        }
        //console.log(data);
	}

    const getUsuario = async () => {
        console.log(isId);
        try {
            const { data } = await ApiRequest().post('/usuario', { id: isId })
            totalHoras = 0;
            if(data.length>0){
                setUsuario(data);
                getLabores()
                setIsFound(true);
                setEvaluacionList([])
                getPeirodos2(data[0].usr_identificacion)
            }else{
                console.log('Manejo del mensaje');
                setUsuario(initialStateUser)
                setIsFound(false)
                //console.log('El docente no existe1');
            }
        }
        catch({response}){
            setMensaje('',response.data.message)
            handleMesaje()
            setUsuario(initialStateUser)
            setEvaluacionList([])
            setIsFound(false)
            //console.log('El docente no existe');
        }
	}

    const handleMesaje = async ()=>{
        setShowModalMensaje(true)
        console.log(showModalMensaje);
    }

    const getPeirodos2 = async (identification) => { 
        await ApiRequest().post('/periodos2', {usr_identificacion: identification})
        .then(({data}) => {
            setPeriodos(data);
        })
        .catch(({response})=>{
            console.log(response)
        })
	} 

    const getPeirodos3 = async (identification) => { 
        await ApiRequest().get('/periodos3')
        .then(({data}) => {
            setPeriodos(data);
        })
        .catch(({response})=>{
            console.log(response)
        })
	} 

    useEffect(()=>{
        console.log(showModalMensaje);
    }, [showModalMensaje])

    const onChange = ({ target }) => {
        const { name, value } = target
        setBody({
            ...body,
            [name]: value
        });
        //setSelectedPeriodo(value !== "");
    };

    const handleHora = (hora) => {
        totalHoras = totalHoras + hora;
    };

    const onSubmit = async () => {
        setShowModal(false);
        body.usr_identificacion = usuario[0].usr_identificacion;
        body.rol_id = usuario[0].rol_id;
        body.lab_id = Number(body.lab_id);
        body.per_id = Number(body.per_id);
        

        try {
            const {datoEvaluacion} = await ApiRequest().post('/evaluaciones/guardar', body);
            setBody(initialState);
            setIsSelected(false);
            getPeirodos2(usuario[0].usr_identificacion)
            console.log('Dato evaluacion: ', datoEvaluacion);
            /* getEvaluaciones(); */
        } catch (error) {
            if (error.response) {
            // Error de respuesta del servidor (con código de estado y datos de error)
            const { status, data } = error.response;
            console.log('Código de estado:', status);
            console.log('Datos de error:', data);
            } else if (error.request) {
            // Error de solicitud sin respuesta del servidor
            console.log('Error de solicitud:', error.request);
            } else {
            // Otros errores
            console.log('Error:', error.message);
            }
        }
    };

        const onEdit = async () => {
            try {
                setShowModal(false)
                console.log('Datos observacion', body.eva_observaciones);
                const { data } = await ApiRequest().post('/evaluacionesC/editar', {body})
                //handleDialog()
                console.log('Hola: ',data);
                setBody(initialState)
                setMensaje({
                    ident: new Date().getTime(),
                    message: data.message,
                    type: 'success'
                })
                console.log(usuario[0]);
                getEvaluaciones(body.per_id)
            } catch ({ response }) {
                setMensaje({
                    ident: new Date().getTime(),
                    message: response.data.sqlMessage,
                    type: 'error'
                })
            }
        }

            const onDelete = async () => {
                try {
                    const { data } = await ApiRequest().post('/evaluaciones/eliminar', { id: idDelete })
                    setMensaje({
                        ident: new Date().getTime(),
                        message: data.message,
                        type: 'success'
                    })
                    setEvaluacionList([])
                    getPeirodos2(usuario[0].usr_identificacion)
                    //getEvaluaciones(body.per_id)
                } catch ({ response }) {
                    setMensaje({
                        ident: new Date().getTime(),
                        message: response.data.sqlMessage,
                        type: 'error'
                    })
                }
            }

    return (
        <div >
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="pb-4 bg-white dark:bg-gray-900">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className='flex  pl-5 pr-10'>
                        <div className="relative mt-1 mr-12">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                            <div className='flex'>
                                <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-s-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={isId} onChange={(e)=>{
                                    setIsId(e.target.value)
                                    //console.log(e.target.value);
                                }} laceholder="Search"/>
                                <button className='bg-cyan-600 text-gray-300 p-2 px-3 rounded-e' onClick={()=>{
                                    getUsuario()
                                    body.per_id = 0
                                }}>Buscar</button>
                            </div>
                        </div>
                        {(isFound)? <button className='px-4 py-2 ml-96 bg-gray-800 text-white'  onClick={() => {
                            setTitle('Crear');
                            setBody(initialState);
                            setIsEdit(false);
                            setIsSelected(false)
                            getLabores();
                            getPeirodos3()
                            setShowModal(true)}}>
                                <i className='fa-solid fa-circle-plus'></i> Nuevo
                        </button> : null}
                    </div>
                </div>
                <table className="sticky w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope='col' className='border px-6 py-3'>
                                <div className='flex items-center'>
                                    <p className='pr-6 justify-center items-center'>Periodo</p>
                                    {isFound?
                                        <select
                                        
                                        name="per_id"
                                        style={{
                                            backgroundColor: 'withe',
                                            padding: '8px',
                                            borderRadius: '4px',
                                            width: '70%',
                                            color: 'lighgray',
                                            fontSize: '14px',
                                        }}
                                        value={body.per_id}
                                        onChange={(e)=>{
                                            onChange(e)
                                            getEvaluaciones(e.target.value)

                                        }}
                                        >
                                            <option value={0}>Seleccionar Periodo</option>
                                            {periodos.map(periodo => (
                                                <option key={periodo.per_id} value={periodo.per_id}>{periodo.per_nombre}</option>
                                            ))}  
                                        </select> : null}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr>
                            <td className='border px-6 py-4 flex'><p className='pr-28'>Nombre:</p> {usuario[0].usr_nombre} {usuario[0].usr_apellido}</td>
                        </tr>
                        <tr>
                            <td className='border px-6 py-4 flex'><p className='pr-4'>{`Identificacion (Docente): `}</p>{usuario[0].usr_identificacion}</td>
                        </tr>
                    </tbody>
                </table>
                <table className="sticky w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope='col' className='border px-6 py-3'>#</th>
                            <th scope='col' className='border px-6 py-3'>Nombre de Labor</th>
                            <th scope='col' className='border px-6 py-3'>Tipo Labor</th>
                            <th scope='col' className='border px-6 py-3'>Horas</th>
                            <th scope='col' className='border px-6 py-3'>Descripcion</th>
                            <th scope='col' className='border px-6 py-3'>{`ACTO(Si aplica)`}</th>
                            <th scope='col' className='border px-6 py-3'>Fecha inicio</th>
                            <th scope='col' className='border px-6 py-3'>Fecha fin</th>
                            <th scope='col' className='border px-6 py-3'>Estado</th>
                            <th scope='col' className='border px-6 py-3'>Resultados</th>
                            <th scope='col' className='border px-6 py-3'>Evaluacion</th>
                            <th scope='col' className='border px-6 py-3'>Sugerencias</th>
                            <th scope='col' className='border px-6 py-3'>Observaciones</th>
                            <th scope='col' className='border px-6 py-3'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {evaluacionList.map((evaluacion,i)=>(
                        <tr key={(i+1)}>
                            {handleHora(evaluacion.lab_horas)}
                            <td className='border px-6 py-4'>{(i+1)}</td>
                            <td className='border px-6 py-4'>{evaluacion.lab_nombre}</td>
                            <td className='border px-6 py-4'>{evaluacion.tl_descripcion}</td>
                            <td className='border px-6 py-4'>{evaluacion.lab_horas}</td>
                            <td className='border px-6 py-4'>{evaluacion.lab_descripcion}</td>
                            <td className='border px-6 py-4 text-center'>X</td>
                            <td className='border px-6 py-4'>{evaluacion.per_fechainicio.split("T")[0]}</td>
                            <td className='border px-6 py-4'>{evaluacion.per_fechafin.split("T")[0]}</td>
                            <td className='border px-6 py-4'>{evaluacion.eva_estado}</td>
                            <td className='border px-6 py-4'>{evaluacion.eva_resultado}</td>
                            <td className='border px-6 py-4 text-center'>{evaluacion.eva_puntaje}</td>
                            <td className='border px-6 py-4 text-center'>{evaluacion.eva_evidencia}</td>
                            <td className='border px-6 py-4 text-center'>{evaluacion.eva_sugerencias}</td>
                            <td className='border px-6 py-4 text-center'>{evaluacion.eva_observaciones}</td>
                            <td className='border px-6 py-4'>
                                <button className='bg-yellow-400 text-black p-2 px-3 rounded' onClick={() => {
                                    //console.log(evaluacionList);
                                    setBody(evaluacion)
                                    setTitle('Modificar')
                                    setIsEdit(true)
                                    setShowModal(true);}}
                                >
                                    <i className='fa-solid fa-edit'></i>    
                                </button>    
                                &nbsp;
                                <button className='bg-red-700 text-gray-300 p-2 px-3 rounded'  onClick={() => {
                                    setIdDelete(evaluacion.eva_id)
                                    setPeriodoDelete(evaluacion.lab_nombre)
                                    setShowModalDelete(true)
                                }}>
                                    <i className='fa-solid fa-trash'></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            <td></td>
                            <td></td>
                            <td className='border px-6 py-4'>Total: </td>
                            <td className='border px-6 py-4'>{totalHoras}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            {showModal ? (
                <>
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-500">
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => {
                                setShowModal(false)
                                setIsSelected(false)
                            }} >
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only text-black">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">{title} evaluacion</h3>
                                <form className="space-y-6" action="#">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Periodo</label>
                                        <select
                                        
                                        name="per_id"
                                        style={{
                                            backgroundColor: 'withe',
                                            padding: '8px',
                                            borderRadius: '4px',
                                            width: '100%',
                                            color: 'lighgray',
                                            fontSize: '14px',
                                        }}
                                        value={body.per_id}
                                        onChange={(e)=>{
                                            onChange(e)
                                            //getEvaluaciones(e.target.value)

                                        }}
                                        >
                                            <option value={0}>Seleccionar Periodo</option>
                                            {periodos.map(periodo => (
                                                <option key={periodo.per_id} value={periodo.per_id}>{periodo.per_nombre}</option>
                                            ))}  
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Labor</label>
                                        <select
                                        
                                        name="lab_id"
                                        style={{
                                            backgroundColor: 'withe',
                                            padding: '8px',
                                            borderRadius: '4px',
                                            width: '100%',
                                            color: 'lighgray',
                                            fontSize: '14px',
                                        }}
                                        value={body.lab_id}
                                        onChange={(e)=>{
                                            onChange(e)
                                            setIsSelected(true)
                                        }}
                                        >
                                            <option value={0}>Seleccionar Labor</option>
                                            {labores.map(labor => (
                                                <option key={labor.lab_id} value={labor.lab_id}>{labor.lab_nombre}</option>
                                            ))}  
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion labor</label>
                                        <textarea
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        disabled value={isSelected? `${labores.find((labor) => labor.lab_id === Number(body.lab_id)).lab_descripcion}`: ""}
                                        placeholder={body.lab_descripcion}
                                        />

                                    </div>
                                    {isEdit?
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                                        <select
                                        name="eva_estado"
                                        style={{
                                            backgroundColor: 'withe',
                                            padding: '8px',
                                            borderRadius: '4px',
                                            width: '100%',
                                            color: 'lighgray',
                                            fontSize: '14px',
                                        }}
                                        value={body.eva_estado}
                                        onChange={(e)=>{
                                            onChange(e)
                                        }}
                                        
                                        >
                                            <option value="En ejecucion">En ejecucion</option>
                                            <option value="Terminado">Terminado</option>
                                            <option value="Suspendido">Suspendido</option>
                                        </select>

                                    </div>:null}
                                    {isEdit?
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Observaciones</label>
                                        <textarea name='eva_observaciones' id='eva_observaciones' 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={body.eva_observaciones}
                                        onChange={(e)=>{
                                            onChange(e)
                                            console.log(body.eva_observaciones);
                                        }}
                                        />

                                    </div>:null}
                                    
                                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={isEdit ? () => onEdit() : () => onSubmit()
                                    }>{title}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            ) : null}

			{showModalDelete ? (
                <>
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-500">
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => setShowModalDelete(false)} >
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only text-black">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Desea eliminar la evalucion {periodoDelete}</h3>
                                <div className='border px-6 py-6 pl-10 flex justify-evenly'>
                                    <button className='bg-green-600 text-gray-300 p-2 px-10 rounded' onClick={() => {
                                        onDelete();
                                        setShowModalDelete(false);}}
                                        >
                                        Aceptar 
                                    </button>    
                                    &nbsp;
                                    <button className='bg-red-700 text-gray-300 p-2 px-10 rounded'  onClick={() => {
                                        setIdDelete('')
                                        setPeriodoDelete('')
                                        setShowModalDelete(false)
                                    }}>
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            ) : null}
            {showModalMensaje ? (
                <>
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-500">
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => setShowModalMensaje(false)} >
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only text-black">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">{mensaje}</h3>
                                <div className='border px-6 py-6 pl-10 flex justify-evenly'>
                                    <button className='bg-green-600 text-gray-300 p-2 px-10 rounded' onClick={setShowModalMensaje(false)}
                                        >
                                        Aceptar 
                                    </button>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            ) : null}
        </div>
	)
}

export default EvaluacionC

