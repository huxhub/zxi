import Image from 'next/image';

export function Photo({
  image,
  alt,
  priority = false,
  sizes = '(max-width: 767px) 100vw, 50vw',
  className = '',
}) {
  return (
    <Image
      src={image.src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}

export default Photo;
