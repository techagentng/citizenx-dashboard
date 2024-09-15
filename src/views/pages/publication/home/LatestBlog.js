import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography} from '@mui/material';

 // Import Components
import PublicationCard from '../components/PublicationCard';
import axiosServices from 'utils/axios';

 

const LatestBlog = () => {
    const [posts, SetPosts] = useState([]);

    // Fetch Wordpress Posts
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const res = await axiosServices.get('https://iPledge2nigeria.net/wp-json/wp/v2/posts');
                const postData = res.data;

                // Fetch Featured Image for each post
                const postWithImage = await Promise.all(
                    postData.map(async (post)=>{
                        const featuredImage = await fetchFeaturedImage(post.featured_media);
                        return {
                            ...post,
                            featured_image_url: featuredImage //add image url to each post
                        };
                    })
                );

                SetPosts(postWithImage);
            } catch (error) {
                console.error("Failed to fetch posts")
            }
        };

        fetchData();
    },[])

    // Fetch the featured image using featured_media ID
    const fetchFeaturedImage = async (mediaId) => {
        try {
        const response = await axiosServices.get(`https://iPledge2nigeria.net/wp-json/wp/v2/media/${mediaId}`);
        const imageUrl = response.data.media_details.sizes?.full?.source_url || response.data.source_url;
        return imageUrl;
        } catch (error) {
        console.error('Error fetching featured image:', error);
        return null;
        }
    };

    // Decode HTML Entities
    const decodeHTMLEntities = (str) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = str;
        return txt.value;
    };

    // Remove HTML tags from the caption
    const removeHTMLTags = (str) => {
        return str.replace(/(<([^>]+)>)/gi, "");
    };
  
    // Limit text to a specific number of words
    const limitWords = (str, wordLimit = 10) => {
        const words = str.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + ' ...';
        }
        return str;
    };

    // Convert text to sentence case
    const toSentenceCase = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    // Clean, decode, format, and limit the text
    const cleanText = (text, wordLimit = 10) => {
        const decodedText = decodeHTMLEntities(text); // Decode HTML entities
        const textWithoutHTML = removeHTMLTags(decodedText); // Remove HTML tags
        const limitedText = limitWords(textWithoutHTML, wordLimit); // Limit words
        return toSentenceCase(limitedText); // Convert to sentence case
    };

    // Limit the caption to a specific number of characters
    const cleanCaption = (caption, charLimit = 100) => {
        const decodedText = decodeHTMLEntities(caption); // Decode HTML entities
        const textWithoutHTML = removeHTMLTags(decodedText); // Remove HTML tags
        return textWithoutHTML.length > charLimit
            ? textWithoutHTML.slice(0, charLimit) + " ..."
            : textWithoutHTML;
    };
  

    // Format Post Date
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };

    // Get the most recent four posts
    const recentPosts = posts.slice(0, 4);

  return (
    <Container>
        <Grid container spacing={7.5} justifyContent="left">
            {/* Heading */}
            <Grid item xs={12} md={6} sx={{ textAlign: 'left' }}>
                    <Grid container spacing={1.5}>
                        <Grid item xs={12}>
                            <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                                Latest Blog Post
                            </Typography>
                            
                        </Grid>
                    </Grid>
                </Grid>
                {/* Columns */}
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={5} sx={{ '&> .MuiGrid-root > div': { height: '100%' } }}>
                        {recentPosts.map((post, index) => (
                            <Grid key={index} item md={3} sm={12}>
                                <PublicationCard
                                    title={cleanText(post.title.rendered, 10)}
                                    caption={cleanCaption(post.excerpt.rendered, 150)}
                                    image={post.featured_image_url}
                                    postDate={formatDate(post.date)}
                                    postLink={post.link}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                
        </Grid>
    </Container>
  )
}

export default LatestBlog