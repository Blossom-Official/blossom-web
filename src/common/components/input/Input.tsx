'use client';
import { ComponentProps, ReactNode } from 'react';

interface InputProps extends ComponentProps<'input'> {
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  wrapperClassName?: string;
}

const Input = ({
  leftComponent,
  rightComponent,
  className = '',
  wrapperClassName = '',
  ...inputProps
}: InputProps) => {
  return (
    <div className={`flex items-center gap-10 ${wrapperClassName}`}>
      <div>{leftComponent}</div>
      <input {...inputProps} className={`flex-1 ${className}`} />
      <div>{rightComponent}</div>
    </div>
  );
};
export default Input;
