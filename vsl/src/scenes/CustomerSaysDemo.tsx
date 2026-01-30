import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';

export const CustomerSaysDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Phone container
  const phoneScale = spring({frame, fps, config: {damping: 15}});

  // Quote card slides in
  const quoteY = interpolate(frame, [5, 20], [50, 0], {extrapolateRight: 'clamp'});
  const quoteOpacity = interpolate(frame, [5, 15], [0, 1], {extrapolateRight: 'clamp'});

  // Options stagger in
  const opt1Opacity = interpolate(frame, [20, 28], [0, 1], {extrapolateRight: 'clamp'});
  const opt2Opacity = interpolate(frame, [24, 32], [0, 1], {extrapolateRight: 'clamp'});
  const opt3Opacity = interpolate(frame, [28, 36], [0, 1], {extrapolateRight: 'clamp'});
  const opt4Opacity = interpolate(frame, [32, 40], [0, 1], {extrapolateRight: 'clamp'});

  // Option 2 gets "tapped" at frame 50
  const tapScale = frame >= 50 && frame < 55 ? 0.95 : 1;
  const isSelected = frame >= 55;

  // Feedback appears
  const feedbackOpacity = interpolate(frame, [58, 65], [0, 1], {extrapolateRight: 'clamp'});
  const feedbackScale = interpolate(frame, [58, 68], [0.9, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center'}}>
      {/* Phone mockup */}
      <div
        style={{
          width: 340,
          height: 700,
          backgroundColor: '#f5f5f5',
          borderRadius: 32,
          padding: 16,
          transform: `scale(${phoneScale})`,
          overflow: 'hidden',
          boxShadow: '0 25px 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header bar */}
        <div style={{
          background: '#000',
          margin: '-16px -16px 16px -16px',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-around',
        }}>
          <ScorePill label="SCORE" value="2" color="#86efac" />
          <ScorePill label="STREAK" value="2🔥" color="#fcd34d" />
          <ScorePill label="Q" value="3/8" color="#fff" />
        </div>

        {/* Quote card */}
        <div
          style={{
            background: '#fff',
            borderRadius: 12,
            padding: 20,
            marginBottom: 16,
            textAlign: 'center',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            opacity: quoteOpacity,
            transform: `translateY(${quoteY}px)`,
          }}
        >
          <div style={{fontSize: 10, color: '#888', textTransform: 'uppercase', marginBottom: 8}}>
            Customer says
          </div>
          <div style={{fontSize: 18, fontStyle: 'italic', color: '#1a1a1a', lineHeight: 1.4}}>
            <span style={{color: '#e30613'}}>"</span>
            I buy the Nitro, I know the new one came out
            <span style={{color: '#e30613'}}>"</span>
          </div>
        </div>

        {/* Question */}
        <div style={{textAlign: 'center', fontSize: 14, color: '#666', marginBottom: 12, opacity: quoteOpacity}}>
          What type of customer is this?
        </div>

        {/* Options */}
        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          <OptionButton label="Guided Buyer" opacity={opt1Opacity} />
          <OptionButton
            label="Expert Buyer"
            opacity={opt2Opacity}
            scale={tapScale}
            selected={isSelected}
            correct={isSelected}
          />
          <OptionButton label="Activity Buyer" opacity={opt3Opacity} />
          <OptionButton label="Gift Buyer" opacity={opt4Opacity} />
        </div>

        {/* Feedback */}
        {frame >= 58 && (
          <div
            style={{
              marginTop: 16,
              padding: 16,
              background: '#dcfce7',
              borderRadius: 12,
              border: '1px solid #86efac',
              opacity: feedbackOpacity,
              transform: `scale(${feedbackScale})`,
            }}
          >
            <div style={{fontSize: 14, fontWeight: 600, color: '#166534', marginBottom: 4}}>
              ✓ Correct!
            </div>
            <div style={{fontSize: 12, color: '#166534'}}>
              They know the product line. Match their expertise.
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

const ScorePill: React.FC<{label: string; value: string; color: string}> = ({label, value, color}) => (
  <div style={{textAlign: 'center'}}>
    <div style={{fontSize: 18, fontWeight: 700, color}}>{value}</div>
    <div style={{fontSize: 9, color: '#888', textTransform: 'uppercase'}}>{label}</div>
  </div>
);

const OptionButton: React.FC<{
  label: string;
  opacity: number;
  scale?: number;
  selected?: boolean;
  correct?: boolean;
}> = ({label, opacity, scale = 1, selected = false, correct = false}) => (
  <div
    style={{
      background: selected ? (correct ? '#dcfce7' : '#fff') : '#fff',
      border: selected ? '2px solid #22c55e' : '1px solid #e5e5e5',
      borderRadius: 10,
      padding: '14px 16px',
      fontSize: 15,
      fontWeight: 500,
      color: '#1a1a1a',
      opacity,
      transform: `scale(${scale})`,
      transition: 'transform 0.1s',
    }}
  >
    {selected && <span style={{marginRight: 8}}>✓</span>}
    {label}
  </div>
);
