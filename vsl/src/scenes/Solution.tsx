import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile} from 'remotion';
import {PhoneFrame} from '../components/PhoneFrame';

export const Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Text punches in fast
  const textOpacity = interpolate(frame, [0, 8], [0, 1], {extrapolateRight: 'clamp'});
  const textY = interpolate(frame, [0, 8], [30, 0], {extrapolateRight: 'clamp'});

  // Phone springs up dramatically - THE REVEAL
  const phoneSpring = spring({
    frame: frame - 15,
    fps,
    config: {damping: 12, stiffness: 80},
  });
  const phoneY = interpolate(phoneSpring, [0, 1], [200, 0]);
  const phoneOpacity = interpolate(frame, [15, 25], [0, 1], {extrapolateRight: 'clamp'});
  const phoneScale = interpolate(phoneSpring, [0, 1], [0.8, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a1a',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 80,
        overflow: 'hidden',
      }}
    >
      {/* Text */}
      <div
        style={{
          textAlign: 'center',
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
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
          We built training
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#8b6914',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          that actually works.
        </div>
      </div>

      {/* Phone - springs up from below */}
      <div
        style={{
          marginTop: 40,
          opacity: phoneOpacity,
          transform: `translateY(${phoneY}px) scale(${phoneScale})`,
        }}
      >
        <PhoneFrame scale={1.4}>
          <Img
            src={staticFile('screenshots/01-landing.png')}
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
        </PhoneFrame>
      </div>
    </AbsoluteFill>
  );
};
