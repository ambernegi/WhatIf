import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string;
};

export function BaseUrlImg({ src, ...rest }: Props) {
  const resolvedSrc = useBaseUrl(src);
  return <img src={resolvedSrc} {...rest} />;
}

