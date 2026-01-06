import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAuth } from '@/contexts/AuthContext';
import { Alert } from '@mui/material';
import { Platform } from 'react-native';

export default function SignInCard() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { signIn } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      // Use window.location for web navigation
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.location.href = '/admin/dashboard';
      }
    } catch (err: any) {
      // Extract error message - Firebase errors have a message property
      const errorMessage = err?.message || err?.code || 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
      console.error('Sign in error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: { xs: 2, sm: 4 },
          flex: '0 1 400px',
        },
        (theme) => ({
          backgroundImage: 'none',
          backgroundColor: theme.palette.mode === 'dark' ? 'primaryDark' : '#fff',
          ...theme.applyStyles('dark', {
            backgroundColor: 'var(--mui-palette-primaryDark)',
          }),
        }),
      ]}
    >
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{ mt: 1 }}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </Box>
    </Card>
  );
}

