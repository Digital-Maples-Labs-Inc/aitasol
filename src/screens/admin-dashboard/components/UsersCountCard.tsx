import * as React from 'react';
import { getAllUsers } from '@/services/userService';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { areaElementClasses } from '@mui/x-charts/LineChart';

function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

function AreaGradient({ color, id }: { color: string; id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.3} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

export default function UsersCountCard() {
  const theme = useTheme();
  const [adminCount, setAdminCount] = React.useState<number>(0);
  const [nonAdminCount, setNonAdminCount] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const daysInWeek = getDaysInMonth(4, 2024);

  React.useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await getAllUsers();
        console.log('Users loaded:', users);
        const admins = users.filter(u => u.role === 'admin').length;
        const nonAdmins = users.filter(u => u.role !== 'admin').length;
        console.log(`Admins: ${admins}, Non-admins: ${nonAdmins}`);
        setAdminCount(admins);
        setNonAdminCount(nonAdmins);
      } catch (error) {
        console.error('Error loading users count:', error);
        // Set to 0 on error so UI shows something
        setAdminCount(0);
        setNonAdminCount(0);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Generate mock trend data (30 days)
  const generateTrendData = (): number[] => {
    const base = adminCount + nonAdminCount || 5;
    return Array.from({ length: 30 }, () => 
      Math.floor(base + (Math.random() * 2 - 1))
    );
  };

  if (loading) {
    return (
      <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
        <CardContent>
          <Typography component="h2" variant="subtitle2" gutterBottom>
            Users
          </Typography>
          <Typography variant="h4" component="p">
            ...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const totalCount = adminCount + nonAdminCount;
  const trend = adminCount > 0 ? 'up' : 'neutral';
  const chartColor = trend === 'up' 
    ? (theme.palette.mode === 'light' ? theme.palette.success.main : theme.palette.success.dark)
    : (theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[700]);

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/users';
    }
  };

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        height: '100%', 
        flexGrow: 1,
        cursor: 'pointer',
        '&:hover': {
          boxShadow: (theme) => theme.shadows[4],
        },
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Users
        </Typography>
        <Stack
          direction="column"
          sx={{ justifyContent: 'space-between', flexGrow: '1', gap: 1 }}
        >
          <Stack sx={{ justifyContent: 'space-between' }}>
            <Stack
              direction="row"
              sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography variant="h4" component="p">
                {totalCount}
              </Typography>
              <Chip 
                size="small" 
                color={trend === 'up' ? 'success' : 'default'} 
                label={trend === 'up' ? '+5%' : '+5%'}
              />
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Chip 
                size="small" 
                variant="outlined"
                label={`${adminCount} admin`}
                color="success"
                onClick={(e) => {
                  e.stopPropagation();
                  if (typeof window !== 'undefined') {
                    window.location.href = '/admin/users?role=admin';
                  }
                }}
                sx={{ cursor: 'pointer' }}
              />
              <Chip 
                size="small" 
                variant="outlined"
                label={`${nonAdminCount} editor`}
                color="default"
                onClick={(e) => {
                  e.stopPropagation();
                  if (typeof window !== 'undefined') {
                    window.location.href = '/admin/users?role=editor';
                  }
                }}
                sx={{ cursor: 'pointer' }}
              />
            </Stack>
            <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
              Total users
            </Typography>
          </Stack>
          <Box sx={{ width: '100%', height: 50 }}>
            <SparkLineChart
              color={chartColor}
              data={generateTrendData()}
              area
              showHighlight
              showTooltip
              xAxis={{
                scaleType: 'band',
                data: daysInWeek,
              }}
              sx={{
                [`& .${areaElementClasses.root}`]: {
                  fill: `url(#area-gradient-users)`,
                },
              }}
            >
              <AreaGradient color={chartColor} id="area-gradient-users" />
            </SparkLineChart>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

