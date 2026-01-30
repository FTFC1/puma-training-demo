import {AbsoluteFill, Sequence} from 'remotion';
import {Hook} from './scenes/Hook';
import {Problem} from './scenes/Problem';
import {Solution} from './scenes/Solution';
import {CustomerSaysDemo} from './scenes/CustomerSaysDemo';
import {BasketDemo} from './scenes/BasketDemo';
import {Credibility} from './scenes/Credibility';
import {CTA} from './scenes/CTA';

// Timing optimized for animated demos (in frames at 30fps)
const SCENE_TIMING = {
  hook: {start: 0, duration: 60},              // 0-2s
  problem: {start: 60, duration: 75},          // 2-4.5s
  solution: {start: 135, duration: 60},        // 4.5-6.5s
  customerSays: {start: 195, duration: 100},   // 6.5-9.8s - Animated Customer Says
  basket: {start: 295, duration: 110},         // 9.8-13.5s - Animated Build Basket
  credibility: {start: 405, duration: 75},     // 13.5-16s
  cta: {start: 480, duration: 120},            // 16-20s
};

export const ForjeVSL: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#1a1a1a'}}>
      {/* Scene 1: Hook */}
      <Sequence from={SCENE_TIMING.hook.start} durationInFrames={SCENE_TIMING.hook.duration}>
        <Hook />
      </Sequence>

      {/* Scene 2: Problem */}
      <Sequence from={SCENE_TIMING.problem.start} durationInFrames={SCENE_TIMING.problem.duration}>
        <Problem />
      </Sequence>

      {/* Scene 3: Solution Intro */}
      <Sequence from={SCENE_TIMING.solution.start} durationInFrames={SCENE_TIMING.solution.duration}>
        <Solution />
      </Sequence>

      {/* Scene 4: Customer Says - Animated */}
      <Sequence from={SCENE_TIMING.customerSays.start} durationInFrames={SCENE_TIMING.customerSays.duration}>
        <CustomerSaysDemo />
      </Sequence>

      {/* Scene 5: Build the Basket - Animated */}
      <Sequence from={SCENE_TIMING.basket.start} durationInFrames={SCENE_TIMING.basket.duration}>
        <BasketDemo />
      </Sequence>

      {/* Scene 6: Credibility */}
      <Sequence from={SCENE_TIMING.credibility.start} durationInFrames={SCENE_TIMING.credibility.duration}>
        <Credibility />
      </Sequence>

      {/* Scene 7: CTA */}
      <Sequence from={SCENE_TIMING.cta.start} durationInFrames={SCENE_TIMING.cta.duration}>
        <CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
