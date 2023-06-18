import Link from "next/link";

import { Menu } from "@/common/components/menu";
import { SvgIcon } from "@/common/components/svg-icon";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: Props) => {
  return (
    <Menu
      className="bg-[#3E482F]/80 backdrop-blur-sm"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Menu.Header className="px-20 pt-20" />
      <Menu.List className="flex flex-col divide-y divide-white px-20">
        <Menu.Item className="flex items-center gap-24 py-16">
          <SvgIcon height="96" id="polygon" width="96" />
          <div className="flex flex-col gap-20">
            <p>로그인 후 사용해주세요!</p>
            <Link className="flex items-center bg-[#8E9A78]" href="/signin">
              <SvgIcon
                aria-labelledby="로그인 페이지로 이동"
                height="24"
                id="login"
                role="img"
                width="24"
              />
              LOG IN
            </Link>
          </div>
        </Menu.Item>
        <Menu.Item className="flex flex-col gap-10 py-16">
          <p>ABOUT BLOSSOM</p>
          <p>HOW TO USE</p>
        </Menu.Item>
        <Menu.Item className="flex flex-col gap-10 py-16">
          <Link href="/">이용약관</Link>
          <Link href="/">개인정보처리방침</Link>
          <Link href="/">서비스 피드백</Link>
        </Menu.Item>
      </Menu.List>
    </Menu>
  );
};
export default Sidebar;
