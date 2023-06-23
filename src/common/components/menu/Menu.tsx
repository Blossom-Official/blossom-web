'use client';
import { ComponentProps, ReactNode } from 'react';

import { SvgIcon } from '../svg-icon';
import { MenuProvider, useMenuContext } from './MenuProvider';

interface MenuProps extends ComponentProps<'nav'> {
  isOpen: boolean;
  onClose: () => void;
}

const Menu = ({ children, isOpen, onClose, className, ...rest }: MenuProps) => {
  return (
    <MenuProvider isOpen={isOpen} onClose={onClose}>
      {isOpen && (
        <nav className={`absolute inset-0 ${className}`} {...rest}>
          {children}
        </nav>
      )}
    </MenuProvider>
  );
};

interface MenuHeaderProps extends ComponentProps<'div'> {
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
}
const MenuHeader = ({
  className = '',
  leftComponent,
  rightComponent,
  ...rest
}: MenuHeaderProps) => {
  const context = useMenuContext();

  return (
    <div {...rest} className={`relative ${className}`}>
      <div className='absolute left-20'>
        {leftComponent ?? (
          <button
            type='button'
            onClick={() => {
              context.onClose();
            }}
          >
            <SvgIcon
              aria-labelledby='메뉴 닫기'
              height='24'
              id='menu-out'
              role='img'
              width='24'
            />
          </button>
        )}
      </div>
      <div className='absolute right-20'>{rightComponent}</div>
    </div>
  );
};

type MenuListProps = ComponentProps<'ul'>;
const MenuList = ({ children, ...rest }: MenuListProps) => {
  return <ul {...rest}>{children}</ul>;
};

type MenuItemProps = ComponentProps<'li'>;
const MenuItem = ({ children, ...rest }: MenuItemProps) => {
  return <li {...rest}>{children}</li>;
};

export default Object.assign(Menu, {
  Header: MenuHeader,
  List: MenuList,
  Item: MenuItem,
});
