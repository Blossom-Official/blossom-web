'use client';

import { Suspense } from '@suspensive/react';
import Link from 'next/link';
import { useState } from 'react';

import { useGetRecommend } from '@/api/flower-recommend';
import { Loading } from '@/common/components/loading';
import { Photo } from '@/common/components/photo';
import { SvgIcon } from '@/common/components/svg-icon';
import { useStep, useTimeout } from '@/common/hooks';

import {
  AnimatedBackground,
  Quiz1,
  Quiz2,
  Quiz3,
  Quiz4,
  Quiz5,
  RandomFlower,
} from './components';
import { Options, useSelectOptions } from './hooks';

const QuizPage = () => {
  const { step, setStep, nextStep, prevStep } = useStep([
    'intro',
    'quiz-1',
    'quiz-2',
    'quiz-3',
    'quiz-4',
    'quiz-5',
    'finish',
  ]);

  const { options, handleSelect } = useSelectOptions({
    onSelect: () => nextStep(),
  });

  return (
    <>
      <header className='absolute z-[1000] flex w-full justify-between bg-transparent p-16'>
        <Link href='/'>
          <SvgIcon height='24' id='left-arrow' width='24' />
        </Link>
      </header>

      {step === 'intro' && (
        <>
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
              onClick={() => setStep('quiz-1')}
            >
              시작하기
            </button>
          </div>
        </>
      )}

      {step === 'quiz-1' && (
        <section className='flex flex-col px-20 pb-20 pt-56'>
          <Step step={1} />
          <p className='mb-32 mt-22 text-24 font-bold leading-32 text-white'>
            선물 받는 상대와의 관계가 어떻게 되시나요?
          </p>
          <Quiz1 value={options['relationship']} onSelect={handleSelect} />
        </section>
      )}

      {step === 'quiz-2' && (
        <section className='flex flex-col px-20 pb-20 pt-56'>
          <Step step={2} />
          <p className='mb-32 mt-22 text-24 font-bold leading-32 text-white'>
            상대방의 나이대를 알려주세요.
          </p>
          <Quiz2 value={options['age']} onSelect={handleSelect} />
          <BackButton onClick={prevStep} />
        </section>
      )}

      {step === 'quiz-3' && (
        <section className='flex flex-col px-20 pb-20 pt-56'>
          <Step step={3} />
          <p className='mb-32 mt-22 text-24 font-bold leading-32 text-white'>
            상대에게 전하고 싶은 마음이 있나요?
          </p>
          <Quiz3 value={options['mind']} onSelect={handleSelect} />
          <BackButton onClick={prevStep} />
        </section>
      )}

      {step === 'quiz-4' && (
        <section className='flex flex-col px-20 pb-20 pt-56'>
          <Step step={4} />
          <p className='mb-32 mt-22 text-24 font-bold leading-32 text-white'>
            상대가 좋아하거나 어울리는 색이 있나요?
          </p>
          <Quiz4 value={options['color']} onSelect={handleSelect} />
          <BackButton onClick={prevStep} />
        </section>
      )}

      {step === 'quiz-5' && (
        <section className='flex flex-col px-20 pb-20 pt-56'>
          <Step step={5} />
          <p className='mb-32 mt-22 text-24 font-bold leading-32 text-white'>
            당신이 생각하는 상대는 어떤 분위기를 가졌나요?
          </p>
          <Quiz5 value={options['vibe']} onSelect={handleSelect} />
          <BackButton onClick={prevStep} />
        </section>
      )}

      {step === 'finish' && (
        <Suspense.CSROnly>
          <Finish options={options} />
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
      <div className='relative h-screen overflow-hidden'>
        <div className='absolute top-0 h-full w-full'>
          <Photo alt='background-image' src='/images/background-image.png' />
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
