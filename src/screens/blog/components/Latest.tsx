import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { subscribeToPublishedBlogs } from '@/services/blogService';
import { Blog } from '@/types';
import { format } from 'date-fns';

// Transform Blog to article format
interface ArticleInfo {
  id: string;
  tag: string;
  title: string;
  description: string;
  authors: { name: string; avatar: string }[];
  publishedAt?: Date;
  slug: string;
}

const transformBlogToArticle = (blog: Blog): ArticleInfo => {
  const tag = blog.tags && blog.tags.length > 0 ? blog.tags[0] : 'Company';
  const description = blog.excerpt || (blog.content ? blog.content.substring(0, 150) + '...' : '');
  const authors = blog.authorName 
    ? [{ name: blog.authorName, avatar: '/static/images/avatar/1.jpg' }]
    : [{ name: 'AitaSol Team', avatar: '/static/images/avatar/1.jpg' }];

  return {
    id: blog.id,
    tag,
    title: blog.title,
    description,
    authors,
    publishedAt: blog.publishedAt,
    slug: blog.slug,
  };
};

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const TitleTypography = styled(Typography)(({ theme }) => ({
  position: 'relative',
  textDecoration: 'none',
  '&:hover': { cursor: 'pointer' },
  '& .arrow': {
    visibility: 'hidden',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '&:hover .arrow': {
    visibility: 'visible',
    opacity: 0.7,
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '3px',
    borderRadius: '8px',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: '1px',
    bottom: 0,
    left: 0,
    backgroundColor: (theme.vars || theme).palette.text.primary,
    opacity: 0.3,
    transition: 'width 0.3s ease, opacity 0.3s ease',
  },
  '&:hover::before': {
    width: '100%',
  },
}));

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

export default function Latest() {
  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(null);
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 10;

  // Subscribe to published blogs with real-time updates
  React.useEffect(() => {
    const unsubscribe = subscribeToPublishedBlogs((fetchedBlogs) => {
      setBlogs(fetchedBlogs);
      setLoading(false);
    }, 100); // Get more for pagination

    return () => unsubscribe();
  }, []);

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleTitleClick = (slug: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = `/blog/${slug}`;
    }
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Transform blogs to articles
  const articleInfo: ArticleInfo[] = blogs.map(transformBlogToArticle);

  // Paginate articles
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedArticles = articleInfo.slice(startIndex, endIndex);
  const totalPages = Math.ceil(articleInfo.length / itemsPerPage);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (articleInfo.length === 0) {
    return (
      <div>
        <Typography variant="h2" gutterBottom>
          Latest
        </Typography>
        <Typography>No blog posts available yet. Check back soon!</Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Latest
      </Typography>
      <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
        {paginatedArticles.map((article, index) => (
          <Grid key={article.id} size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 1,
                height: '100%',
              }}
            >
              <Typography gutterBottom variant="caption" component="div">
                {article.tag}
              </Typography>
              <TitleTypography
                gutterBottom
                variant="h6"
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                onClick={() => handleTitleClick(article.slug)}
                tabIndex={0}
                className={focusedCardIndex === index ? 'Mui-focused' : ''}
              >
                {article.title}
                <NavigateNextRoundedIcon
                  className="arrow"
                  sx={{ fontSize: '1rem' }}
                />
              </TitleTypography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {article.description}
              </StyledTypography>

              <Author authors={article.authors} publishedAt={article.publishedAt} />
            </Box>
          </Grid>
        ))}
      </Grid>
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4, justifyContent: 'center' }}>
          <Pagination 
            count={totalPages} 
            page={page}
            onChange={handlePageChange}
            hidePrevButton 
            hideNextButton 
            boundaryCount={totalPages <= 10 ? totalPages : 10}
          />
        </Box>
      )}
    </div>
  );
}
