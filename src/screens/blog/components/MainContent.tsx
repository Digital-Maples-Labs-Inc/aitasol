import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import { subscribeToPublishedBlogs } from '@/services/blogService';
import { Blog } from '@/types';
import { format } from 'date-fns';

// Transform Blog to card format
interface BlogCard {
  id: string;
  img: string;
  tag: string;
  title: string;
  description: string;
  authors: { name: string; avatar: string }[];
  publishedAt?: Date;
  slug: string;
}

const transformBlogToCard = (blog: Blog): BlogCard => {
  // Get first tag or default to 'Company'
  const tag = blog.tags && blog.tags.length > 0 ? blog.tags[0] : 'Company';
  
  // Use featured image or placeholder
  const img = blog.featuredImage || 'https://picsum.photos/800/450?random=' + blog.id;
  
  // Use excerpt or first 150 chars of content
  const description = blog.excerpt || (blog.content ? blog.content.substring(0, 150) + '...' : '');
  
  // Create author array
  const authors = blog.authorName 
    ? [{ name: blog.authorName, avatar: '/static/images/avatar/1.jpg' }]
    : [{ name: 'AitaSol Team', avatar: '/static/images/avatar/1.jpg' }];

  return {
    id: blog.id,
    img,
    tag,
    title: blog.title,
    description,
    authors,
    publishedAt: blog.publishedAt,
    slug: blog.slug,
  };
};

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

function Author({ 
  authors, 
  publishedAt 
}: { 
  authors: { name: string; avatar: string }[];
  publishedAt?: Date;
}) {
  const dateStr = publishedAt 
    ? format(publishedAt, 'MMMM dd, yyyy')
    : 'Recently';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(', ')}
        </Typography>
      </Box>
      <Typography variant="caption">{dateStr}</Typography>
    </Box>
  );
}

export function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}

export default function MainContent() {
  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All categories');

  // Subscribe to published blogs with real-time updates
  React.useEffect(() => {
    const unsubscribe = subscribeToPublishedBlogs((fetchedBlogs) => {
      setBlogs(fetchedBlogs);
      setLoading(false);
    }, 6); // Get first 6 for main content layout

    return () => unsubscribe();
  }, []);

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCardClick = (slug: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = `/blog/${slug}`;
    }
  };

  // Transform blogs to cards
  const cardData: BlogCard[] = blogs.map(transformBlogToCard);

  // Filter by category if selected
  const filteredCards = selectedCategory === 'All categories'
    ? cardData
    : cardData.filter(card => card.tag === selectedCategory);

  // Get unique categories from blogs
  const categories = React.useMemo(() => {
    const cats = new Set<string>();
    cardData.forEach(card => {
      if (card.tag) cats.add(card.tag);
    });
    return Array.from(cats).sort();
  }, [cardData]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (cardData.length === 0) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div>
          <Typography variant="h1" gutterBottom>
            Blog
          </Typography>
          <Typography>Stay in the loop with the latest about our products</Typography>
        </div>
        <Typography>No blog posts available yet. Check back soon!</Typography>
      </Box>
    );
  }

  // Layout: First 2 cards full width (md:6), then 4 cards in columns (md:4)
  const firstTwoCards = filteredCards.slice(0, 2);
  const remainingCards = filteredCards.slice(2, 6); // Get 4 cards for the second row

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          Blog
        </Typography>
        <Typography>Stay in the loop with the latest about our products</Typography>
      </div>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
        }}
      >
        <Search />
        <IconButton size="small" aria-label="RSS feed">
          <RssFeedRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 4,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            gap: 3,
            overflow: 'auto',
          }}
        >
          <Chip 
            onClick={() => handleCategoryClick('All categories')} 
            size="medium" 
            label="All categories"
            sx={{
              backgroundColor: selectedCategory === 'All categories' ? undefined : 'transparent',
              border: selectedCategory === 'All categories' ? undefined : 'none',
            }}
          />
          {categories.map((category) => (
            <Chip
              key={category}
              onClick={() => handleCategoryClick(category)}
              size="medium"
              label={category}
              sx={{
                backgroundColor: selectedCategory === category ? undefined : 'transparent',
                border: selectedCategory === category ? undefined : 'none',
              }}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'auto',
          }}
        >
          <Search />
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={2} columns={12}>
        {/* First two cards - full width on mobile, half width on desktop */}
        {firstTwoCards.map((card, index) => (
          <Grid key={card.id} size={{ xs: 12, md: 6 }}>
            <StyledCard
              variant="outlined"
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              onClick={() => handleCardClick(card.slug)}
              tabIndex={0}
              className={focusedCardIndex === index ? 'Mui-focused' : ''}
            >
              <CardMedia
                component="img"
                alt={card.title}
                image={card.img}
                sx={{
                  aspectRatio: '16 / 9',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              />
              <StyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {card.tag}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {card.title}
                </Typography>
                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                  {card.description}
                </StyledTypography>
              </StyledCardContent>
              <Author authors={card.authors} publishedAt={card.publishedAt} />
            </StyledCard>
          </Grid>
        ))}
        
        {/* Remaining cards - responsive layout */}
        {remainingCards.length > 0 && (
          <>
            {remainingCards[0] && (
              <Grid size={{ xs: 12, md: 4 }}>
                <StyledCard
                  variant="outlined"
                  onFocus={() => handleFocus(2)}
                  onBlur={handleBlur}
                  onClick={() => handleCardClick(remainingCards[0].slug)}
                  tabIndex={0}
                  className={focusedCardIndex === 2 ? 'Mui-focused' : ''}
                  sx={{ height: '100%' }}
                >
                  <CardMedia
                    component="img"
                    alt={remainingCards[0].title}
                    image={remainingCards[0].img}
                    sx={{
                      height: { sm: 'auto', md: '50%' },
                      aspectRatio: { sm: '16 / 9', md: '' },
                    }}
                  />
                  <StyledCardContent>
                    <Typography gutterBottom variant="caption" component="div">
                      {remainingCards[0].tag}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      {remainingCards[0].title}
                    </Typography>
                    <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                      {remainingCards[0].description}
                    </StyledTypography>
                  </StyledCardContent>
                  <Author authors={remainingCards[0].authors} publishedAt={remainingCards[0].publishedAt} />
                </StyledCard>
              </Grid>
            )}
            
            {remainingCards[1] && remainingCards[2] && (
              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}
                >
                  <StyledCard
                    variant="outlined"
                    onFocus={() => handleFocus(3)}
                    onBlur={handleBlur}
                    onClick={() => handleCardClick(remainingCards[1].slug)}
                    tabIndex={0}
                    className={focusedCardIndex === 3 ? 'Mui-focused' : ''}
                    sx={{ height: '100%' }}
                  >
                    <StyledCardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                      }}
                    >
                      <div>
                        <Typography gutterBottom variant="caption" component="div">
                          {remainingCards[1].tag}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                          {remainingCards[1].title}
                        </Typography>
                        <StyledTypography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          {remainingCards[1].description}
                        </StyledTypography>
                      </div>
                    </StyledCardContent>
                    <Author authors={remainingCards[1].authors} publishedAt={remainingCards[1].publishedAt} />
                  </StyledCard>
                  <StyledCard
                    variant="outlined"
                    onFocus={() => handleFocus(4)}
                    onBlur={handleBlur}
                    onClick={() => handleCardClick(remainingCards[2].slug)}
                    tabIndex={0}
                    className={focusedCardIndex === 4 ? 'Mui-focused' : ''}
                    sx={{ height: '100%' }}
                  >
                    <StyledCardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                      }}
                    >
                      <div>
                        <Typography gutterBottom variant="caption" component="div">
                          {remainingCards[2].tag}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                          {remainingCards[2].title}
                        </Typography>
                        <StyledTypography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          {remainingCards[2].description}
                        </StyledTypography>
                      </div>
                    </StyledCardContent>
                    <Author authors={remainingCards[2].authors} publishedAt={remainingCards[2].publishedAt} />
                  </StyledCard>
                </Box>
              </Grid>
            )}
            
            {remainingCards[3] && (
              <Grid size={{ xs: 12, md: 4 }}>
                <StyledCard
                  variant="outlined"
                  onFocus={() => handleFocus(5)}
                  onBlur={handleBlur}
                  onClick={() => handleCardClick(remainingCards[3].slug)}
                  tabIndex={0}
                  className={focusedCardIndex === 5 ? 'Mui-focused' : ''}
                  sx={{ height: '100%' }}
                >
                  <CardMedia
                    component="img"
                    alt={remainingCards[3].title}
                    image={remainingCards[3].img}
                    sx={{
                      height: { sm: 'auto', md: '50%' },
                      aspectRatio: { sm: '16 / 9', md: '' },
                    }}
                  />
                  <StyledCardContent>
                    <Typography gutterBottom variant="caption" component="div">
                      {remainingCards[3].tag}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      {remainingCards[3].title}
                    </Typography>
                    <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                      {remainingCards[3].description}
                    </StyledTypography>
                  </StyledCardContent>
                  <Author authors={remainingCards[3].authors} publishedAt={remainingCards[3].publishedAt} />
                </StyledCard>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
}
