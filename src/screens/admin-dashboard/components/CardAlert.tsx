import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

export default function CardAlert() {
  const handleGetDiscount = () => {
    if (typeof window !== 'undefined') {
      window.open('https://www.digitalmaples.ca', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card variant="outlined" sx={{ m: 1.5, flexShrink: 0 }}>
      <CardContent>
        <AutoAwesomeRoundedIcon fontSize="small" />
        <Typography gutterBottom sx={{ fontWeight: 600 }}>
          Plan Ahead & get AI Support
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Enjoy 10% off AI Voice Agents.
        </Typography>
        <Button 
          variant="contained" 
          size="small" 
          fullWidth
          onClick={handleGetDiscount}
        >
          Get the discount
        </Button>
      </CardContent>
    </Card>
  );
}

