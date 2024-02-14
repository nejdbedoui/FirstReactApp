import React, { useEffect, useRef } from 'react';

const CustomFontSizeBlock = ({ data, onDataChange }) => {
  const blockElementRef = useRef(null);

  useEffect(() => {
    if (data && data.textSize) {
      blockElementRef.current.style.fontSize = `${data.textSize}px`;
    }
  }, [data]);

  const handleTextSizeChange = (event) => {
    const newSize = event.target.value;
    const newData = { ...data, textSize: newSize };
    onDataChange(newData);
  };

  return (
    <div className="ce-block" data-id={data.id} ref={blockElementRef}>
      <textarea
        value={data.text}
        onChange={(event) => onDataChange({ ...data, text: event.target.value })}
      />
      <label>
        Text Size:
        <input type="number" value={data.textSize} onChange={handleTextSizeChange} />
      </label>
    </div>
  );
};

export default CustomFontSizeBlock;