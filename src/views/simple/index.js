import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { ThumbUp, Visibility, Share, Repeat } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFeed } from '../../services/feedService';

export default function FeedGrid() {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedData = async () => {
      try {
        const data = await getFeed();
        setFeedItems(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFeedData();
  }, []);

  if (loading) {
    return (
      <Box p={2}>
        <Typography>Loading feed...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Typography color="error">Error loading feed: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {feedItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card 
              sx={{ 
                borderRadius: 3,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  transform: 'scale(1.01)'
                }
              }}
              onClick={() => navigate(`/simple/post/${item.id}`)}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar src={item.profile_image} alt={item.user_fullname} />
                  <Box>
                    <Typography fontWeight="bold">{item.user_fullname}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.user_username} • {new Date(item.created_at * 1000).toLocaleDateString()} • {item.lga_name}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" color="primary" sx={{ mt: 1 }}>
                  {item.category}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {item.description}
                </Typography>
                {item.feed_urls && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.feed_urls}
                    alt="Incident media"
                    sx={{ mt: 2 }}
                  />
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <IconButton>
                      <ThumbUp />
                      <Typography variant="caption">{item.upvote_count}</Typography>
                    </IconButton>
                    <IconButton>
                      <Visibility />
                      <Typography variant="caption">{item.view}</Typography>
                    </IconButton>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <IconButton>
                      <Share />
                    </IconButton>
                    <IconButton>
                      <Repeat />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}