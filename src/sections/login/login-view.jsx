import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'
import { alpha, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'

import { useRouter } from 'src/routes/hooks'

import { bgGradient } from 'src/theme/css'

import Logo from 'src/components/logo'
import Iconify from 'src/components/iconify'
import { signin, clear } from '../../utils/redux'

// ----------------------------------------------------------------------

function LoginView(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState([])
  const theme = useTheme()

  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)

  const handleClick = () => {
    console.log(email, password)
    let newError = []
    if (!email) {
      newError.push('Email is required')
    }
    if (!password) {
      newError.push('Password is required')
    }
    setError(newError)
    if (newError.length === 0) {
      props.signin({ email, password })
    }
  }
  useEffect(() => {
    if (props.user) {
      router.push('/instances')
    }
  }, [props.user])

  const handleSignupClick = () => {
    props.clear().then(() => {
      router.push('/signup')
    })
  }

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ my: 3 }}
      >
        {props.error && (
          <Typography variant="body2" sx={{ color: 'red' }}>
            {props.error.message}
          </Typography>
        )}
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>
      <Stack
        direction="column"
        alignItems="right"
        justifyContent="flex-end"
        sx={{ my: 3 }}
      >
        {error.map((err) => {
          return (
            <Typography variant="caption" sx={{ color: 'red' }}>
              <li>{err}</li>
            </Typography>
          )
        })}
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
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
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Louna Dashboard</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link
              variant="subtitle2"
              sx={{ ml: 0.5 }}
              onClick={handleSignupClick}
            >
              Get started
            </Link>
          </Typography>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  )
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  user: state.user.current,
  error: state.user.error,
})

const mapDispatchToProps = (dispatch) => ({
  signin: (credentials) => dispatch(signin(credentials)),
  clear: () => dispatch(clear()),
})
export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
