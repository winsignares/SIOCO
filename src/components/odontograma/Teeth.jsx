import { Tooth } from "./Tooth";



export const Teeth = ({ start, end, x, y, handleChange }) => {
    const tooths = getArray(start, end);

    return (
        <g transform="scale(1.4)" id="gmain" className="">
            {tooths.map(i => (
                <Tooth
                    onChange={handleChange}
                    key={i}
                    number={i}
                    positionY={y}
                    positionX={Math.abs((i - start) * 25) + x}
                />
            ))}
        </g>
    )
}


function getArray(start, end) {
    if (start > end) return getInverseArray(start, end);

    let list = [];
    for (let i = start; i <= end; i++) {
        list.push(i);
    }

    return list;
}

function getInverseArray(start, end) {
    let list = [];

    for (let i = start; i >= end; i--) {
        list.push(i);
    }

    return list;
}
