import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';

export const BasketDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Phone container
  const phoneScale = spring({frame, fps, config: {damping: 15}});

  // Scenario card slides in
  const scenarioY = interpolate(frame, [5, 20], [40, 0], {extrapolateRight: 'clamp'});
  const scenarioOpacity = interpolate(frame, [5, 15], [0, 1], {extrapolateRight: 'clamp'});

  // Products stagger in
  const prod1Opacity = interpolate(frame, [22, 30], [0, 1], {extrapolateRight: 'clamp'});
  const prod2Opacity = interpolate(frame, [26, 34], [0, 1], {extrapolateRight: 'clamp'});
  const prod3Opacity = interpolate(frame, [30, 38], [0, 1], {extrapolateRight: 'clamp'});

  // Items get selected over time
  const item1Selected = frame >= 45;
  const item2Selected = frame >= 55;
  const item3Selected = frame >= 65;

  // Calculate basket total
  let basketTotal = 85000; // Main product
  if (item1Selected) basketTotal += 6000;
  if (item2Selected) basketTotal += 12000;

  // Feedback appears
  const feedbackOpacity = interpolate(frame, [75, 82], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center'}}>
      {/* Phone mockup */}
      <div
        style={{
          width: 340,
          height: 700,
          backgroundColor: '#faf9f7',
          borderRadius: 32,
          padding: 16,
          transform: `scale(${phoneScale})`,
          overflow: 'hidden',
          boxShadow: '0 25px 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header */}
        <div style={{marginBottom: 16}}>
          <div style={{fontSize: 9, color: '#999', marginBottom: 4}}>ROUND 2 OF 5</div>
          <div style={{fontSize: 18, fontWeight: 700, color: '#1a1a1a'}}>Build the Basket</div>
          <div style={{height: 3, background: '#e5e5e5', borderRadius: 2, marginTop: 8}}>
            <div style={{height: '100%', width: '40%', background: '#e4002b', borderRadius: 2}} />
          </div>
        </div>

        {/* Scenario card */}
        <div
          style={{
            background: '#fff',
            border: '1px solid #e5e5e5',
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            opacity: scenarioOpacity,
            transform: `translateY(${scenarioY}px)`,
          }}
        >
          <div style={{
            display: 'inline-block',
            fontSize: 9,
            fontWeight: 600,
            background: '#1a1a1a',
            color: '#fff',
            padding: '3px 8px',
            borderRadius: 4,
            marginBottom: 10,
            textTransform: 'uppercase',
          }}>
            ACTIVITY BUYER
          </div>
          <div style={{fontSize: 15, fontWeight: 500, color: '#1a1a1a', marginBottom: 12, lineHeight: 1.4}}>
            "I want to start running, what's good for beginners?"
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: 10,
            background: '#f5f5f5',
            borderRadius: 8,
          }}>
            <div style={{width: 40, height: 40, background: '#e5e5e5', borderRadius: 6}} />
            <div>
              <div style={{fontSize: 13, fontWeight: 600}}>Velocity Nitro 3</div>
              <div style={{fontSize: 12, color: '#666'}}>₦85,000</div>
            </div>
          </div>
        </div>

        {/* Add-on products */}
        <div style={{fontSize: 11, color: '#666', marginBottom: 10, fontWeight: 500}}>
          Add to their basket:
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          <ProductItem
            name="Performance Socks 3-pack"
            price="₦6,000"
            opacity={prod1Opacity}
            selected={item1Selected}
            correct
          />
          <ProductItem
            name="Running Belt"
            price="₦12,000"
            opacity={prod2Opacity}
            selected={item2Selected}
            correct
          />
          <ProductItem
            name="Suede Protector"
            price="₦3,500"
            opacity={prod3Opacity}
            selected={item3Selected}
            correct={false}
          />
        </div>

        {/* Basket total */}
        <div style={{
          marginTop: 16,
          padding: 12,
          background: '#1a1a1a',
          borderRadius: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{fontSize: 12, color: '#888'}}>BASKET TOTAL</div>
          <div style={{fontSize: 18, fontWeight: 700, color: '#86efac'}}>
            ₦{basketTotal.toLocaleString()}
          </div>
        </div>

        {/* Feedback */}
        {frame >= 75 && (
          <div
            style={{
              marginTop: 12,
              padding: 12,
              background: '#dcfce7',
              borderRadius: 10,
              border: '1px solid #86efac',
              opacity: feedbackOpacity,
            }}
          >
            <div style={{fontSize: 12, fontWeight: 600, color: '#166534'}}>
              +12% add-on rate! 🎯
            </div>
            <div style={{fontSize: 11, color: '#166534', marginTop: 4}}>
              Socks + Belt match their running activity
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

const ProductItem: React.FC<{
  name: string;
  price: string;
  opacity: number;
  selected: boolean;
  correct: boolean;
}> = ({name, price, opacity, selected, correct}) => {
  const checkboxBg = selected
    ? (correct ? '#22c55e' : '#ef4444')
    : '#fff';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: 12,
        background: '#fff',
        border: '1px solid #e5e5e5',
        borderRadius: 10,
        opacity,
      }}
    >
      {/* Checkbox */}
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          border: selected ? 'none' : '2px solid #ccc',
          background: checkboxBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          color: '#fff',
          transition: 'all 0.15s',
        }}
      >
        {selected && '✓'}
      </div>
      <div style={{flex: 1}}>
        <div style={{fontSize: 13, fontWeight: 500}}>{name}</div>
      </div>
      <div style={{fontSize: 13, fontWeight: 600, color: '#1a1a1a'}}>{price}</div>
    </div>
  );
};
