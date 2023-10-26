import { ActionSheet } from '@/common/components/action-sheet';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileImageActionSheet = ({ isOpen, onClose }: Props) => {
  /**
   * TODO
   * 1. 기본이미지로 변경 API
   * 2. 파일에서 선택 후 서버로 전송
   */

  return (
    <ActionSheet isOpen={isOpen} onClose={onClose}>
      <ActionSheet.Button>갤러리에서 선택하기</ActionSheet.Button>
      <ActionSheet.Button>기본 이미지로 변경하기</ActionSheet.Button>
      <ActionSheet.Button className='text-[#f86b41]' onClick={onClose}>
        취소
      </ActionSheet.Button>
    </ActionSheet>
  );
};

export default ProfileImageActionSheet;
