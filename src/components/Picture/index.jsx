import React from 'react';
import { string } from 'prop-types';
import './style.scss';

//ужимаем картинки с помощью webp

const Picture = ({ src, alt, ...props}) => (
  <picture className="Picture">
    <source srcSet={`${src}?format=webp`} type="image/webp" />
    <img src={src} alt={alt} {...props} />
  </picture>
);

Picture.propTypes = {
  src: string.isRequired,
  alt: string,
}

export default Picture;
