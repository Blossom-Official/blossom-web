'use client';
import { ComponentProps, ReactNode } from 'react';

interface InputProps extends ComponentProps<'input'> {
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  inputClassName?: ComponentProps<'input'>['className'];
}

const Input = ({
  leftComponent,
  rightComponent,
  className = '',
  inputClassName = '',
  ...inputProps
}: InputProps) => {
  return (
    <div className={`flex items-center gap-10 ${className}`}>
      <div>{leftComponent}</div>
      <input {...inputProps} className={`flex-1 ${inputClassName}`} />
      <div>{rightComponent}</div>
    </div>
  );
};
export default Input;
