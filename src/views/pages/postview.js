import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography, Container, CircularProgress, Box } from '@mui/material';
import axios from 'axios';

const PostView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`https://citizenx-9hk2.onrender.com/api/v1/post/${id}`);
        setPost(res.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container>
        <Typography variant="h6" color="error">
                    Post not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Category: {post.report_type} — Sub: {post.sub_report}
      </Typography>
      <Typography variant="body1" mt={2}>
        {post.description}
      </Typography>
      <Typography variant="caption" color="textSecondary" display="block" mt={3}>
                Posted on: {new Date(post.created_at).toLocaleString()}
      </Typography>
      {post.location && (
        <Typography variant="caption" display="block">
          Location: {post.location}
        </Typography>
      )}
    </Container>
  );
};

export default PostView;
