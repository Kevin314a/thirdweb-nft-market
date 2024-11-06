import { generateUuid } from '@/lib/utils';
import React from 'react';

interface GradientTextProps {
  text: string;
  fontSize?: number;
  colors?: string[];
}

const GradientText: React.FC<GradientTextProps> = ({
  text,
  fontSize = 24,
  colors = ['#FFF', '#C3976A'],
}) => {
  const rndId = generateUuid();
  return (
    <svg height={fontSize * 1.5}>
      <defs>
        <linearGradient id={rndId} x1="0%" y1="0%" x2="100%" y2="0%">
          {colors.map((color, index) => (
            <stop
              key={index}
              offset={`${(index / (colors.length - 1)) * 100}%`}
              style={{ stopColor: color, stopOpacity: 1 }}
            />
          ))}
        </linearGradient>
      </defs>
      <text
        x="0"
        y={fontSize}
        fontSize={fontSize}
        fill={`url(#${rndId})`}
        fontWeight="bold"
      >
        {text}
      </text>
    </svg>
  );
};

export default GradientText;