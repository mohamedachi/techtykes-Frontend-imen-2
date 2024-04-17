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

import { signup, clear } from 'src//utils/redux/'

// ----------------------------------------------------------------------

function SignupView(props) {
  const theme = useTheme()

  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [tel, setTel] = useState('')
  const [error, setError] = useState([])

  const handleChangeName = (e) => {
    setName(e.target.value)
  }
  const handleChangeLastname = (e) => {
    setLastname(e.target.value)
  }
  const handleChangeCompanyName = (e) => {
    setCompanyName(e.target.value)
  }
  const handleChangeTel = (e) => {
    setTel(e.target.value)
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  useEffect(() => {
    if (props.user) {
      router.push('/login')
    }
  }, [props.user])

  const handleSubmitClick = () => {
    let newError = []
    if (!name) {
      newError.push('First name is required')
    }
    if (!lastname) {
      newError.push('Last name is required')
    }
    if (companyName && companyName.length < 3) {
      newError.push('Company name must be at least 3 characters')
    }
    if (!tel) {
      newError.push('Phone number is required')
    }
    if (!email) {
      newError.push('Email is required')
    }
    if (!password) {
      newError.push('Password is required')
    }
    if (password.length < 8) {
      newError.push('Password must be at least 8 characters')
    }
    let hasUpper = /[A-Z]/.test(password)
    let hasLower = /[a-z]/.test(password)
    let hasDigit = /[0-9]/.test(password)
    let hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    if (!hasUpper) {
      newError.push('Password must contain at least one uppercase letter')
    }
    if (!hasLower) {
      newError.push('Password must contain at least one lowercase letter')
    }
    if (!hasDigit) {
      newError.push('Password must contain at least one digit')
    }
    if (!hasSpecial) {
      newError.push('Password must contain at least one special character')
    }
    if (!confirmPassword) {
      newError.push('Confirm password is required')
    }
    if (password !== confirmPassword) {
      newError.push('Passwords do not match')
    }
    setError(newError)
    if (newError.length === 0) {
      const formattedEmail = email.replace('.', '$')
      props.signup({
        email: formattedEmail,
        password,
        name,
        lastname,
        companyName,
        tel,
        role: 'USER',
        verified: true,
      })
    }
  }

  useEffect(() => {
    if (props.error) {
      let newError = []
      newError.push('Email already exists')
      setError(newError)
    }
  }, [props.error])
  useEffect(() => {
    if (props.success) {
      props.clear().then(() => {
        router.push('/login')
      })
    }
  }, [props.success])
  const handleLoginClick = () => {
    props.clear().then(() => {
      router.push('/login')
    })
  }

  const renderForm = (
    <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
      <Stack
        spacing={3}
        sx={{
          padding: 1,
        }}
      >
        <TextField
          name="name"
          label="First name"
          value={name}
          required
          onChange={handleChangeName}
        />
        <TextField
          name="lastname"
          label="Last name"
          value={lastname}
          required
          onChange={handleChangeLastname}
        />
        <TextField
          name="companyName"
          label="Company name"
          value={companyName}
          onChange={handleChangeCompanyName}
        />
        <TextField
          name="tel"
          label="Phone number"
          value={tel}
          required
          onChange={handleChangeTel}
        />

        <TextField
          name="email"
          label="Email address"
          value={email}
          required
          onChange={handleChangeEmail}
        />

        <TextField
          name="password"
          label="Password"
          value={password}
          onChange={handleChangePassword}
          type={showPassword ? 'text' : 'password'}
          minLength={8}
          required
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
        <TextField
          name="password"
          label="Confirm Password"
          value={confirmPassword}
          required
          onChange={handleChangeConfirmPassword}
          type={showPassword ? 'text' : 'password'}
        />
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
        onClick={handleSubmitClick}
        sx={{ mt: 3, mb: 6 }}
      >
        Sign up
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
          <Typography variant="h4">Sign up to Louna Dashboard</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Already have an account?
            <Link
              variant="subtitle2"
              sx={{ ml: 0.5 }}
              onClick={handleLoginClick}
            >
              Sign in
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
  success: state.user.success,
  error: state.user.error,
})

const mapDispatchToProps = (dispatch) => ({
  signup: (credentials) => dispatch(signup(credentials)),
  clear: () => dispatch(clear()),
})
export default connect(mapStateToProps, mapDispatchToProps)(SignupView)



