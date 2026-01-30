import {Composition} from 'remotion';
import {ForjeVSL} from './ForjeVSL';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ForjeVSL"
        component={ForjeVSL}
        durationInFrames={10 * 30} // 10 seconds at 30fps
        fps={30}
        width={1080}  // 9:16 vertical for mobile/social
        height={1920}
        defaultProps={{}}
      />
    </>
  );
};
