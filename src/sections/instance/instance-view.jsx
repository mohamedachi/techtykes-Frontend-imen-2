import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';


import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import { fetchInstance, editInstance } from 'src/utils/redux/';

// ----------------------------------------------------------------------

function InstanceView(props) {
  const theme = useTheme();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [context, setContext] = useState('');
  const [url , setUrl] = useState('*');
  const [submitted, setSubmitted] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (id) {
      props.fetchInstance(id);
    }
  }, []);
  useEffect(() => {
    if (props.instance && props.loading === false) {
      setName(props.instance.name);
      setContext(props.instance.context);
      setUrl(props.instance.url);
    } else if( props.instance === null && submitted === true) {
      router.push('/instances');
    }
  }, [props.instance]);

  const handleNameChange = (e) => {
    setName(e.target.value)
  };

  const handleContextChange = (e) => {
    setContext(e.target.value)
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }

  const handleSubmitClick = () => {
    props.editInstance(id, { name, context, url});
    setSubmitted(true);
  };

  const renderForm = (
    <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
      <Stack spacing={3} sx={{
            mt: 3,
            width: 1,
            maxWidth: 420,
          }}>
        <TextField name="name" label="Name" value={name} onChange={handleNameChange} />
        <TextField name="context" label="Context" multiline minRows={3} value={context} onChange={handleContextChange} />
        <TextField name="url" label="URL ( * for public )" placeholder='' multiline minRows={3} value={url} onChange={handleUrlChange} />

      </Stack>          
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSubmitClick}
        sx={{ mt: 9, mb: 6 }}
      >
        Submit
      </LoadingButton>
      
    </div>
  );

  return (
    <Box
      sx={{
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
          <Typography variant="h4">Instance Form</Typography>          

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}


const mapStateToProps = (state) => ({
        loading: state.instance.loading,
        instance: state.instance.current,
        error: state.instance.error
    })

const mapDispatchToProps = (dispatch) => ({
        fetchInstance: (id) => dispatch(fetchInstance(id)),
        editInstance: (id,data) => dispatch(editInstance(id,data))
    })
export default connect(mapStateToProps, mapDispatchToProps)(InstanceView);
