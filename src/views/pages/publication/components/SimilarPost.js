import { Button, CardMedia, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const similarPost = ({post}) => {

  return (
    <Stack mb={2} spacing={1}>
        <CardMedia
        component="img"
        sx={{ width: '100%', height: '200px', borderRadius: 1 }}
        src={post.image}
        alt={post.title}
        />
        <Typography variant='h4' fontSize={18} px={0.5} >{post.title}</Typography>
        <Button sx={{ color: '#17a877', alignSelf:'start'}}
            component={Link} 
            to={`/post/${post.post_id}`
            }>
            Read More</Button>

    </Stack>
  )
}

export default similarPost