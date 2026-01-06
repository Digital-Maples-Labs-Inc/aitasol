import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AnalyticsDataGrid from './DataGrid';

export default function CustomizedDataGrid() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography component="h3" variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Analytics Data
        </Typography>
        <AnalyticsDataGrid height={500} />
      </CardContent>
    </Card>
  );
}

