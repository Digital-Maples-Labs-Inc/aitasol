/**
 * Hero Component
 * Hero section for landing pages
 * Inspired by the sample hero section design
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { createHeroStyles } from '@/styles/components/Hero.styles';
import { withHover, withFadeIn } from '@/utils/animations';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

interface HeroProps {
  badge?: string;
  heading?: string;
  subtitle?: string;
  primaryCTA?: {
    text: string;
    onPress: () => void;
  };
  secondaryCTA?: {
    text: string;
    onPress: () => void;
  };
  avatarUrl?: string;
  videoCardImage?: string;
  speechBubbleText?: string;
  socialProof?: {
    avatars?: string[];
    rating?: string;
    ratingValue?: string;
    testimonialText?: string;
  };
  partners?: {
    label?: string;
    logos?: string[];
  };
  showNavigation?: boolean;
}

// Video Card Component (to be wrapped with animations)
interface VideoCardProps {
  imageUrl: string;
  speechBubbleText?: string;
  styles: any;
  onPress?: () => void;
}

// Play Button with Pulse Animation
const PlayButton: React.FC<{ styles: any }> = ({ styles }) => {
  const scale = useSharedValue(1);

  React.useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View style={[styles.playButton, animatedStyle]}>
      <Text style={styles.playIcon}>▶</Text>
    </Animated.View>
  );
};

const VideoCardBase: React.FC<VideoCardProps> = ({
  imageUrl,
  speechBubbleText,
  styles,
  onPress,
}) => {
  return (
    <View style={styles.videoCard}>
      {speechBubbleText && (
        <View style={styles.speechBubble}>
          <Text style={styles.speechBubbleText}>
            {speechBubbleText}
          </Text>
        </View>
      )}
      <Image
        source={{ uri: imageUrl }}
        style={styles.videoCardImage}
        resizeMode="cover"
      />
      <TouchableOpacity
        style={styles.videoOverlay}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <PlayButton styles={styles} />
      </TouchableOpacity>
    </View>
  );
};

// Apply animations to VideoCard - withHover for scale, withFadeIn for entrance
const AnimatedVideoCard = withFadeIn(withHover(VideoCardBase));

export const Hero: React.FC<HeroProps> = ({
  badge = '✴ Online Education Consultancy',
  heading = 'Clear Guidance for Global Education Decisions',
  subtitle = 'Personalized educational consultancy designed for your goals.',
  primaryCTA,
  secondaryCTA,
  avatarUrl,
  videoCardImage,
  speechBubbleText,
  socialProof,
  partners,
  showNavigation = false,
}) => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const heroStyles = createHeroStyles(colors);

  const navigateTo = (path: string) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  // Inject web-specific styles for grid background pattern
  React.useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const styleId = 'hero-grid-pattern-style';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          .hero-grid-pattern {
            background-image:
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
            background-size: 56px 56px;
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, []);

  return (
    <View
      style={heroStyles.hero}
      {...(Platform.OS === 'web' ? { className: 'hero-grid-pattern' } : {})}
    >
      {/* Hero Content */}
      <View style={heroStyles.heroContent}>
        {badge && (
          <View style={heroStyles.badge}>
            <Text style={heroStyles.badgeText}>{badge}</Text>
          </View>
        )}

        <View style={heroStyles.headingContainer}>
          <View style={heroStyles.headingRow}>
            <Text style={heroStyles.heading}>{heading}</Text>
            {avatarUrl && (
              <View style={heroStyles.avatarContainer}>
                <Image
                  source={{ uri: avatarUrl }}
                  style={heroStyles.avatar}
                  resizeMode="cover"
                />
              </View>
            )}
          </View>
        </View>

        {subtitle && (
          <Text style={heroStyles.subtitle}>{subtitle}</Text>
        )}

        {(primaryCTA || secondaryCTA) && (
          <View style={heroStyles.actions}>
            {primaryCTA && (
              <TouchableOpacity
                style={heroStyles.ctaPrimary}
                onPress={primaryCTA.onPress}
                activeOpacity={0.8}
              >
                <Text style={heroStyles.ctaPrimaryText}>{primaryCTA.text}</Text>
              </TouchableOpacity>
            )}
            {secondaryCTA && (
              <TouchableOpacity
                style={heroStyles.ctaIcon}
                onPress={secondaryCTA.onPress}
                activeOpacity={0.8}
              >
                <Text style={heroStyles.ctaIconText}>↗</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {socialProof && (
          <View style={heroStyles.socialProof}>
            {socialProof.avatars && socialProof.avatars.length > 0 && (
              <View style={heroStyles.avatars}>
                {socialProof.avatars.map((avatar, index) => (
                  <Image
                    key={index}
                    source={{ uri: avatar }}
                    style={[
                      heroStyles.avatarSmall,
                      index > 0 && heroStyles.avatarOverlap,
                    ]}
                    resizeMode="cover"
                  />
                ))}
              </View>
            )}
            {(socialProof.rating || socialProof.testimonialText) && (
              <View style={heroStyles.rating}>
                {socialProof.rating && (
                  <Text style={heroStyles.ratingText}>
                    {socialProof.rating}
                    {socialProof.ratingValue && (
                      <Text style={heroStyles.ratingValue}>
                        {' '}{socialProof.ratingValue}
                      </Text>
                    )}
                  </Text>
                )}
                {socialProof.testimonialText && (
                  <Text style={heroStyles.testimonialText}>
                    {socialProof.testimonialText}
                  </Text>
                )}
              </View>
            )}
          </View>
        )}
      </View>

      {/* Video Card with Animations */}
      {videoCardImage && (
        <AnimatedVideoCard
          imageUrl={videoCardImage}
          speechBubbleText={speechBubbleText}
          styles={heroStyles}
          onPress={() => {
            // Handle video play action
            console.log('Video card pressed');
          }}
          scale={1.02}
          delay={300}
        />
      )}

      {/* Partners */}
      {partners && partners.logos && partners.logos.length > 0 && (
        <View style={heroStyles.partners}>
          {partners.label && (
            <Text style={heroStyles.partnersLabel}>{partners.label}</Text>
          )}
          <View style={heroStyles.logos}>
            {partners.logos.map((logo, index) => (
              <Text key={index} style={heroStyles.logoText}>
                {logo}
              </Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

