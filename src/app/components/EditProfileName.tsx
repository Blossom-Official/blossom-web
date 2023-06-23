'use client';

import { ComponentProps, useState } from 'react';

import { usePutProfileNickname } from '@/api/user';
import { Input } from '@/common/components/input';
import { Menu } from '@/common/components/menu';
import { SvgIcon } from '@/common/components/svg-icon';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const EditProfileName = ({ isOpen, onClose }: Props) => {
  const [nickname, setNickname] = useState('');
  const { handleSubmit } = usePutProfileNickname(nickname);

  return (
    <Menu className='bg-black/80' isOpen={isOpen} onClose={onClose}>
      <Menu.Header
        className='px-20 pt-20'
        rightComponent={<DoneButton onClick={handleSubmit} />}
      />
      <form className='mx-auto mt-200 max-w-[70%]' onSubmit={handleSubmit}>
        <Input
          className='border-b border-b-white py-12 text-24-semibold-24 text-white'
          inputClassName='bg-transparent text-center'
          rightComponent={<DeleteButton onClick={() => setNickname('')} />}
          type='text'
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </form>
    </Menu>
  );
};
export default EditProfileName;

type DoneButtonProps = ComponentProps<'button'>;
const DoneButton = (props: DoneButtonProps) => {
  return (
    <button type='submit' {...props}>
      <SvgIcon
        aria-labelledby='프로필이름변경'
        height='24'
        id='done'
        role='img'
        width='24'
      />
    </button>
  );
};

type DeleteButtonProps = ComponentProps<'button'>;
const DeleteButton = (props: DeleteButtonProps) => {
  return (
    <button type='button' {...props}>
      <SvgIcon
        aria-labelledby='프로필이름 작성 지우기'
        height='24'
        id='menu-out'
        role='img'
        width='24'
      />
    </button>
  );
};
