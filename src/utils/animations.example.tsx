/**
 * Animation Utilities - Usage Examples
 * This file demonstrates how to use the animation HOCs
 */

import React from 'react';
import { View, Text } from 'react-native';
import {
  withRotate,
  withHover,
  withRandomColor,
  withFadeIn,
  withSlideIn,
  withPulse,
  createStore,
  useStore,
} from './animations';

// Example 1: Basic component with rotation
const BasicComponent = ({ title }: { title: string }) => (
  <View style={{ padding: 20, backgroundColor: '#f0f0f0', borderRadius: 8 }}>
    <Text>{title}</Text>
  </View>
);

const RotatedComponent = withRotate(BasicComponent);

// Example 2: Component with hover effect
const HoverableComponent = withHover(BasicComponent);

// Example 3: Component with random color
const ColorfulComponent = withRandomColor(BasicComponent);

// Example 4: Component with fade-in
const FadeInComponent = withFadeIn(BasicComponent);

// Example 5: Component with slide-in
const SlideInComponent = withSlideIn(BasicComponent);

// Example 6: Component with pulse
const PulsingComponent = withPulse(BasicComponent);

// Example 7: Using the store pattern
const themeStore = createStore({
  background: '#0099FF',
  textColor: '#FFFFFF',
});

export const ExampleUsage = () => {
  const [theme, setTheme] = useStore(themeStore);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Animation Examples</Text>
      
      <RotatedComponent title="Rotated Component" />
      
      <HoverableComponent title="Hoverable Component" scale={1.1} />
      
      <ColorfulComponent title="Random Color Component" store={themeStore} />
      
      <FadeInComponent title="Fade In Component" delay={100} />
      
      <SlideInComponent title="Slide In Component" direction="left" />
      
      <PulsingComponent title="Pulsing Component" />
      
      <View style={{ marginTop: 20, padding: 10, backgroundColor: theme.background }}>
        <Text style={{ color: theme.textColor }}>
          Store Example - Background: {theme.background}
        </Text>
      </View>
    </View>
  );
};

// Example 8: Combining multiple HOCs
const FancyComponent = withFadeIn(
  withHover(
    withPulse(BasicComponent)
  )
);

export const CombinedExample = () => (
  <FancyComponent title="Combined Animations" />
);

