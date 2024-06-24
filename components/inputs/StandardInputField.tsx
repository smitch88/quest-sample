import React, { useState } from 'react';
import SearchIcon from '@/public/icons/search.svg';
import EyeIcon from '@/public/icons/visibility.svg';
import EyeOffIcon from '@/public/icons/visibility_off.svg';
import clsx from 'clsx';
import './AsymetricInputField.styles.css';

export interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'search' | 'password' | 'text';
  customStyles?: string;
}

const StandardInputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  customStyles = '',
}) => {
  const [isTextVisible, setIsTextVisible] = useState(false);

  const toggleTextVisibility = () => {
    setIsTextVisible(!isTextVisible);
  };

  const inputType = type === 'password' ? (isTextVisible ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-neutral-800 font-sans text-xs">{label}</label>
      <div className={`relative flex items-center bg-neutral-100 border border-neutral-400 rounded-md px-3 py-2 shadow ${customStyles}`}>
        {type === 'search' && (
          <span className="flex items-center mr-2 text-neutral-400">
            <SearchIcon className="h-5 w-5" />
          </span>
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-grow bg-transparent border-none outline-none text-neutral-800 font-sans text-xs"
        />
        {type === 'password' && (
          <button type="button" onClick={toggleTextVisibility} className="flex items-center ml-2">
            {isTextVisible ? <EyeIcon className="h-5 w-5"/> : <EyeOffIcon className="h-5 w-5" />}
          </button>
        )}
      </div>
    </div>
  );
};

export default StandardInputField;
