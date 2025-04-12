import { useRef, useState, useEffect } from 'react';
import './Field.css'


interface EditableNumberProps {
    value: string | number;
    onChange: (newValue: string) => void;
}

const EditableNumber: React.FC<EditableNumberProps> = ({ value, onChange} ) => {
    const [number, setNumber] = useState(value);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setNumber(value);
    }, [value]); 

    const handleFocus = () => {
      setIsEditing(true);
      setTimeout(() => inputRef.current?.select(), 0);
    };
  
    const handleBlur = () => setIsEditing(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setNumber(newValue);
        onChange(newValue);
    };

    return (
      <div className="editable-container">
        <input
          ref={inputRef}
          type="number"
          value={number}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`editable-input ${isEditing ? "active" : ""}`}
          inputMode="numeric"
        />
      </div>
    );
};

export default EditableNumber;