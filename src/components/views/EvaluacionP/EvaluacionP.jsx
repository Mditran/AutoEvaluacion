import React, {useState} from 'react'
import ApiRequest from '../../../helpers/axiosInstances'

const EvaluacionP = () => {
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
    eva_evidencia:'',
    eva_puntaje: 0,
    eva_sugerencias:'',
    eva_observaciones:'',

}

    const datosUsuario = JSON.parse(localStorage.getItem('userData'));

	const [evaluacionList, setEvaluacionList] = useState([]);
	const [body, setBody] = useState(initialState);
    const [showModal, setShowModal] = useState(false);
	const [periodos, setPeriodos] = useState([]);
    const [isMenor, setIsMenor] = useState(false);
	const [mensaje, setMensaje] = useState({ ident: null, message: null, type: null })
    let totalHoras = 0;

    

    const getEvaluaciones = async (idPeriodo) => {
		const { data } = await ApiRequest().post('/evaluaciones', {usr_identificacion: datosUsuario.usr_identificacion, per_id: idPeriodo})
        //console.log(data);
        setIsMenor(false)
        periodos.forEach((periodo)=>{
            console.log(Number(idPeriodo)===periodo.per_id);
            if(Number(idPeriodo)===periodo.per_id){
                body.per_fechafin = periodo.per_fechafin;
            }})
        periodos.forEach((periodo)=>{
                if(body.per_fechafin < periodo.per_fechafin){
                    setIsMenor(true)
            }
        })
		setEvaluacionList(data)
	}

    const getPeirodos2 = async () => { 
        await ApiRequest().post('/periodos2', {usr_identificacion: datosUsuario.usr_identificacion})
        .then(({data}) => {
            setPeriodos(data);
            console.log(data);
        })
        .catch(({response})=>{
            console.log(response)
        })
	} 


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

        const onEdit = async () => {
            setShowModal(false)
            try {
                const { data } = await ApiRequest().post('/evaluacionesP/editar', body);
                const periodoID = body.per_id;
                setBody(initialState)
                setMensaje({
                    ident: new Date().getTime(),
                    message: data.message,
                    type: 'success'
                })
                getEvaluaciones(periodoID)
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
                <table className="sticky w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope='col' className='border px-6 py-3'>
                                <div className='flex items-center'>
                                    <p className='pr-6 justify-center items-center'>Periodo</p>
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
                                        onClick={getPeirodos2}
                                        >
                                            <option value={0}>Seleccionar Periodo</option>
                                            {periodos.map(periodo => (
                                                <option key={periodo.per_id} value={periodo.per_id}>{periodo.per_nombre}</option>
                                            ))}  
                                        </select>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr>
                            <td className='border px-6 py-4 flex'><p className='pr-28'>Nombre:</p> {datosUsuario.usr_nombre} {datosUsuario.usr_apellido}</td>
                        </tr>
                        <tr>
                            <td className='border px-6 py-4 flex'><p className='pr-4'>{`Identificacion (Docente): `}</p>{datosUsuario.usr_identificacion}</td>
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
                            <th scope='col' className='border px-6 py-3'>Evidencias</th>
                            <th scope='col' className='border px-6 py-3'>Evaluacion</th>
                            <th scope='col' className='border px-6 py-3'>Sugerencias</th>
                            <th scope='col' className='border px-6 py-3'>Observaciones</th>
                            <th scope='col' className='border px-6 py-3'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {evaluacionList.map((evaluacion,i)=>(
                        <tr key={i}>
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
                            <td className='border px-6 py-4'>{evaluacion.eva_evidencia}</td>
                            <td className='border px-6 py-4 text-center'>{evaluacion.eva_puntaje}</td>
                            <td className='border px-6 py-4 text-center'>{evaluacion.eva_sugerencias}</td>
                            <td className='border px-6 py-4 text-center'>{evaluacion.eva_observaciones}</td>
                            {isMenor? null:
                            <td className='border px-6 py-4'>
                                <button className='bg-yellow-400 text-black p-2 px-3 rounded' onClick={() => {
                                    //console.log(evaluacionList);
                                    body.eva_id = evaluacion.eva_id;
                                    console.log(body.eva_id);
                                    setBody(evaluacion)
                                    setShowModal(true);}}
                                >
                                    <i className='fa-solid fa-edit'></i>    
                                </button>    
                            </td>}
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
                            }} >
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only text-black">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Subir Resultados y Calificacion</h3>
                                <form className="space-y-6" action="#">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Labor</label>
                                        <input type='text'
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={body.lab_nombre}
                                        disabled
                                        />
                                    </div>
                                    <div>
                                        
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion labor</label>
                                        <textarea
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        disabled value={body.lab_descripcion}
                                        />

                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Resultados</label>
                                        <textarea name='eva_resultado' id='eva_resultado' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={body.eva_resultado}
                                        onChange={onChange}
                                        required
                                        />
                                    </div>
                                    {((datosUsuario.rol_id === 4 || datosUsuario.rol_id === 5) && body.tl_id !== 1)?
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Documento</label>
                                            <input type='file'
                                            name='eva_evidencia' id='eva_evidencia' 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder={body.eva_evidencia}
                                            onChange={(e) => body.eva_evidencia = e.target.files[0].name}
                                            required
                                            />
                                        </div>
                                        :null
                                        }
                                    <div>
                                        <label htmlFor="eva_puntaje" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Puntaje</label>
                                        <input type="number" name="eva_puntaje" id="eva_puntaje" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" min="0" max="100" step="1" maxLength="3" pattern="[1-9]" 
                                        value={body.eva_puntaje}
                                        onChange={onChange}
                                        required/>
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sugerencias</label>
                                        <textarea name='eva_sugerencias' id='eva_sugerencias' 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={body.eva_sugerencias}
                                        onChange={(e)=>{
                                            onChange(e)
                                            console.log(body.eva_sugerencias);
                                        }}
                                        />

                                    </div>
                                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={onEdit}>Guardar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            ) : null}

        </div>
	)
}
export default EvaluacionP