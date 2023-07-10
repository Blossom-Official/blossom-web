import clsx from 'clsx';
import { ComponentProps, ReactNode } from 'react';

interface ChipProps extends ComponentProps<'button'> {
  label: string;
  leftComponent?: ReactNode;
}
const Chip = ({ label, className, leftComponent, ...rest }: ChipProps) => {
  return (
    <button
      {...rest}
      className={clsx(
        'flex items-center gap-8 rounded-full border px-12 py-2 text-[1.2rem] font-light leading-[2.4rem]',
        className
      )}
    >
      {label}
      {leftComponent}
    </button>
  );
};

export default Chip;
