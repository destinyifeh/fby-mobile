import React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export function HomeIcon({ size = 24, color = '#737080' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 10.5L12 3L21 10.5V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V10.5Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 22V12H15V22"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ScanIcon({ size = 24, color = '#737080' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Top left corner */}
      <Path
        d="M3 8V6C3 4.89543 3.89543 4 5 4H8"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Top right corner */}
      <Path
        d="M16 4H19C20.1046 4 21 4.89543 21 6V8"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom left corner */}
      <Path
        d="M3 16V18C3 19.1046 3.89543 20 5 20H8"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom right corner */}
      <Path
        d="M16 20H19C20.1046 20 21 19.1046 21 18V16"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Face - simplified */}
      <Circle cx="9" cy="10" r="1" fill={color} />
      <Circle cx="15" cy="10" r="1" fill={color} />
      <Path
        d="M9 15C9 15 10.5 17 12 17C13.5 17 15 15 15 15"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function HistoryIcon({ size = 24, color = '#737080' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Calendar body */}
      <Rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        stroke={color}
        strokeWidth={2}
      />
      {/* Calendar top lines */}
      <Path
        d="M16 2V6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M8 2V6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M3 10H21"
        stroke={color}
        strokeWidth={2}
      />
      {/* Heart */}
      <Path
        d="M12 17.5L11.4 16.95C9.1 14.85 7.5 13.4 7.5 11.65C7.5 10.25 8.6 9.15 10 9.15C10.8 9.15 11.6 9.55 12 10.15C12.4 9.55 13.2 9.15 14 9.15C15.4 9.15 16.5 10.25 16.5 11.65C16.5 13.4 14.9 14.85 12.6 16.95L12 17.5Z"
        fill={color}
      />
    </Svg>
  );
}

export function ProfileIcon({ size = 24, color = '#737080' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="12"
        cy="8"
        r="4"
        stroke={color}
        strokeWidth={2}
      />
      <Path
        d="M4 20C4 17 7.5 14 12 14C16.5 14 20 17 20 20"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}
