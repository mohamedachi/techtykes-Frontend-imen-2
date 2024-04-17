import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  Paper
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function AddBotView() {
  // State for the bot creation form
  const [botName, setBotName] = useState('');
  const [botDescription, setBotDescription] = useState('');
  const [botPersonality, setBotPersonality] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
  // State for the dual-list box setup
  const [availableFolders, setAvailableFolders] = useState([]); // Will be fetched from the API
  const [selectedFolders, setSelectedFolders] = useState([]); // Folders selected by the user
    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    const userId = userData.id;
    console.log(userId);
  useEffect(() => {
    // Fetch the folders when the component mounts
    const fetchFolders = async () => {
      try {
   const response = await axios.get(`http://localhost:4000/s/api/folders/user/${userId}`);        setAvailableFolders(response.data); // Populate the available folders
      } catch (error) {
        console.error('Error fetching folder data:', error);
      }
    };

    fetchFolders();
  }, []);

  // Handlers for adding and removing folders
  const handleAddFolder = (folder) => {
    setSelectedFolders([...selectedFolders, folder]);
    setAvailableFolders(availableFolders.filter((f) => f !== folder));
  };

  const handleRemoveFolder = (folder) => {
    setAvailableFolders([...availableFolders, folder]);
    setSelectedFolders(selectedFolders.filter((f) => f !== folder));
  };
  const handleSubmit = async (event) => {
        const userDataString = localStorage.getItem("user");
        const userData = JSON.parse(userDataString);
        const userId = userData.id;
        console.log(userId);
        event.preventDefault();
  const selectedFolderIds = selectedFolders.map(folder => folder.id);

        const botData = {
      
      name: botName,
      description: botDescription,
      model: 'Mistral AI', // Always set model to 'Mistral AI'
      personality: botPersonality,
      UserId: userId,
          folders: selectedFolderIds // Include selected folder IDs

    };

    try {
      const response = await fetch('http://localhost:4000/s/api/bot/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(botData),
      });

      if (!response.ok) throw new Error('Network response was not ok.');

      const result = await response.json();
      console.log(result); // Process success response
      setShowSuccessAlert(true);
      // Hide the alert after a few seconds
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000); // Hide after 3 seconds
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAlertClose = () => {
    setShowSuccessAlert(false);
  };
const personalities = [
    {
      name: 'Factual',
      description: 'Provides precise responses using your knowledge base.',
      image: '/assets/images/covers/cover_1.jpg', // Replace with your image paths
    },
    {
      name: 'Creative',
      description: 'Creative - Facilitates AI-driven creative content generation.',
      image: '/assets/images/covers/cover_2.jpg', // Replace with your image paths
    },
     {
      name: 'Customer Support',
      description: 'Customer Support - Delivers quick, effective solutions to customer inquiries.',
      image: '/assets/images/covers/cover_3.jpg', // Replace with your image paths
    },
     {
      name: 'Marketing',
      description: 'Marketing - Contributes in strategic planning, crafting marketing and social media content.',
      image: '/assets/images/covers/cover_4.jpg', // Replace with your image paths
    },
     {
      name: 'Employee Help Desk',
      description: 'Employee Help Desk - Assists in addressing employee inquiries and HR guidelines.',
      image: '/assets/images/covers/cover_5.jpg', // Replace with your image paths
    },
     {
      name: 'Technical Support',
      description: 'Technical Support - Provides technical support and offers troubleshooting aid.',
      image: '/assets/images/covers/cover_6.jpg', // Replace with your image paths
    },
       {
      name: 'Guided',
      description: 'Guided - Conducts comprehensive guided training sessions.',
      image: '/assets/images/covers/cover_7.jpg', // Replace with your image paths
    },
       {
      name: 'Base AI',
      description: 'Base AI - Utilize your preferred AI model without a knowledge base.',
      image: '/assets/images/covers/cover_8.jpg', // Replace with your image paths
    },
  ];
  const selectPersonality = (personalityName) => {
    setBotPersonality(personalityName);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Add New Bot
      </Typography>
      {showSuccessAlert && (
        <div className="alert alert-dismissible alert-success">
          <button type="button" className="btn-close" onClick={handleAlertClose} />
          <strong>Well done!</strong> You successfully added a new bot.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          required
          id="bot-name"
          label="Bot Name"
          fullWidth
          margin="normal"
          value={botName}
          onChange={(e) => setBotName(e.target.value)}
        />
        <TextField
          id="bot-description"
          label="Bot Description"
          fullWidth
          margin="normal"
          value={botDescription}
          onChange={(e) => setBotDescription(e.target.value)}
        />

        <Typography variant="h5" gutterBottom>
          Select Bot Personality
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {personalities.map((personality) => (
          <Card key={personality.name} onClick={() => selectPersonality(personality.name)} style={{ width: '30%', margin: '1%' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="100"
                image={personality.image}
                alt={personality.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {personality.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {personality.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
        {/* Assume personalities data is predefined elsewhere */}
        
        {/* Display the square with folders list */}
        <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Base of Knowledge
      </Typography>
       <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={6}>
          <Typography variant="h6">Available Folders</Typography>
          <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
            <List>
              {availableFolders.map((folder, index) => (
                <ListItem key={index}>
                  <ListItemText primary={folder.name} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="add" onClick={() => handleAddFolder(folder)}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h6">Selected Folders</Typography>
          <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
            <List>
              {selectedFolders.map((folder, index) => (
                <ListItem key={index}>
                  <ListItemText primary={folder.name} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="remove" onClick={() => handleRemoveFolder(folder)}>
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

        <Button type="submit" variant="contained" color="primary">
          Create Bot
        </Button>
      </form>
    </Container>
  );
}




/*
  <Typography variant="h5" gutterBottom>
        Select Bot Personality
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableBody>
            <TableRow>
              {personalities.map((personality) => (
                <TableCell key={personality.name}>
                  <Card onClick={() => selectPersonality(personality.name)} style={{ width: '100%' }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="100" // Adjust the height as needed
                        image={personality.image}
                        alt={personality.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {personality.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {personality.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
*/