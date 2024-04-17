import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'src/routes/hooks';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';
import { fetchProfile } from 'src/utils/redux/';

// ----------------------------------------------------------------------

function DashboardLayout(props) {
  const { children } = props;
  const [openNav, setOpenNav] = useState(false);
  const router = useRouter();
  console.log(props.user, props.loading)
  if (!props.user && !props.loading) {
    props.fetchProfile().then(() => {
      if (!props.user) {
        router.push('/login');
      } else {
        let plan = localStorage.getItem('plan');
        if (!!plan && window.location.pathname !== '/instance/new') {
          router.push('/instance/new')
        }
      }
    });
  } else {
    let plan = localStorage.getItem('plan');
    if (!!plan && window.location.pathname !== '/instance/new') {
      router.push('/instance/new')
    }
  }

  return (
    <>
      {
        props.loading ? null
        : <>
            <Header onOpenNav={() => setOpenNav(true)} />

            <Box
              sx={{
                minHeight: 1,
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
              }}
            >
              <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

              <Main>{children}</Main>
            </Box>
          </>

      }
      
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = (state) => ({
        loading: state.user.loading,
        user: state.user.current,
        error: state.user.error
    })

const mapDispatchToProps = (dispatch) => ({
        fetchProfile: () => dispatch(fetchProfile())
    })
export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);
