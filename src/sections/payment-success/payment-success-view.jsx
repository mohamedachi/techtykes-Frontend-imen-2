import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useRouter } from 'src/routes/hooks';

import { RouterLink } from 'src/routes/components';

import Logo from 'src/components/logo';

import { paymentSuccess } from 'src/utils/redux/';

// ----------------------------------------------------------------------

function PaymentSuccessView(props) {
  const { id } = useParams();
  const router = useRouter();
  useEffect(() => {
    if (id) {
      props.paymentSuccess(id);
    }
  }, []);
  useEffect(() => {
    if (props.payment) {
      router.push('/instances');
    }
  }, [props.payment]);

  const renderHeader = (
    <Box
      component="header"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        lineHeight: 0,
        position: 'fixed',
        p: (theme) => ({ xs: theme.spacing(3, 3, 0), sm: theme.spacing(5, 5, 0) }),
      }}
    >
      <Logo />
    </Box>
  );

  return (
    <>
      {renderHeader}

      <Container>
        <Box
          sx={{
            py: 12,
            maxWidth: 480,
            mx: 'auto',
            display: 'flex',
            minHeight: '100vh',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            Payment Success
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Your instance has been created and will be running in few moments !
          </Typography>

          <Box
            component="img"
            src="/assets/illustrations/illustration_avatar.png"
            sx={{
              mx: 'auto',
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />

          <Button href="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </Box>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
        loading: state.payment.loading,
        payment: state.payment.current,
        error: state.payment.error
    })

const mapDispatchToProps = (dispatch) => ({
        paymentSuccess: (id) => dispatch(paymentSuccess(id))
    })
export default connect(mapStateToProps, mapDispatchToProps)(PaymentSuccessView);