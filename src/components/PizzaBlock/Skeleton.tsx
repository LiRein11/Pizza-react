import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton:React.FC = () => (
  <ContentLoader
  className='pizza-block'
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="136" cy="138" r="125" />
    <rect x="0" y="291" rx="10" ry="10" width="280" height="22" />
    <rect x="0" y="331" rx="15" ry="15" width="280" height="88" />
    <rect x="0" y="444" rx="10" ry="10" width="95" height="30" />
    <rect x="127" y="434" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
