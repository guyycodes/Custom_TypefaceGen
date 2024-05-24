import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import axios from 'axios';

const API_BASE_URL = 'https://www.gaslightai.com/api';

export const MyFeed = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    // Add other user properties as needed
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Check if user is authenticated
    // const checkAuth = async () => {
    //   try {
    //     const response = await axios.get(`${API_BASE_URL}/auth/check`);
    //     setUser(response.data.user);
    //   } catch (error) {
    //     console.error('Authentication check error:', error);
    //   }
    // };

    // Fetch posts from the server
    // const fetchPosts = async () => {
    //   try {
    //     const response = await axios.get(`${API_BASE_URL}/posts`);
    //     setPosts(response.data.posts);
    //   } catch (error) {
    //     console.error('Error fetching posts:', error);
    //   }
    // };


    // fetch dummy data 
    const fetchPosts = async () => {
      try {
        const response = await import('../../util/dummy-posts.json');
        setPosts(response.default);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    // checkAuth();
    fetchPosts();
  }, []);

  const handleLogin = async (provider) => {
    try {
      // const response = await axios.post(`${API_BASE_URL}/auth/login`, { provider });
      // setUser(response.data.user);
    } catch (error) {
      // console.error('Login error:', error); 
    }finally{
      console.log("Login")
    }
  };

  const handleLogout = async () => {
    try {
      // await axios.post(`${API_BASE_URL}/auth/logout`);
      // setUser(null);
    } catch (error) {
      // console.error('Logout error:', error);
    }finally{
      console.log("Logout")
    }
  };

  const handleLike = async (postId) => {
    try {
      // await axios.post(`${API_BASE_URL}/posts/${postId}/like`);
      // // Refresh posts after updating likes
      // const response = await axios.get(`${API_BASE_URL}/posts`);
      // setPosts(response.data.posts);
    } catch (error) {
      // console.error('Like error:', error);
    }finally{
      console.log("Like")
    }
  };

  const handleDislike = async (postId) => {
    try {
      // await axios.post(`${API_BASE_URL}/posts/${postId}/dislike`);
      // // Refresh posts after updating dislikes
      // const response = await axios.get(`${API_BASE_URL}/posts`);
      // setPosts(response.data.posts);
    } catch (error) {
      // console.error('Dislike error:', error);
    }finally{
      console.log("Dislike")
    }
  };

  return (
    <Box>
      {/* Main Content */}
      <Box sx={{ p: 2, textAlign: 'center' }}>
        {user ? (
          <>
            <Typography variant="h6">Welcome, {user.name}!</Typography>
            <Button variant="contained" color="primary" onClick={handleLogout} sx={{ mt: 2 }}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6">Please login to access the social feed.</Typography>
            <Button variant="contained" color="primary" onClick={() => handleLogin('google')} sx={{ mt: 2 }}>
              Login with Google
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleLogin('facebook')} sx={{ mt: 2 }}>
              Login with Facebook
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleLogin('github')} sx={{ mt: 2 }}>
              Login with GitHub
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleLogin('twitter')} sx={{ mt: 2 }}>
              Login with Twitter
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleLogin('apple')} sx={{ mt: 2 }}>
              Login with Apple
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleLogin('linkedIn')} sx={{ mt: 2 }}>
              Login with LinkedIn
            </Button>
          </>
        )}
        {user && (
          <>
            <Typography variant="h5" sx={{ mt: 4 }}>Social Feed</Typography>
            {posts.map((post) => (
              <Box key={post.id} sx={{ border: '1px solid #ccc', borderRadius: '4px', p: 2, mt: 2 }}>
                <Typography variant="subtitle1">{post.content}</Typography>
                <Typography variant="body2" color="textSecondary">Posted from: {post.component}</Typography>
                <Typography variant="body2" color="textSecondary">Posted at: {new Date(post.timestamp).toLocaleString()}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <IconButton color="primary" onClick={() => handleLike(post.id)}>
                    <ThumbUp />
                    <Typography variant="body2" sx={{ ml: 1 }}>{post.likes || 0}</Typography>
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDislike(post.id)}>
                    <ThumbDown />
                    <Typography variant="body2" sx={{ ml: 1 }}>{post.dislikes || 0}</Typography>
                  </IconButton>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6">Comments:</Typography>
                  {post.comments.map((comment) => (
                    <Box key={comment.id} sx={{ mt: 1 }}>
                      <Typography variant="body1">{comment.content}</Typography>
                      <Typography variant="body2" color="textSecondary">By: {comment.author}</Typography>
                      <Typography variant="body2" color="textSecondary">Posted at: {new Date(comment.timestamp).toLocaleString()}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};