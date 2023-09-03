'use client';

import { useKeenSlider } from 'keen-slider/react';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { useGetContentById } from '@/api/content';
import { Photo } from '@/common/components/photo';

interface Props {
  contentId: string;
}
const Contents = ({ contentId }: Props) => {
  const { data: content } = useGetContentById(Number(contentId));
  const [sliderRef] = useKeenSlider({
    slides: {
      origin: 'center',
    },
  });
  return (
    <ul className='keen-slider text-white' ref={sliderRef}>
      <li className='keen-slider__slide min-w-full max-w-full'>
        <Photo
          alt='main'
          className='h-[100dvh]'
          sizes='(max-width: 440px): 100vw, 440px'
          src={content.contentImageUrl}
        />
        <div className='absolute inset-0 bg-content-overlay'></div>
        <section className='absolute bottom-85 px-20'>
          <div className='text-16 font-normal leading-24 text-green-100'>
            {content.postedAt}
          </div>
          <h2 className='text-16 font-medium leading-24'>{content.subtitle}</h2>
          <h1 className='font-lemon-milk text-30 font-medium leading-32'>
            {content.title}
          </h1>
          <div className='border-b pt-12'></div>
          <div className='pt-12 text-14 font-light leading-20'>
            {content.description}
          </div>
        </section>
      </li>
      {content.contentDetailInfos.map((contentDetail, index) => {
        return (
          <li className='keen-slider__slide min-w-full max-w-full' key={index}>
            <Photo
              alt='main'
              className='h-[100dvh]'
              sizes='(max-width: 440px): 100vw, 440px'
              src={contentDetail.contentImageUrl}
            />
            <div className='absolute inset-0 bg-content-overlay'></div>

            <section className='absolute top-85 px-20 font-medium text-grey'>
              <h2 className='text-16 leading-24'>{content.subtitle}</h2>
              <h1 className='font-lemon-milk text-20 leading-24'>
                {content.title}
              </h1>
            </section>

            <ConditionalLink
              className='absolute bottom-85 px-20'
              hasLink={contentDetail.hasLink}
              href={
                contentDetail.hasLink
                  ? (contentDetail.linkUrl as string)
                  : undefined
              }
            >
              <section>
                <div className='text-24 font-bold leading-32'>
                  {contentDetail.title}
                </div>
                <div className='text-14 font-light leading-20 text-grey'>
                  {contentDetail.subtitle}
                </div>
                <div className='border-b pt-12'></div>
                <div className='pt-12 text-14 font-light leading-20'>
                  {contentDetail.description}
                </div>
                <div className='text-right text-14 font-light leading-20 text-grey'>
                  {index + 2} / {content.totalPage}
                </div>
              </section>
            </ConditionalLink>
          </li>
        );
      })}
      <li className='keen-slider__slide min-w-full max-w-full'>
        <Photo
          alt='main'
          className='h-[100dvh]'
          sizes='(max-width: 440px): 100vw, 440px'
          src={content.contentImageUrl}
        />
        <div className='absolute inset-0 bg-content-overlay'></div>
        <div className='absolute inset-0 overflow-y-auto pb-20'>
          <section className='mt-85 px-20 font-medium text-grey'>
            <h2 className='text-16 leading-24'>{content.subtitle}</h2>
            <h1 className='font-lemon-milk text-20 leading-24'>
              {content.title}
            </h1>
            <p className='pt-12 text-14 font-light leading-20 text-white'>
              {content.description}
            </p>
          </section>

          <section className='mt-94 px-20'>
            <h3 className='mb-16 border-b font-lemon-milk text-16 leading-24'>
              MORE
            </h3>
            <ul className='flex flex-col gap-20'>
              {content.more.map((content) => (
                <li data-item-id={content.contentId} key={content.contentId}>
                  <Link href={`/contents/${content.contentId}`}>
                    <div className='relative'>
                      <Photo
                        alt='temp'
                        height='98'
                        sizes='(max-width: 440px): 100vw, 440px'
                        src={content.imageUrl}
                        width='158'
                      />
                      <div className='absolute bottom-8 left-8 flex flex-col gap-4 p-12 text-left'>
                        <span className='text-16 font-medium leading-24'>
                          {content.subtitle}
                        </span>
                        <span className='font-lemon-milk text-30 font-medium leading-32'>
                          {content.title}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </li>
    </ul>
  );
};

export default Contents;

interface ConditionalLinkProps {
  hasLink: boolean;
  href?: string;
  className?: string;
}
const ConditionalLink = ({
  children,
  hasLink,
  href,
  className,
}: PropsWithChildren<ConditionalLinkProps>) => {
  if (hasLink) {
    return (
      <a className={className} href={href} target='_blank'>
        {children}
      </a>
    );
  }
  return <div className={className}>{children}</div>;
};
