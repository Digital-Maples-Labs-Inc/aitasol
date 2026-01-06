import * as React from 'react';
import { getAllPages } from '@/services/pageService';
import StatCard, { StatCardProps } from './StatCard';

export default function PagesCountCard() {
  const [pagesCount, setPagesCount] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadPages = async () => {
      try {
        const pages = await getAllPages();
        setPagesCount(pages.length);
      } catch (error) {
        console.error('Error loading pages count:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, []);

  // Generate mock trend data (30 days)
  const generateTrendData = (): number[] => {
    const base = pagesCount || 10;
    return Array.from({ length: 30 }, () => 
      Math.floor(base + (Math.random() * 2 - 1))
    );
  };

  if (loading) {
    return (
      <StatCard
        title="Pages"
        value="..."
        interval="Loading..."
        trend="neutral"
        data={[]}
      />
    );
  }

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/pages';
    }
  };

  const cardData: StatCardProps = {
    title: 'Pages',
    value: pagesCount.toString(),
    interval: 'Total pages',
    trend: 'neutral',
    data: generateTrendData(),
    onClick: handleClick,
  };

  return <StatCard {...cardData} />;
}

