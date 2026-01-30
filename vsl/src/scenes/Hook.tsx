import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Line 1: "Your staff" - slides up from below
  const line1Y = interpolate(frame, [0, 12], [60, 0], {extrapolateRight: 'clamp'});
  const line1Opacity = interpolate(frame, [0, 10], [0, 1], {extrapolateRight: 'clamp'});

  // Line 2: "could sell" - slides up after
  const line2Y = interpolate(frame, [8, 20], [60, 0], {extrapolateRight: 'clamp'});
  const line2Opacity = interpolate(frame, [8, 18], [0, 1], {extrapolateRight: 'clamp'});

  // Line 3: "15% more." - BIG punch with spring
  const line3Scale = spring({
    frame: frame - 18,
    fps,
    config: {damping: 10, stiffness: 100},
  });
  const line3Opacity = interpolate(frame, [18, 24], [0, 1], {extrapolateRight: 'clamp'});

  // Subtle glow pulse on the number
  const glowIntensity = frame > 30 ? 0.3 + Math.sin((frame - 30) * 0.15) * 0.2 : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{textAlign: 'center', padding: '0 30px'}}>
        {/* Line 1 */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: 'system-ui, sans-serif',
            lineHeight: 1.2,
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
          }}
        >
          Your staff
        </div>

        {/* Line 2 */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: 'system-ui, sans-serif',
            lineHeight: 1.2,
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
          }}
        >
          could sell
        </div>

        {/* Line 3 - THE NUMBER */}
        <div
          style={{
            fontSize: 120,
            fontWeight: 800,
            color: '#8b6914',
            fontFamily: 'system-ui, sans-serif',
            marginTop: 20,
            opacity: line3Opacity,
            transform: `scale(${Math.max(0, line3Scale)})`,
            textShadow: `0 0 ${40 * glowIntensity}px rgba(139, 105, 20, ${glowIntensity})`,
          }}
        >
          15% more.
        </div>
      </div>
    </AbsoluteFill>
  );
};
