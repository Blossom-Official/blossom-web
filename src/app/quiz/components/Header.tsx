import { PropsWithChildren } from 'react';

const Header = ({ children }: PropsWithChildren) => {
  return (
    <header className='absolute z-[1000] flex w-full justify-between bg-transparent p-16'>
      {children}
    </header>
  );
};

export default Header;
