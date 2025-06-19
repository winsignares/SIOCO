import React from 'react';

export const Tooth = ({ number, positionX, positionY, onChange, onZoneClick, treatments }) => {
    const getColor = (zone) => {
        const treatment = treatments?.[number]?.[zone];
        switch (treatment) {
            case 'caries':
                return 'fill-red-500';
            case 'restoration':
                return 'fill-green-500';
            case 'extraction':
                return 'fill-purple-500';
            case 'crown':
                return 'fill-yellow-500';
            case 'implant':
                return 'fill-orange-500';
            default:
                return 'fill-white';
        }
    };

    const handleClick = (zone) => {
        onZoneClick(number, zone);
    };

    const translate = `translate(${positionX},${positionY})`;

    return (
        <svg className='tooth ' >

            <g transform={translate}>
                <polygon
                    points="0,0 20,0 15,5 5,5"
                    onClick={() => handleClick('arriba')}
                    className={`border cursor-pointer hover:fill-gray-200 ${getColor('arriba')}`}
                />
                <polygon
                    points="5,15 15,15 20,20 0,20"
                    onClick={() => handleClick('abajo')}
                    className={`border cursor-pointer hover:fill-gray-200 ${getColor('abajo')}`}
                />
                <polygon
                    points="15,5 20,0 20,20 15,15"
                    onClick={() => handleClick('izquierda')}
                    className={`border cursor-pointer hover:fill-gray-200 ${getColor('izquierda')}`}
                />
                <polygon
                    points="0,0 5,5 5,15 0,20"
                    onClick={() => handleClick('derecha')}
                    className={`border cursor-pointer hover:fill-gray-200 ${getColor('derecha')}`}
                />
                <polygon
                    points="5,5 15,5 15,15 5,15"
                    onClick={() => handleClick('centro')}
                    className={`border cursor-pointer hover:fill-gray-200 ${getColor('centro')}`}
                />
                <text x="0" y="40" stroke="navy" fill="navy" strokeWidth="0.1" className="tooth">
                    {number}
                </text>
            </g>
        </svg>
    );
};
