import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile} from 'remotion';

export const BasketDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Phone springs in
  const phoneScale = spring({frame, fps, config: {damping: 12}});

  // Screenshots: question -> building -> feedback
  const showBuilding = frame >= 35;
  const showFeedback = frame >= 70;

  // Screenshot crossfades
  const buildingOpacity = interpolate(frame, [35, 43], [0, 1], {extrapolateRight: 'clamp'});
  const feedbackOpacity = interpolate(frame, [70, 78], [0, 1], {extrapolateRight: 'clamp'});

  // Tap indicators
  const tap1Opacity = interpolate(frame, [25, 30, 35, 40], [0, 1, 1, 0], {extrapolateRight: 'clamp'});
  const tap2Opacity = interpolate(frame, [60, 65, 70, 75], [0, 1, 1, 0], {extrapolateRight: 'clamp'});

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
          Build bigger baskets
        </div>
        <div style={{fontSize: 28, fontWeight: 500, color: '#8b6914', marginTop: 8}}>
          Cross-sell with confidence
        </div>
      </div>

      {/* Phone with real screenshots */}
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
            {/* Question screenshot (base) */}
            <Img
              src={staticFile('screenshots/06-basket-question.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
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
        </div>
      </div>
    </AbsoluteFill>
  );
};
