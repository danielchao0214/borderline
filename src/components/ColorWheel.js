import Wheel from '@uiw/react-color-wheel';
import { useState } from 'react';

function ColorWheel() {
  const [hsva, setHsva] = useState({ h: 0, s: 0, v: 100, a: 1 });
  return (
    <Wheel
      color={hsva}
      onChange={(color) => {
        setHsva({ ...hsva, ...color.hsva });
      }}
    />
  );
}

export default ColorWheel;