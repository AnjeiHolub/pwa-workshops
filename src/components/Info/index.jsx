import React from 'react';
import './style.scss';

//компонент который отображает статус оффлайн или онлайн

const Info = ({ text }) => (
  <div className="Info__message">
      {text}
  </div>
);

export default Info;
