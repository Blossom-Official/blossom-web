import clsx from 'clsx';
import { ComponentProps } from 'react';

interface ChipProps extends ComponentProps<'button'> {
  label: string;
}
const Chip = ({ label, className, ...rest }: ChipProps) => {
  return (
    <button
      {...rest}
      className={clsx(
        'rounded-full border border-yellow px-12 py-2 text-[1.2rem] font-light leading-[2.4rem] text-yellow',
        className
      )}
    >
      {label}
    </button>
  );
};

export default Chip;