import { useEffect } from 'react';
import { connect } from 'react-redux';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { posts } from 'src/_mock/blog';


import PostCard from '../post-card';
import PostSearch from '../post-search';
import { fetchConversations } from '../../../utils/redux';
import { useRouter } from 'src/routes/hooks';



// ----------------------------------------------------------------------

function InstancesView(props) {
  useEffect(() => {
        props.fetchConversations();
        
  }, [])
  const router = useRouter();

  const handleNewInstanceClick = () => {
    router.push('/conversation/new');
  }
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Conversations</Typography>
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch posts={posts} />
      </Stack>

      <Grid container spacing={3}>
        {props.conversations.map((conversation, index) => (
          conversation.cover = `/assets/images/covers/cover_${index + 1}.jpg`,
          conversation.author = {
            avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
            name: 'Louna',
          },
          <PostCard key={conversation.id} post={conversation} index={index} />
        ))}
      </Grid>
    </Container>
  );
}

const mapStateToProps = (state) => ({
    loading: state.conversation.loading,
    conversations: state.conversation.data,
    error: state.conversation.error
  })

const mapDispatchToProps = (dispatch) => ({
    fetchConversations: () => dispatch(fetchConversations()),
  })
export default connect(mapStateToProps, mapDispatchToProps)(InstancesView);