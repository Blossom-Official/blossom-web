'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { Response } from '@/api/user';

import { useCurrentUserContext } from '../context';

type Handler = (...args: any[]) => unknown;
type Validate = <T extends Handler>(handler?: T) => Handler;

export interface BaseUseAuthResult {
  user: Response | null;
  isLogin: boolean;
  validate: Validate;
}

export interface UseAuthResultOnLogin extends BaseUseAuthResult {
  user: Response;
  isLogin: true;
}
export interface UseAuthResultResultOnUnlogin extends BaseUseAuthResult {
  user: null;
  isLogin: false;
}

export function useAuth(): UseAuthResultOnLogin;
export function useAuth(): UseAuthResultResultOnUnlogin;
export function useAuth(): UseAuthResultOnLogin | UseAuthResultResultOnUnlogin;
export function useAuth() {
  const router = useRouter();

  const user = useCurrentUserContext();
  const isLogin = Boolean(user);

  const validate: Validate = useCallback(
    <T extends Handler>(handler?: T) =>
      (...arg: Parameters<T>) => {
        if (isLogin) {
          return handler?.(arg) as ReturnType<T>;
        }

        if (confirm('로그인이 필요합니다.\n로그인 페이지로 이동할까요?')) {
          router.push('/signin');
        }
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router]
  );

  return { user, isLogin, validate } as BaseUseAuthResult;
}
