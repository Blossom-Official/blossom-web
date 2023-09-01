'use client';

import { Suspense } from '@suspensive/react';

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
          <Suspense.CSROnly>
            <Sidebar isOpen={isOpen} onClose={close} />
          </Suspense.CSROnly>
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
