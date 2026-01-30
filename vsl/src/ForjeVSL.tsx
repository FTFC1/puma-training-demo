import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile} from 'remotion';
import {PhoneFrame} from './components/PhoneFrame';

export const ForjeVSL: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // "Try it now" fades in
  const textOpacity = interpolate(frame, [0, 20], [0, 1], {extrapolateRight: 'clamp'});
  const textY = interpolate(frame, [0, 20], [20, 0], {extrapolateRight: 'clamp'});

  // Phone springs in
  const phoneSpring = spring({
    frame: frame - 10,
    fps,
    config: {damping: 12, stiffness: 80},
  });
  const phoneY = interpolate(phoneSpring, [0, 1], [100, 0]);
  const phoneOpacity = interpolate(frame, [10, 30], [0, 1], {extrapolateRight: 'clamp'});

  // Screenshots: question -> building -> feedback (animated flow) - 10s video
  const showBuilding = frame >= 90;
  const showFeedback = frame >= 180;

  const buildingOpacity = interpolate(frame, [90, 105], [0, 1], {extrapolateRight: 'clamp'});
  const feedbackOpacity = interpolate(frame, [180, 195], [0, 1], {extrapolateRight: 'clamp'});

  // Tap indicators
  const tap1Opacity = interpolate(frame, [60, 75, 90, 100], [0, 1, 1, 0], {extrapolateRight: 'clamp'});
  const tap2Opacity = interpolate(frame, [150, 165, 180, 190], [0, 1, 1, 0], {extrapolateRight: 'clamp'});

  // URL appears at end
  const urlOpacity = interpolate(frame, [240, 260], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: '#1a1a1a', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 80}}>
      {/* "Try it now" text */}
      <div
        style={{
          textAlign: 'center',
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        <div style={{fontSize: 64, fontWeight: 800, color: '#fff', fontFamily: 'system-ui'}}>
          Try it now.
        </div>
        <div style={{fontSize: 36, fontWeight: 600, color: '#8b6914', marginTop: 10}}>
          2 minutes. No signup.
        </div>
      </div>

      {/* Animated phone with game flow */}
      <div
        style={{
          marginTop: 40,
          opacity: phoneOpacity,
          transform: `translateY(${phoneY}px) scale(${0.8 + phoneSpring * 0.2})`,
        }}
      >
        <PhoneFrame scale={1.4}>
          <div style={{width: '100%', height: '100%', position: 'relative'}}>
            {/* Base: Question screenshot */}
            <Img
              src={staticFile('screenshots/06-basket-question.png')}
              style={{width: '100%', height: '100%', objectFit: 'cover'}}
            />

            {/* Building screenshot */}
            <Img
              src={staticFile('screenshots/07-basket-building.png')}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: showFeedback ? 0 : buildingOpacity,
              }}
            />

            {/* Feedback screenshot */}
            <Img
              src={staticFile('screenshots/08-basket-feedback.png')}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: feedbackOpacity,
              }}
            />

            {/* Tap indicator 1 */}
            <div style={{
              position: 'absolute',
              top: '55%',
              left: '15%',
              opacity: tap1Opacity,
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                background: 'rgba(255,255,255,0.9)',
                boxShadow: '0 0 20px rgba(255,255,255,0.5)',
              }} />
            </div>

            {/* Tap indicator 2 */}
            <div style={{
              position: 'absolute',
              top: '65%',
              left: '15%',
              opacity: tap2Opacity,
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                background: 'rgba(255,255,255,0.9)',
                boxShadow: '0 0 20px rgba(255,255,255,0.5)',
              }} />
            </div>
          </div>
        </PhoneFrame>
      </div>

      {/* URL at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          textAlign: 'center',
          opacity: urlOpacity,
        }}
      >
        <div style={{fontSize: 24, color: '#888', marginBottom: 10}}>
          Open in browser:
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: '#8b6914',
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
        <div style={{fontSize: 18, fontWeight: 700, letterSpacing: 2, color: '#666'}}>
          <span style={{color: '#8b6914'}}>FORJE</span> RETAIL TRAINING
        </div>
      </div>
    </AbsoluteFill>
  );
};
