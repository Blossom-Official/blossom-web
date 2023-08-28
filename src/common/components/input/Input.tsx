'use client';
import { ComponentProps, ForwardedRef, forwardRef, ReactNode } from 'react';

interface InputProps extends ComponentProps<'input'> {
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  wrapperClassName?: string;
}

const Input = forwardRef(function Input(
  props: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const {
    leftComponent,
    rightComponent,
    className = '',
    wrapperClassName = '',
    ...inputProps
  } = props;
  return (
    <div className={`flex items-center gap-10 ${wrapperClassName}`}>
      <div>{leftComponent}</div>
      <input {...inputProps} className={`flex-1 ${className}`} ref={ref} />
      <div>{rightComponent}</div>
    </div>
  );
});

export default Input;
