import { Tooth } from "./Tooth";

export const Teeth = ({ start, end, x, y, handleChange, onZoneClick, treatments }) => {
  const tooths = getArray(start, end);

  return (
    <g id="gmain">
      {tooths.map((i, index) => (
        <Tooth
          onChange={handleChange}
          key={i}
          number={i}
          positionY={y}
          positionX={x + index * 30}
          onZoneClick={onZoneClick}
          treatments={treatments}
        />
      ))}
    </g>
  );
};

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