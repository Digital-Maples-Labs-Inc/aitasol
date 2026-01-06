/**
 * Statistics Component
 * Displays statistics and results in a grid layout
 * Inspired by the statistics component design
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { createStatisticsStyles } from '@/styles/components/Statistics.styles';
import { withHover, withFadeIn } from '@/utils/animations';

interface StatCardProps {
  icon: string;
  value: string;
  description: string;
  showDashedLine?: boolean;
  styles: any;
}

interface ImageCardProps {
  imageUrl: string;
  value: string;
  description: string;
  position?: 'bottom-left' | 'bottom-right' | 'bottom';
  avatars?: string[];
  styles: any;
}

interface StatisticsProps {
  badge?: string;
  heading?: string;
  description?: string;
  stats?: Array<{
    icon: string;
    value: string;
    description: string;
    showDashedLine?: boolean;
  }>;
  imageCards?: Array<{
    imageUrl: string;
    value: string;
    description: string;
    position?: 'bottom-left' | 'bottom-right' | 'bottom';
    avatars?: string[];
  }>;
  cta?: {
    text: string;
    onPress: () => void;
  };
}

// Stat Card Component
const StatCardBase: React.FC<StatCardProps> = ({
  icon,
  value,
  description,
  showDashedLine,
  styles,
}) => {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statDescription}>{description}</Text>
      {showDashedLine && <View style={styles.dashedLine} />}
    </View>
  );
};

// Image Card Component
const ImageCardBase: React.FC<ImageCardProps> = ({
  imageUrl,
  value,
  description,
  position = 'bottom-left',
  avatars,
  styles,
}) => {
  const overlayStyle =
    position === 'bottom-right'
      ? [styles.overlayText, styles.overlayBottomRight]
      : position === 'bottom'
      ? styles.overlayBottom
      : styles.overlayText;

  return (
    <View style={styles.imageCard}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.imageCardImage}
        resizeMode="cover"
      />
      <View style={overlayStyle}>
        <Text style={styles.overlayValue}>{value}</Text>
        <Text style={styles.overlayDescription}>{description}</Text>
        {avatars && avatars.length > 0 && (
          <View style={styles.avatars}>
            {avatars.map((avatar, index) => (
              <Image
                key={index}
                source={{ uri: avatar }}
                style={[
                  styles.avatar,
                  index > 0 && styles.avatarOverlap,
                ]}
                resizeMode="cover"
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

// Apply animations
const AnimatedStatCard = withFadeIn(withHover(StatCardBase));
const AnimatedImageCard = withFadeIn(withHover(ImageCardBase));

export const Statistics: React.FC<StatisticsProps> = ({
  badge = '✴ Results',
  heading = 'Helping Every Learner\nAchieve Their Goals',
  description = 'Real progress, real outcomes — because your growth matters.',
  stats = [],
  imageCards = [],
  cta,
}) => {
  const { colors } = useTheme();
  const statisticsStyles = createStatisticsStyles(colors);

  // Inject web-specific styles for grid background pattern
  React.useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const styleId = 'statistics-grid-pattern-style';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          .statistics-grid-pattern {
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

  const navigateTo = (path: string) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  return (
    <View
      style={statisticsStyles.container}
      {...(Platform.OS === 'web' ? { className: 'statistics-grid-pattern' } : {})}
    >
      {/* Header */}
      <View style={statisticsStyles.header}>
        <View style={statisticsStyles.badge}>
          <Text style={statisticsStyles.badgeText}>{badge}</Text>
        </View>
        <Text style={statisticsStyles.heading}>{heading}</Text>
        <Text style={statisticsStyles.description}>{description}</Text>
      </View>

      {/* Grid */}
      <View style={statisticsStyles.grid}>
        {/* Render image cards and stat cards in order */}
        {imageCards.map((card, index) => (
          <View key={`image-wrapper-${index}`} style={statisticsStyles.gridItem}>
            <AnimatedImageCard
              imageUrl={card.imageUrl}
              value={card.value}
              description={card.description}
              position={card.position}
              avatars={card.avatars}
              styles={statisticsStyles}
              scale={1.02}
              delay={index * 100}
            />
          </View>
        ))}
        {stats.map((stat, index) => (
          <View key={`stat-wrapper-${index}`} style={statisticsStyles.gridItem}>
            <AnimatedStatCard
              icon={stat.icon}
              value={stat.value}
              description={stat.description}
              showDashedLine={stat.showDashedLine}
              styles={statisticsStyles}
              scale={1.02}
              delay={(imageCards.length + index) * 100}
            />
          </View>
        ))}
      </View>

      {/* CTA */}
      {cta && (
        <View style={statisticsStyles.cta}>
          <TouchableOpacity
            style={statisticsStyles.ctaButton}
            onPress={cta.onPress}
            activeOpacity={0.8}
          >
            <Text style={statisticsStyles.ctaButtonText}>
              {cta.text} <Text style={statisticsStyles.ctaArrow}>↗</Text>
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

