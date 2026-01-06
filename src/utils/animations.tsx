/**
 * Animation Utilities
 * HOC patterns and animation helpers inspired by Framer Motion
 * Adapted for React Native using react-native-reanimated
 */

import React, { forwardRef, ComponentType, Ref } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

/**
 * Store pattern for managing shared state
 * Simple implementation similar to Framer's store
 */
export const createStore = <T extends Record<string, any>>(initialState: T) => {
  let state = { ...initialState };
  const listeners = new Set<(state: T) => void>();

  return {
    getState: () => state,
    setState: (updates: Partial<T>) => {
      state = { ...state, ...updates };
      listeners.forEach((listener) => listener(state));
    },
    subscribe: (listener: (state: T) => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
};

/**
 * Hook to use the store
 */
export const useStore = <T extends Record<string, any>>(store: ReturnType<typeof createStore<T>>) => {
  const [state, setState] = React.useState(store.getState());

  React.useEffect(() => {
    const unsubscribe = store.subscribe((newState) => {
      setState(newState);
    });
    return unsubscribe;
  }, []);

  return [
    state,
    (updates: Partial<T>) => store.setState(updates),
  ] as const;
};

/**
 * Generate a random color
 */
export const randomColor = (): string => {
  const colors = [
    '#0099FF',
    '#FF6A4D',
    '#FF7A59',
    '#4CAF50',
    '#9C27B0',
    '#FF9800',
    '#E91E63',
    '#00BCD4',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * HOC: Adds rotation animation on mount
 */
export function withRotate<P extends object>(
  Component: ComponentType<P>
) {
  const WrappedComponent = forwardRef((props: any, ref: any) => {
    const { animate = true, duration = 2000, ...restProps } = props;
    const rotation = useSharedValue(0);

    React.useEffect(() => {
      if (animate) {
        rotation.value = withTiming(90, { duration });
      }
    }, [animate, duration]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ rotate: `${rotation.value}deg` }],
      };
    });

    return (
      <Animated.View style={animatedStyle} ref={ref}>
        <Component {...(restProps as P)} />
      </Animated.View>
    );
  }) as ComponentType<P & { animate?: boolean; duration?: number }>;
  
  WrappedComponent.displayName = `withRotate(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
}

/**
 * HOC: Adds scale animation on hover/press
 */
export function withHover<P extends object>(
  Component: ComponentType<P>
) {
  const WrappedComponent = forwardRef((props: any, ref: any) => {
    const { scale: scaleValue = 1.05, ...restProps } = props;
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });

    const handlePressIn = () => {
      scale.value = withSpring(scaleValue, {
        damping: 15,
        stiffness: 300,
      });
    };

    const handlePressOut = () => {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 300,
      });
    };

    // For web, we can use onMouseEnter/onMouseLeave
    const webProps = typeof window !== 'undefined' ? {
      onMouseEnter: handlePressIn,
      onMouseLeave: handlePressOut,
    } : {};

    return (
      <Animated.View
        style={animatedStyle}
        ref={ref}
        {...webProps}
      >
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        >
          <Component {...(restProps as P)} />
        </TouchableOpacity>
      </Animated.View>
    );
  }) as ComponentType<P & { scale?: number }>;
  
  WrappedComponent.displayName = `withHover(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
}

/**
 * HOC: Adds random color animation on click
 */
export function withRandomColor<P extends object>(
  Component: ComponentType<P>
) {
  const WrappedComponent = forwardRef((props: any, ref: any) => {
      const { store, ...restProps } = props;
      const defaultStore = React.useMemo(
        () => createStore({ background: '#0099FF' }),
        []
      );
      const usedStore = store || defaultStore;
      const [state, setState] = useStore(usedStore);
      const backgroundColor = useSharedValue(state.background);

      React.useEffect(() => {
        backgroundColor.value = withTiming(state.background, { duration: 300 });
      }, [state.background]);

      const animatedStyle = useAnimatedStyle(() => {
        return {
          backgroundColor: backgroundColor.value,
        };
      });

      const handlePress = () => {
        setState({ background: randomColor() });
      };

      return (
        <Animated.View style={animatedStyle} ref={ref}>
          <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
            <Component {...(restProps as P)} />
          </TouchableOpacity>
        </Animated.View>
      );
    }
  ) as ComponentType<P & { store?: ReturnType<typeof createStore<{ background: string }>> }>;
  
  WrappedComponent.displayName = `withRandomColor(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
}

/**
 * HOC: Adds fade-in animation
 */
export function withFadeIn<P extends object>(
  Component: ComponentType<P>
) {
  const WrappedComponent = forwardRef<any, P & { delay?: number; duration?: number }>(
    (props: any, ref: any) => {
      const { delay = 0, duration = 500, ...restProps } = props;
      const opacity = useSharedValue(0);

      React.useEffect(() => {
        if (delay > 0) {
          const timer = setTimeout(() => {
            opacity.value = withTiming(1, { duration }, () => {
              // Animation complete
            });
          }, delay);
          return () => clearTimeout(timer);
        } else {
          opacity.value = withTiming(1, { duration }, () => {
            // Animation complete
          });
        }
      }, [delay, duration]);

      const animatedStyle = useAnimatedStyle(() => {
        return {
          opacity: opacity.value,
        };
      });

      return (
        <Animated.View style={animatedStyle} ref={ref}>
          <Component {...(restProps as P)} />
        </Animated.View>
      );
    }
  ) as ComponentType<P & { delay?: number; duration?: number }>;
  
  WrappedComponent.displayName = `withFadeIn(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
}

/**
 * HOC: Adds slide-in animation
 */
export function withSlideIn<P extends object>(
  Component: ComponentType<P>
) {
  const WrappedComponent = forwardRef<any, P & { direction?: 'left' | 'right' | 'up' | 'down'; duration?: number }>(
    (props: any, ref: any) => {
      const { direction = 'left', duration = 500, ...restProps } = props;
      const translateX = useSharedValue(direction === 'left' ? -100 : direction === 'right' ? 100 : 0);
      const translateY = useSharedValue(direction === 'up' ? -100 : direction === 'down' ? 100 : 0);

      React.useEffect(() => {
        translateX.value = withSpring(0, { damping: 15, stiffness: 100 });
        translateY.value = withSpring(0, { damping: 15, stiffness: 100 });
      }, []);

      const animatedStyle = useAnimatedStyle(() => {
        return {
          transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
          ],
        };
      });

      return (
        <Animated.View style={animatedStyle} ref={ref}>
          <Component {...(restProps as P)} />
        </Animated.View>
      );
    }
  ) as ComponentType<P & { direction?: 'left' | 'right' | 'up' | 'down'; duration?: number }>;
  
  WrappedComponent.displayName = `withSlideIn(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
}

/**
 * HOC: Adds pulse animation
 */
export function withPulse<P extends object>(
  Component: ComponentType<P>
) {
  const WrappedComponent = forwardRef<any, P & { duration?: number }>(
    (props: any, ref: any) => {
      const { duration = 1000, ...restProps } = props;
      const scale = useSharedValue(1);

      React.useEffect(() => {
        scale.value = withRepeat(
          withSequence(
            withTiming(1.1, { duration: duration / 2 }),
            withTiming(1, { duration: duration / 2 })
          ),
          -1,
          true
        );
      }, [duration]);

      const animatedStyle = useAnimatedStyle(() => {
        return {
          transform: [{ scale: scale.value }],
        };
      });

      return (
        <Animated.View style={animatedStyle} ref={ref}>
          <Component {...(restProps as P)} />
        </Animated.View>
      );
    }
  ) as ComponentType<P & { duration?: number }>;
  
  WrappedComponent.displayName = `withPulse(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
}

