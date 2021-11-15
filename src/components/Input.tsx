import React from 'react';

interface InputProps {
  title: string;
  type: React.HTMLInputTypeAttribute | undefined;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const Input: React.FC<InputProps> = ({
  title,
  type,
  value,
  onChange,
  children,
}) => {
  return (
    <div className='input-outline'>
      <span className='input-title'>{title}</span>
      <input type={type} onChange={onChange} value={value} accept='.tcx' />
      {children}
    </div>
  );
};

export default Input;
