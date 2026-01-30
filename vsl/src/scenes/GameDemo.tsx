import {AbsoluteFill, useCurrentFrame, interpolate, Img, staticFile} from 'remotion';
import {PhoneFrame} from '../components/PhoneFrame';

interface GameDemoProps {
  screenshots: string[];
  label: string;
  sublabel?: string;
  durationInFrames: number;
}

export const GameDemo: React.FC<GameDemoProps> = ({screenshots, label, sublabel, durationInFrames}) => {
  const frame = useCurrentFrame();
  const framesPerScreenshot = Math.floor(durationInFrames / screenshots.length);

  // Determine which screenshot to show
  const currentIndex = Math.min(
    Math.floor(frame / framesPerScreenshot),
    screenshots.length - 1
  );

  // Get the frame within current screenshot
  const localFrame = frame - currentIndex * framesPerScreenshot;

  // FAST screenshot transition
  const imgOpacity = interpolate(localFrame, [0, 5], [0.5, 1], {
    extrapolateRight: 'clamp',
  });

  // Subtle scale pop on new screenshot
  const imgScale = interpolate(localFrame, [0, 8], [1.02, 1], {
    extrapolateRight: 'clamp',
  });

  // Label appears fast
  const labelOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a1a',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 60,
      }}
    >
      {/* Label at top - BIG and clear */}
      <div
        style={{
          textAlign: 'center',
          opacity: labelOpacity,
          marginBottom: 30,
          padding: '0 30px',
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {label}
        </div>
        {sublabel && (
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: '#8b6914',
              fontFamily: 'system-ui, sans-serif',
              marginTop: 10,
            }}
          >
            {sublabel}
          </div>
        )}
      </div>

      {/* Phone - BIG */}
      <div style={{transform: `scale(${imgScale})`}}>
        <PhoneFrame scale={1.5}>
          <Img
            src={staticFile(screenshots[currentIndex])}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: imgOpacity,
            }}
          />
        </PhoneFrame>
      </div>

      {/* Bottom indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          display: 'flex',
          gap: 8,
        }}
      >
        {screenshots.map((_, i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: i === currentIndex ? '#8b6914' : '#444',
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
