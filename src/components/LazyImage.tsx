"use client";

import { useRef, useEffect, useState, ImgHTMLAttributes } from "react";

type LazyImageProps = {
  src: string;
  imageAlt: string;
  onLazyLoad?: (img: HTMLImageElement) => void;
};

type ImageNativeTypes = ImgHTMLAttributes<HTMLImageElement>

type Props = LazyImageProps & ImageNativeTypes

export const LazyImage = ({
  src,
  imageAlt,
  onLazyLoad,
  ...imgProps
}: Props): JSX.Element => {
  const node = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState<string>("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=");
  const [isLazyLoaded, setIsLazyLoaded] = useState(false);

  useEffect(() => {
    if (isLazyLoaded) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.info("Image is in the viewport");
          setCurrentSrc(src);
          observer.disconnect();
          setIsLazyLoaded(true);

          if(typeof onLazyLoad === 'function' && node.current) {
            onLazyLoad(node.current);
          }
        }
      });
    });

    if (node.current) {
      observer.observe(node.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, onLazyLoad, isLazyLoaded]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={node}
      src={currentSrc}
      alt={imageAlt}
      width={500}
      height={500}
      className="rounded bg-gray-300"
      {...imgProps}
    />
  );
};
