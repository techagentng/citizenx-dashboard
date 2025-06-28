import { useState, useEffect } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  Box,
  Chip,
  Button,
} from '@mui/material';
import { ThumbUp, Visibility, Share, Repeat, ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById } from '../../services/feedService';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return (
      <Box p={2}>
        <Typography>Loading post...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Typography color="error">Error loading post: {error}</Typography>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Back to Feed
        </Button>
      </Box>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <Box p={2}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back to Feed
      </Button>

      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar src={post.profile_image} alt={post.user_fullname} />
            <Box>
              <Typography fontWeight="bold">{post.user_fullname}</Typography>
              <Typography variant="body2" color="text.secondary">
                {post.user_username} • {new Date(post.created_at * 1000).toLocaleDateString()} • {post.lga_name}
              </Typography>
            </Box>
          </Box>

          <Typography variant="h6" component="div" mb={2}>
            {post.category}
          </Typography>

          <Typography variant="body1" paragraph>
            {post.description}
          </Typography>

          {post.feed_urls && (
            <CardMedia
              component="img"
              height="400"
              image={post.feed_urls}
              alt="Incident media"
              sx={{ mt: 2 }}
            />
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Box display="flex" alignItems="center" gap={1}>
              <Chip
                label={`Upvotes: ${post.upvote_count}`}
                icon={<ThumbUp />}
                color="primary"
              />
              <Chip
                label={`Views: ${post.view}`}
                icon={<Visibility />}
                color="secondary"
              />
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" gap={2}>
                <Button
                  startIcon={<ThumbUp />}
                  variant="outlined"
                  color="primary"
                >
                  Upvote
                </Button>
                <Button
                  startIcon={<Repeat />}
                  variant="outlined"
                  color="secondary"
                >
                  Follow Up
                </Button>
              </Box>

              <Button
                startIcon={<Share />}
                variant="outlined"
              >
                Share
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
