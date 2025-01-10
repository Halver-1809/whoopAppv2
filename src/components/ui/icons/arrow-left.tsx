import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ArrowLeftProps {
  width?: number;
  height?: number;
  color?: string;
  style?: any;
}

export const ArrowLeft: React.FC<ArrowLeftProps> = ({
  width = 10,
  height = 10,
  color = '#fff',
}) => (
  <Svg width={width} height={height} viewBox="0 0 7 14" fill="none">
    <Path
      d="M6.128 13.101a.874.874 0 0 1-.621-.253L.255 7.595a.875.875 0 0 1 0-1.234L5.507 1.11a.875.875 0 0 1 1.233 1.233l-4.63 4.63 4.63 4.632a.876.876 0 0 1-.622 1.496Z"
      fill={color}
    />
  </Svg>
);
