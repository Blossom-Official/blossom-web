'use client';

import Link from 'next/link';
import { memo } from 'react';

import { useLogout } from '@/api/auth';
import { Menu } from '@/common/components/menu';
import { Photo } from '@/common/components/photo';
import { SvgIcon } from '@/common/components/svg-icon';
import { useAuth, useOverlay } from '@/common/hooks';

import EditProfileName from './EditProfileName';
import ProfileImageActionSheet from './ProfileImageActionSheet';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: Props) => {
  const { isLogin, user, validate: authValidate } = useAuth();
  const overlay = useOverlay();

  return (
    <Menu
      className='bg-[#2A2E24]/80 backdrop-blur-sm'
      isOpen={isOpen}
      onClose={onClose}
    >
      <Menu.Header className='h-50 px-20 pt-20' />
      <Menu.List className='flex flex-col px-20'>
        <Menu.Item className='relative flex flex-col items-center gap-24 pt-16'>
          <button
            type='button'
            onClick={authValidate(() => {
              overlay.open(({ isOpen, close }) => (
                <ProfileImageActionSheet isOpen={isOpen} onClose={close} />
              ));
            })}
          >
            <SvgIcon
              aria-labelledby='기본 프로필 이미지'
              className='mb-16'
              height='109'
              id='polygon'
              role='img'
              width='109'
            />
          </button>

          <p className='text-20-semibold-24 text-white'>
            {isLogin ? (
              <>
                <EditProfileNameButton name={user.nickname} />
              </>
            ) : (
              '로그인 후 사용해주세요!'
            )}
          </p>
          {isLogin ? <LogoutButton /> : <LoginButton />}
        </Menu.Item>
        {isLogin && (
          <Menu.Item className='flex flex-col gap-10 overflow-x-auto py-16 font-lemon-milk text-16-light-24 text-white'>
            <div className='flex w-full justify-between border-b border-b-white font-lemon-milk'>
              <span className='text-16-light-24 text-white'>LIKES</span>
              <Link
                className='flex items-center gap-2 text-14-light-24 text-green-100'
                href='/likes'
                onClick={() => onClose()}
              >
                SEE ALL
                <SvgIcon
                  aria-labelledby='좋아하기 모아둔 꽃 보러가기'
                  className='[&_*]:fill-green-100'
                  height='18'
                  id='right-arrow'
                  role='img'
                  width='18'
                />
              </Link>
            </div>
            {user.flowers.length === 0 ? (
              <p>모아둔 꽃이 없습니다.</p>
            ) : (
              <ul className='flex w-fit gap-12'>
                {user.flowers.map((flower) => {
                  return (
                    <li className='h-98 w-98' key={flower.flowerId}>
                      <Link
                        className='relative'
                        href={`/flowers/${flower.flowerId}`}
                      >
                        <Photo
                          alt={flower.koreanName}
                          className='h-full w-full'
                          src={flower.imageUrl}
                        />
                        <div className='absolute bottom-0 flex flex-col p-8'>
                          <span className='text-14 font-semibold leading-24'>
                            {flower.koreanName}
                          </span>
                          <span className='font-lemon-milk text-10 font-light leading-12'>
                            {flower.englishName}
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </Menu.Item>
        )}
        <Menu.Item className='flex flex-col gap-10 border-y border-y-white py-16 font-lemon-milk text-16-light-24 text-white'>
          <p>ABOUT BLOSSOM</p>
          <p>HOW TO USE</p>
        </Menu.Item>
        <Menu.Item className='flex flex-col gap-10 py-16 text-16-light-24 text-grey'>
          <Link href='/'>이용약관</Link>
          <Link href='/'>개인정보처리방침</Link>
          <Link href='/'>서비스 피드백</Link>
        </Menu.Item>
        <Menu.Item className='item absolute bottom-10 flex-1 font-lemon-milk text-14-light-24 text-grey'>
          © blossom. All rights reserved.
        </Menu.Item>
      </Menu.List>
    </Menu>
  );
};
export default Sidebar;

const LoginButton = memo(() => {
  return (
    <Link
      className='mb-28 flex items-center bg-[#8E9A78] px-8 py-2 font-lemon-milk text-14-light-24 text-white'
      href='/signin'
    >
      <SvgIcon
        aria-labelledby='로그인 페이지로 이동'
        height='24'
        id='login'
        role='img'
        width='24'
      />
      LOG IN
    </Link>
  );
});
LoginButton.displayName = 'LoginButton';

const LogoutButton = memo(() => {
  const logout = useLogout();

  return (
    <button
      className='mb-28 flex items-center bg-[#8E9A78] px-8 py-2 font-lemon-milk text-14-light-24 text-white'
      type='button'
      onClick={() => {
        logout.mutate();
      }}
    >
      <SvgIcon
        aria-labelledby='로그아웃하기'
        height='24'
        id='login'
        role='img'
        width='24'
      />
      LOG OUT
    </button>
  );
});
LogoutButton.displayName = 'LogoutButton';

const EditProfileNameButton = memo(({ name }: { name: string }) => {
  const overlay = useOverlay();

  return (
    <button
      className='flex items-end'
      type='button'
      onClick={() => {
        overlay.open(({ isOpen, close }) => (
          <EditProfileName isOpen={isOpen} onClose={close} />
        ));
      }}
    >
      <span className='text-24-bold-24'>{name}</span>님
      <SvgIcon
        aria-labelledby='프로필 수정'
        className='pl-3'
        height='24'
        id='pencil'
        role='img'
        width='24'
      />
    </button>
  );
});
EditProfileNameButton.displayName = 'EditProfileNameButton';
