import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile} from 'remotion';

export const CustomerSaysDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Phone springs in
  const phoneScale = spring({frame, fps, config: {damping: 12}});

  // Show question screenshot first, then correct screenshot
  const showCorrect = frame >= 50;

  // Tap indicator appears before transition
  const tapOpacity = interpolate(frame, [40, 45, 50, 55], [0, 1, 1, 0], {extrapolateRight: 'clamp'});
  const tapScale = interpolate(frame, [40, 45], [0.5, 1], {extrapolateRight: 'clamp'});

  // Screenshot crossfade
  const correctOpacity = interpolate(frame, [50, 58], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center'}}>
      {/* Label */}
      <div style={{
        position: 'absolute',
        top: 60,
        textAlign: 'center',
        opacity: interpolate(frame, [5, 15], [0, 1], {extrapolateRight: 'clamp'}),
      }}>
        <div style={{fontSize: 42, fontWeight: 700, color: '#fff', fontFamily: 'system-ui'}}>
          Read the customer
        </div>
        <div style={{fontSize: 28, fontWeight: 500, color: '#8b6914', marginTop: 8}}>
          Know their type instantly
        </div>
      </div>

      {/* Phone with real screenshot */}
      <div
        style={{
          marginTop: 100,
          transform: `scale(${phoneScale * 1.35})`,
          position: 'relative',
        }}
      >
        {/* Phone frame */}
        <div style={{
          width: 300,
          height: 650,
          backgroundColor: '#000',
          borderRadius: 40,
          padding: 8,
          boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: 32,
            overflow: 'hidden',
            position: 'relative',
          }}>
            {/* Question screenshot */}
            <Img
              src={staticFile('screenshots/03-customer-says-question.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />

            {/* Correct screenshot overlaid */}
            <Img
              src={staticFile('screenshots/04-customer-says-correct.png')}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: correctOpacity,
              }}
            />

            {/* Tap indicator */}
            <div style={{
              position: 'absolute',
              top: '52%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${tapScale})`,
              opacity: tapOpacity,
            }}>
              <div style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                background: 'rgba(255,255,255,0.9)',
                boxShadow: '0 0 20px rgba(255,255,255,0.5)',
              }} />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
