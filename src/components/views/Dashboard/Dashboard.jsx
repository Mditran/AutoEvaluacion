import React from 'react'

const Dashboard = () => {
    return (
        <div className="container mx-auto flex flex-col items-center" style={{backgroundColor: 'white'}}>
            <div className="flex flex-col items-center">
                <h5 className="mt-3 font-bold text-xl">Bienvenido a</h5>
                <h2 className="mt-3 font-bold text-4xl">Evaluaciones</h2>
            </div>
            <div className="mt-6 ">
                <img src="https://e7.pngegg.com/pngimages/94/414/png-clipart-astronaut-astronaut.png" alt="..." class="flex items-center max-h-96 mt-6"/>
            </div>
        </div>

    )
}

export default Dashboard