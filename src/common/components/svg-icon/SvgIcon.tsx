import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  /** NOTE: icon id (icons 폴더 아래에 있는 svg 파일명과 동일함) */
  id: string;
}

const SvgIcon = ({
  id,
  width = 16,
  height = 16,
  fill = "none",
  ...rest
}: Props) => {
  return (
    <svg fill={fill} height={height} width={width} {...rest}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
};

export default SvgIcon;
