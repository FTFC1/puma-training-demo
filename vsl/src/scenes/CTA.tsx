import {AbsoluteFill, useCurrentFrame, interpolate, Img, staticFile} from 'remotion';
import {PhoneFrame} from '../components/PhoneFrame';

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();

  // "Try it now" punches in
  const tryOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const tryScale = interpolate(frame, [0, 8], [0.9, 1], {
    extrapolateRight: 'clamp',
  });

  // Phone fades in
  const phoneOpacity = interpolate(frame, [10, 18], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // URL appears and pulses
  const urlOpacity = interpolate(frame, [20, 28], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const pulse = 1 + Math.sin(frame * 0.15) * 0.03;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a1a',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 80,
      }}
    >
      {/* Big CTA Text at top */}
      <div
        style={{
          textAlign: 'center',
          opacity: tryOpacity,
          transform: `scale(${tryScale})`,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: '#ffffff',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Try it now.
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: '#8b6914',
            fontFamily: 'system-ui, sans-serif',
            marginTop: 10,
          }}
        >
          2 minutes. No signup.
        </div>
      </div>

      {/* Phone */}
      <div
        style={{
          marginTop: 40,
          opacity: phoneOpacity,
        }}
      >
        <PhoneFrame scale={1.2}>
          <Img
            src={staticFile('screenshots/01-landing.png')}
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
        </PhoneFrame>
      </div>

      {/* URL - big and clear */}
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          textAlign: 'center',
          opacity: urlOpacity,
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 500,
            color: '#888',
            fontFamily: 'system-ui, sans-serif',
            marginBottom: 10,
          }}
        >
          Open in browser:
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: '#8b6914',
            fontFamily: 'system-ui, sans-serif',
            transform: `scale(${pulse})`,
            padding: '12px 24px',
            backgroundColor: 'rgba(139, 105, 20, 0.15)',
            borderRadius: 8,
          }}
        >
          ftfc1.github.io/puma-training-demo
        </div>
      </div>

      {/* FORJE branding */}
      <div style={{position: 'absolute', bottom: 50}}>
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 2,
            color: '#666',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <span style={{color: '#8b6914'}}>FORJE</span> RETAIL TRAINING
        </div>
      </div>
    </AbsoluteFill>
  );
};
