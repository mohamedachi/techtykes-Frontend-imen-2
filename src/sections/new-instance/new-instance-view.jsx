import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'
import { alpha, useTheme } from '@mui/material/styles'

import { bgGradient } from 'src/theme/css'

import Logo from 'src/components/logo'

import { addInstance, fetchPlans, fetchPlan } from 'src/utils/redux/'

// ----------------------------------------------------------------------

function NewInstanceView(props) {
  const theme = useTheme()
  const [name, setName] = useState('')
  const [context, setContext] = useState('')
  const [url, setUrl] = useState('*')
  const [plan, setPlan] = useState('')

  useEffect(() => {
    let plan = localStorage.getItem('plan')
    console.log(plan)
    if (!!plan) {
      props.fetchPlan(plan)
    } else {
      props.fetchPlans()
    }
  }, [])

  useEffect(() => {
    console.log(props.plan)
    if (props.plan) {
      setPlan(props.plan._id)
      localStorage.removeItem('plan')
    }
  }, [props.plan])

  useEffect(() => {
    if (props.payment) {
      window.open(props.payment.url)
    }
  }, [props.payment])
  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleContextChange = (e) => {
    setContext(e.target.value)
  }

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }

  const handleSelectPlan = (id) => {
    console.log(id)
    setPlan(id)
  }

  const handleSubmitClick = () => {
    props.addInstance({ name, context, url, plan })
  }

  const renderForm = (
    <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
      <Stack
        spacing={3}
        sx={{
          mt: 3,
          width: 1,
          maxWidth: 420,
        }}
      >
        <TextField
          name="name"
          label="Name"
          placeholder="( Optional )"
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          name="context"
          label="Context"
          placeholder="( Optional )"
          multiline
          minRows={3}
          value={context}
          onChange={handleContextChange}
        />
        <TextField
          name="url"
          label="URL ( * for public )"
          placeholder=""
          value={url}
          onChange={handleUrlChange}
        />

        <Stack direction="row" spacing={2}>
          {!props.loading && props.plan ? (
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant={'contained'}
              color="inherit"
              onClick={() => handleSelectPlan(props.plan._id)}
              disabled
              sx={{ mt: 9, mb: 6 }}
            >
              {props.plan.name}
            </LoadingButton>
          ) : (
            props.plans.map((item) => (
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant={plan === item._id ? 'contained' : 'outlined'}
                color="inherit"
                onClick={() => handleSelectPlan(item._id)}
                sx={{ mt: 9, mb: 6 }}
              >
                {item.name}
              </LoadingButton>
            ))
          )}
        </Stack>
      </Stack>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ mt: 3 }}
      >
        <Typography variant="body2">Make sure to allow Pop-ups!</Typography>
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSubmitClick}
        sx={{ mt: 1, mb: 6 }}
      >
        Submit
      </LoadingButton>
    </div>
  )

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
  )
}

const mapStateToProps = (state) => ({
  loading: state.plan.loading,
  payment: state.instance.current,
  plans: state.plan.data,
  plan: state.plan.current,
  error: state.plan.error,
})

const mapDispatchToProps = (dispatch) => ({
  addInstance: (id) => dispatch(addInstance(id)),
  fetchPlans: () => dispatch(fetchPlans()),
  fetchPlan: (name) => dispatch(fetchPlan(name)),
})
export default connect(mapStateToProps, mapDispatchToProps)(NewInstanceView)
