'use client';

import { Suspense } from '@suspensive/react';
import Link from 'next/link';
import { useState } from 'react';

import { useGetRecommend } from '@/api/flower-recommend';
import { Loading } from '@/common/components/loading';
import { Photo } from '@/common/components/photo';
import { SvgIcon } from '@/common/components/svg-icon';
import { useAuth, useStep, useTimeout } from '@/common/hooks';

import {
  AnimatedBackground,
  Header,
  Quiz1,
  Quiz2,
  Quiz3,
  Quiz4,
  Quiz5,
  RandomFlower,
} from './components';
import { Options, useSelectOptions } from './hooks';

const QuizPage = () => {
  const auth = useAuth();
  const [step, setStep, prevStep] = useStep([
    'intro',
    'quiz-1',
    'quiz-2',
    'quiz-3',
    'quiz-4',
    'quiz-5',
    'finish',
  ] as const);

  const { selections, handleSelect } = useSelectOptions();

  return (
    <>
      {step === 'intro' && (
        <>
          <Header>
            <Link href='/'>
              <SvgIcon height='24' id='left-arrow' width='24' />
            </Link>
          </Header>
          <AnimatedBackground />
          <div className='absolute inset-0 bg-black/60'></div>
          <div className='absolute inset-0 flex flex-col items-center justify-center gap-40 text-white'>
            <div>
              <h1 className='px-24 text-center text-24 font-bold leading-32'>
                어떤 꽃을 선물할지 고민 되시나요?
              </h1>
              <p className='px-58 text-center text-14 font-light leading-24'>
                블라썸이 준비한 5가지 질문들로 선물하는 상대, 상황에 맞는 꽃을
                찾아보아요!
              </p>
            </div>
            <RandomFlower />
            <button
              className='h-48 w-181 bg-pink-100 text-center text-16 font-medium leading-24 text-pink-200'
              type='button'
              onClick={auth.validate(() => setStep('quiz-1'))}
            >
              시작하기
            </button>
          </div>
        </>
      )}

      {step === 'quiz-1' && (
        <>
          <Header>
            <button type='button' onClick={prevStep}>
              <SvgIcon height='24' id='left-arrow' width='24' />
            </button>
          </Header>
          <section className='flex h-[100dvh] flex-col px-20 pb-20 pt-56'>
            <Step step={1} />
            <p className='mb-32 mt-22 text-24 font-bold leading-32 text-white'>
              선물 받는 상대와의 관계가 어떻게 되시나요?
            </p>
            <Quiz1
              value={selections['relationship']}
              onClickNext={() => setStep('quiz-2')}
              onSelect={handleSelect}
            />
          </section>
        </>
      )}

      {step === 'quiz-2' && (
        <>
          <Header>
            <button type='button' onClick={prevStep}>
              <SvgIcon height='24' id='left-arrow' width='24' />
            </button>
          </Header>
          <section className='flex h-[100dvh] flex-col px-20 pb-20 pt-56'>
            <Step step={2} />
            <p className='mb-32 mt-22 text-24 font-bold leading-32 text-white'>
              상대방의 나이대를 알려주세요.
            </p>
            <Quiz2
              value={selections['age']}
              onClickNext={() => setStep('quiz-3')}
              onSelect={handleSelect}
            />
            <BackButton onClick={prevStep} />
          </section>
        </>
      )}

      {step === 'quiz-3' && (
        <>
          <Header>
            <button type='button' onClick={prevStep}>
              <SvgIcon height='24' id='left-arrow' width='24' />
            </button>
          </Header>
          <section className='flex h-[100dvh] flex-col px-20 pb-20 pt-56'>
            <Step step={3} />
            <p className='mt-22 text-24 font-bold leading-32 text-white'>
              상대에게 전하고 싶은 마음이 있나요?
            </p>
            <p className='mb-32 text-12 leading-20 text-white'>
              전하고 싶은 메시지가 담긴 꽃말을 가진 꽃 추천을 돕는 문항으로,
              꽃을 선물하는 의미에 대해 생각해보아요!
            </p>
            <Quiz3
              value={selections['mind']}
              onClickNext={() => setStep('quiz-4')}
              onSelect={handleSelect}
            />
            <BackButton onClick={prevStep} />
          </section>
        </>
      )}

      {step === 'quiz-4' && (
        <>
          <Header>
            <button type='button' onClick={prevStep}>
              <SvgIcon height='24' id='left-arrow' width='24' />
            </button>
          </Header>
          <section className='flex flex-col px-20 pb-20 pt-56'>
            <Step step={4} />
            <p className='mt-22 text-24 font-bold leading-32 text-white'>
              상대가 좋아하거나 어울리는 색이 있나요?
            </p>
            <p className='mb-32 text-12 leading-20 text-white'>
              꽃 조합의 메인 색상을 결정하는 문항으로, 상황이나 이벤트에 맞는
              색으로 골라주세요!
            </p>
            <Quiz4
              value={selections['color']}
              onClickNext={() => setStep('quiz-5')}
              onSelect={handleSelect}
            />
            <BackButton onClick={prevStep} />
          </section>
        </>
      )}

      {step === 'quiz-5' && (
        <>
          <Header>
            <button type='button' onClick={prevStep}>
              <SvgIcon height='24' id='left-arrow' width='24' />
            </button>
          </Header>
          <section className='flex flex-col px-20 pb-20 pt-56'>
            <Step step={5} />
            <p className='mt-22 text-24 font-bold leading-32 text-white'>
              당신이 생각하는 상대는 어떤 분위기를 가졌나요?
            </p>
            <p className='mb-32 text-12 leading-20 text-white'>
              좋아하는 계절이나 생일의 계절도 좋아요!
            </p>
            <Quiz5
              value={selections['season']}
              onClickNext={() => setStep('finish')}
              onSelect={handleSelect}
            />
            <BackButton onClick={prevStep} />
          </section>
        </>
      )}

      {step === 'finish' && (
        <Suspense.CSROnly>
          <Finish options={selections} />
        </Suspense.CSROnly>
      )}
    </>
  );
};

export default QuizPage;

interface Props {
  onClick: () => void;
}
const BackButton = ({ onClick }: Props) => {
  return (
    <button
      className='mt-20 text-left text-16 font-medium leading-24 text-white/50'
      type='button'
      onClick={onClick}
    >
      이전으로
    </button>
  );
};

interface FinishProps {
  options: Options;
}
const Finish = ({ options }: FinishProps) => {
  const { data: recommend } = useGetRecommend(options);
  const [loading, setLoading] = useState(true);

  const hide = () => setLoading(false);

  useTimeout(hide, 5000);

  return (
    <>
      <div className='relative h-[100dvh] overflow-hidden'>
        <div className='absolute top-0 h-full w-full'>
          <Photo alt='배경화면' src='/images/background-image.png' />
        </div>
      </div>
      <div className='absolute inset-0 bg-black/50'></div>

      <div className='absolute inset-0 flex flex-col items-center justify-center gap-40 px-20 pb-20 pt-56 text-white'>
        <h1 className='px-24 text-center text-24 font-bold leading-32'>
          {recommend.nickname}님에게 추천드려요.
        </h1>
        <div className='relative mx-auto flex h-fit min-h-300 w-full items-center justify-center overflow-hidden bg-green-200/80 px-20 py-22'>
          {loading ? (
            <>
              <Loading />
            </>
          ) : (
            <>
              <div className='text-center'>
                {/* <Photo
                  alt={recommend.koreanName}
                  className='mb-32'
                  src={recommend.imageUrl}
                /> */}
                <Photo
                  alt={recommend.koreanName}
                  className='mb-32'
                  src='/images/flower-5.png'
                />
                <div className='mb-17'>
                  <p className='text-24 font-extrabold'>
                    {recommend.koreanName}
                  </p>
                  <p className='text-20 font-medium leading-24'>
                    {recommend.englishName}
                  </p>
                </div>
                <Link
                  className='flex items-center justify-center text-14 font-light leading-20 text-grey'
                  href={`/flowers/${recommend.flowerId}`}
                >
                  자세히 보러가기
                  <SvgIcon height='24' id='right-arrow-2' width='24' />
                </Link>
              </div>
            </>
          )}
        </div>

        <Link
          className='flex flex-col items-center justify-center gap-8 text-12 leading-20 text-green-100'
          href='/'
        >
          다시 홈으로
          <SvgIcon height='10' id='bottom-arrow' width='42' />
        </Link>
      </div>
    </>
  );
};

interface StepProps {
  step: number;
}

const Step = ({ step }: StepProps) => {
  return (
    <div className='flex items-center gap-8 font-lemon-milk text-30 font-light leading-32 '>
      <span className='text-white'>{String(step).padStart(2, '0')}</span>
      <span className='h-1 flex-1 bg-[#5D6155]'></span>
      {step !== 5 ? (
        <span className='text-[#5D6155]'>
          {String(step + 1).padStart(2, '0')}
        </span>
      ) : (
        <span className='text-[#5D6155]'>FIN</span>
      )}
    </div>
  );
};
