import React, { useReducer } from 'react';

export const Tooth = ({ number, positionX, positionY, onChange }) => {
    const initialState = {
        center: 0,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    function reducer(state, action) {
        switch (action.type) {
            case 'toggle':
                return { ...state, [action.zone]: state[action.zone] === 0 ? 1 : 0 };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleClick = (zone) => {
        dispatch({ type: 'toggle', zone });
        onChange(number, { ...state, [zone]: state[zone] === 0 ? 1 : 0 });
    };

    const getColor = (zone) => {
        return state[zone] === 1 ? 'fill-blue-500' : 'fill-white';
    };

    const translate = `translate(${positionX},${positionY})`;

    return (
        <svg className="tooth">
            <g transform={translate}>
                <polygon
                    points="0,0 20,0 15,5 5,5"
                    onClick={() => handleClick('top')}
                    className={`border ${getColor('top')}`}
                />
                <polygon
                    points="5,15 15,15 20,20 0,20"
                    onClick={() => handleClick('bottom')}
                    className={`border ${getColor('bottom')}`}
                />
                <polygon
                    points="15,5 20,0 20,20 15,15"
                    onClick={() => handleClick('left')}
                    className={`border ${getColor('left')}`}
                />
                <polygon
                    points="0,0 5,5 5,15 0,20"
                    onClick={() => handleClick('right')}
                    className={`border ${getColor('right')}`}
                />
                <polygon
                    points="5,5 15,5 15,15 5,15"
                    onClick={() => handleClick('center')}
                    className={`border ${getColor('center')}`}
                />
                <text
                    x="6"
                    y="30"
                    stroke="navy"
                    fill="navy"
                    strokeWidth="0.1"
                    className="tooth">
                    {/* {number} */}
                </text>
            </g>
        </svg>
    );
}

