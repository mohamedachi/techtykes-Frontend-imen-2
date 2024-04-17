import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

import { bgGradient } from 'src/theme/css';

import { fetchProfile } from 'src/utils/redux/';



function ProfileView(props) {
  const theme = useTheme();
  const [editableUser, setEditableUser] = useState({}); // State to hold editable user data

  useEffect(() => {
    if (!props.user && props.loading) {
      props.fetchProfile();
    } else {
      setEditableUser(props.user); // Initialize editableUser with user data
    }
  }, [props.user]); // Trigger useEffect when user data changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prevEditableUser) => ({
      ...prevEditableUser,
      [name]: value,
    }));
  };

  const handleModify = () => {
    // Handle Modify action here
    // You may dispatch an action to update user data in Redux store or send the modified data to the server
  };

  return (
    <Box
      sx={{
        position: 'relative',
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Edit Profile</Typography>
          <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
            <Stack spacing={3} sx={{ mt: 3, width: 1, maxWidth: 420 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  width: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden', // To ensure the image stays within the rounded boundaries
                }}
              >
                <img
                  src="/public/assets/images/avatars/avatar_1.jpg"
                  alt="avatar_1.jpg"
                  style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                />
              </Box>
              <TextField
                name="name"
                label="Name"
                value={editableUser.name}
                onChange={handleChange}
              />
              <TextField
                name="lastname"
                label="Last Name"
                value={editableUser.lastname}
                onChange={handleChange}
              />
              <TextField
                name="email"
                label="Email"
                value={editableUser.email}
                onChange={handleChange}
              />
              <TextField
                name="tel"
                label="Phone"
                value={editableUser.tel}
                onChange={handleChange}
              />
              <Button variant="contained" onClick={handleModify}>
                Save
              </Button>
            </Stack>
          </div>
        </Card>
      </Stack>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  user: state.user.current,
  error: state.user.error,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProfile: () => dispatch(fetchProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);