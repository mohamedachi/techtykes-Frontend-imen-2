import { useEffect } from 'react';
import { connect } from 'react-redux';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Button } from "flowbite-react";
import ProductCard from '../product-card';
import { fetchPlans } from '../../../utils/redux';
import { Component } from '../card';
import PaymentComponent from '../payment-comp';


// ----------------------------------------------------------------------

function PlansView(props) {
  
useEffect(() => {
        props.fetchPlans();
    }, [])
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
     
<Component></Component>
   

  

      </Typography>

      

      <Grid container spacing={3}>
        {props.plans.map((plan, index) => (
          plan.cover= `/assets/images/covers/cover_${index+1}.jpg`,
          <Grid key={plan.id} xs={12} sm={6} md={3}>
            <ProductCard product={plan} />
          </Grid>
        ))}
      </Grid>

    </Container>
  );
}

const mapStateToProps = (state) => ({
        loading: state.plan.loading,
        plans: state.plan.data,
        error: state.plan.error
    })

const mapDispatchToProps = (dispatch) => ({
        fetchPlans: () => dispatch(fetchPlans())
    })
export default connect(mapStateToProps, mapDispatchToProps)(PlansView);
