"use client";
import Link from "next/link";

import { SvgIcon } from "@/common/components/svg-icon";
import { useOverlay } from "@/common/hooks";

import Sidebar from "./components/Sidebar";

export default function Home() {
  const overlay = useOverlay();

  return (
    <div className="flex min-h-screen flex-col justify-center bg-green-800 p-20">
      <Link href="/signin">Login</Link>
      <Link href="/logout">logout</Link>
      {/* 네비게이션 바 제작 */}
      <button
        type="button"
        onClick={() => {
          overlay.open(({ isOpen, close }) => (
            <Sidebar isOpen={isOpen} onClose={close} />
          ));
        }}
      >
        <SvgIcon
          aria-labelledby="메뉴 버튼"
          height="22"
          id="menu"
          role="img"
          width="22"
        />
      </button>

      <section className="mb-50 w-full text-white">
        <p className="text-center">마음을 피워요</p>
        <h1 className="text-center">BLOSSOM</h1>
      </section>

      <Link
        className="flex w-full justify-between border border-solid border-white p-10 text-white"
        href="/search"
      >
        검색하기
        <span>화살표 아이콘</span>
      </Link>
    </div>
  );
}
