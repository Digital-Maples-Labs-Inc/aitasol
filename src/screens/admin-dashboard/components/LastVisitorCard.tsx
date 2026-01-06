import * as React from 'react';
import { getLastVisitorTime } from '@/services/analyticsService';
import StatCard, { StatCardProps } from './StatCard';
import { formatDistanceToNow } from 'date-fns';

export default function LastVisitorCard() {
  const [lastVisitorTime, setLastVisitorTime] = React.useState<Date | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadLastVisitor = async () => {
      try {
        const time = await getLastVisitorTime();
        setLastVisitorTime(time);
        if (!time) {
          setError('Analytics not configured');
        }
      } catch (err) {
        console.error('Error loading last visitor time:', err);
        setError('Unable to load data');
      } finally {
        setLoading(false);
      }
    };

    loadLastVisitor();
    
    // Refresh every 30 seconds
    const interval = setInterval(loadLastVisitor, 30000);
    return () => clearInterval(interval);
  }, []);

  // Generate mock trend data (30 days)
  const generateTrendData = (): number[] => {
    return Array.from({ length: 30 }, () => 
      Math.floor(Math.random() * 100 + 50)
    );
  };

  if (loading) {
    return (
      <StatCard
        title="Last Visitor"
        value="..."
        interval="Loading..."
        trend="neutral"
        data={[]}
      />
    );
  }

  if (error || !lastVisitorTime) {
    return (
      <StatCard
        title="Last Visitor"
        value="N/A"
        interval={error || "Analytics not configured"}
        trend="neutral"
        data={generateTrendData()}
      />
    );
  }

  let timeAgo: string;
  try {
    timeAgo = formatDistanceToNow(lastVisitorTime, { addSuffix: true });
  } catch (err) {
    timeAgo = 'Recently';
  }

  const cardData: StatCardProps = {
    title: 'Last Visitor',
    value: timeAgo,
    interval: 'Real-time',
    trend: 'neutral',
    data: generateTrendData(),
  };

  return <StatCard {...cardData} />;
}

