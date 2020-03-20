import Text from './components/Elements/Text';
import Image from './components/Elements/Image';

export { default as MotionScene } from './components/MotionScene';
export { default as MotionLayoutProvider } from './components/MotionProvider';
export { default as useMotion } from './hooks/useMotion';
export { default as MotionScreen } from './components/MotionScreen';
export { default as RouterLink } from './components/RouterLink';

export const SharedElement = { Image, Text };

export function withAnimation(component) {
  console.log('executing and creating context');
  return component;
}
