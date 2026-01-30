import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
  scale?: number;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({children, scale = 1}) => {
  const frameWidth = 390 * scale;
  const frameHeight = 844 * scale;
  const bezelWidth = 4 * scale;  // Minimal bezel - much tighter
  const borderRadius = 24 * scale;  // Smaller radius

  return (
    <div
      style={{
        width: frameWidth + bezelWidth * 2,
        height: frameHeight + bezelWidth * 2,
        backgroundColor: '#000',
        borderRadius: borderRadius,
        padding: bezelWidth,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* No notch - clean minimal frame */}

      {/* Screen */}
      <div
        style={{
          width: frameWidth,
          height: frameHeight,
          borderRadius: borderRadius - bezelWidth,
          overflow: 'hidden',
          backgroundColor: '#fff',
        }}
      >
        {children}
      </div>
    </div>
  );
};
