import { Teeth } from "./Teeth";

import { useState } from 'react';

export const Odontograma = () => {
    const [odontogramState, setOdontogramState] = useState({});

    const handleToothUpdate = (id, toothState) => {
        setOdontogramState(prevState => ({ ...prevState, [id]: toothState }));
    };


    return (
        <div className="flex justify-center items-center mt-28">
            <svg version="1.1" className="w-1/2">
                <Teeth start={18} end={11} x={0} y={0} handleChange={handleToothUpdate} />
                <Teeth start={21} end={28} x={210} y={0} handleChange={handleToothUpdate} />
                {/* <Teeth start={55} end={51} x={75} y={40} handleChange={handleToothUpdate} />
                <Teeth start={61} end={65} x={210} y={40} handleChange={handleToothUpdate} />
                <Teeth start={85} end={81} x={75} y={80} handleChange={handleToothUpdate} />
                <Teeth start={71} end={75} x={210} y={80} handleChange={handleToothUpdate} />
                <Teeth start={48} end={41} x={0} y={120} handleChange={handleToothUpdate} />
                <Teeth start={31} end={38} x={210} y={120} handleChange={handleToothUpdate} /> */}
            </svg>
        </div>
    )
}
