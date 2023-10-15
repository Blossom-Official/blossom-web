'use client';

import { SvgIcon } from '@/common/components/svg-icon';
import { useOverlay } from '@/common/hooks';

import Sidebar from './Sidebar';

const ProfileMenuButton = () => {
  const overlay = useOverlay();

  return (
    <button
      type='button'
      onClick={() => {
        overlay.open(({ isOpen, close }) => (
          <Sidebar isOpen={isOpen} onClose={close} />
        ));
      }}
    >
      <SvgIcon
        aria-labelledby='메뉴 버튼'
        height='22'
        id='menu'
        role='img'
        width='22'
      />
    </button>
  );
};

export default ProfileMenuButton;
