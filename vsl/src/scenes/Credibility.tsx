import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

export const Credibility: React.FC = () => {
  const frame = useCurrentFrame();

  // "Built from" fades first
  const builtOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Big stat punches in
  const statOpacity = interpolate(frame, [10, 18], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const statScale = interpolate(frame, [10, 18], [0.9, 1], {
    extrapolateRight: 'clamp',
  });

  // Source fades in last
  const sourceOpacity = interpolate(frame, [20, 28], [0, 1], {
    extrapolateRight: 'clamp',
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
        {/* Setup */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 500,
            color: '#666',
            fontFamily: 'system-ui, sans-serif',
            opacity: builtOpacity,
          }}
        >
          Built from
        </div>

        {/* Big stat */}
        <div
          style={{
            fontSize: 120,
            fontWeight: 800,
            color: '#8b6914',
            fontFamily: 'system-ui, sans-serif',
            marginTop: 20,
            opacity: statOpacity,
            transform: `scale(${statScale})`,
          }}
        >
          REAL
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: 'system-ui, sans-serif',
            opacity: statOpacity,
          }}
        >
          store floor data
        </div>

        {/* Source */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: '#888',
            fontFamily: 'system-ui, sans-serif',
            marginTop: 40,
            opacity: sourceOpacity,
          }}
        >
          Interviews with Nigerian retail experts
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: '#888',
            fontFamily: 'system-ui, sans-serif',
            marginTop: 8,
            opacity: sourceOpacity,
          }}
        >
          at global sports brands
        </div>
      </div>
    </AbsoluteFill>
  );
};
