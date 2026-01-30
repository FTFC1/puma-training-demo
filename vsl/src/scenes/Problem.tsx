import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // "But right now..." slides in
  const setupY = interpolate(frame, [0, 10], [40, 0], {extrapolateRight: 'clamp'});
  const setupOpacity = interpolate(frame, [0, 10], [0, 1], {extrapolateRight: 'clamp'});

  // Quote types in word by word effect
  const quote1Opacity = interpolate(frame, [15, 22], [0, 1], {extrapolateRight: 'clamp'});
  const quote1Y = interpolate(frame, [15, 22], [30, 0], {extrapolateRight: 'clamp'});

  const quote2Opacity = interpolate(frame, [22, 30], [0, 1], {extrapolateRight: 'clamp'});
  const quote2Y = interpolate(frame, [22, 30], [30, 0], {extrapolateRight: 'clamp'});

  // Emoji pops in with spring
  const emojiSpring = spring({
    frame: frame - 35,
    fps,
    config: {damping: 8, stiffness: 120},
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
      }}
    >
      <div style={{textAlign: 'center'}}>
        {/* Setup line */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 500,
            color: '#666',
            fontFamily: 'system-ui, sans-serif',
            marginBottom: 30,
            opacity: setupOpacity,
            transform: `translateY(${setupY}px)`,
          }}
        >
          But right now they say...
        </div>

        {/* Quote line 1 */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: 'system-ui, sans-serif',
            lineHeight: 1.2,
            opacity: quote1Opacity,
            transform: `translateY(${quote1Y}px)`,
          }}
        >
          "Would you like
        </div>

        {/* Quote line 2 */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: 'system-ui, sans-serif',
            lineHeight: 1.2,
            opacity: quote2Opacity,
            transform: `translateY(${quote2Y}px)`,
          }}
        >
          socks with that?"
        </div>

        {/* Emoji reaction - pops */}
        <div
          style={{
            fontSize: 72,
            marginTop: 40,
            transform: `scale(${Math.max(0, emojiSpring)})`,
          }}
        >
          😐
        </div>
      </div>
    </AbsoluteFill>
  );
};
