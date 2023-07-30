import Image from 'next/image';
import type { ComponentProps } from 'react';

type Props = ComponentProps<typeof Image>;
const base64Blur =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAEUlEQVR42mO8/Z8BAzAOZUEAQ+ESj6kXXm0AAAAASUVORK5CYII=';

const Photo = ({ alt, className = '', width, height, ...rest }: Props) => {
  return (
    <div
      className={`relative overflow-hidden [&>img]:!static ${className}`}
      style={
        width && height ? { aspectRatio: `calc(${width} / ${height})` } : {}
      }
    >
      <Image
        fill
        alt={alt}
        blurDataURL={base64Blur}
        placeholder='blur'
        sizes=' '
        style={{ objectFit: 'cover' }}
        {...rest}
      />
    </div>
  );
};

export default Photo;
