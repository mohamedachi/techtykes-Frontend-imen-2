import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import LoadingButton from '@mui/lab/LoadingButton'
import Grid from '@mui/material/Unstable_Grid2'


import SvgColor from 'src/components/svg-color'
import { useRouter } from 'src/routes/hooks'

// ----------------------------------------------------------------------
export default function PostCard({ post, index, deleteInstance }) {
  const { cover, bot, author } = post
  const router = useRouter()

  const handleInstanceClick = (botId, id) => {
    router.push(`/chat/${botId}?id=${id}`)
  }

  const renderAvatar = (
    <Avatar
      alt={author.name}
      src={author.avatarUrl}
      sx={{
        zIndex: 9,
        width: 32,
        height: 32,
        position: 'absolute',
        left: (theme) => theme.spacing(3),
        bottom: (theme) => theme.spacing(-2),
      }}
    />
  )

  const renderTitle = (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Link
        color="inherit"
        variant="subtitle2"
        underline="hover"
        sx={{
          height: 44,
          overflow: 'hidden',
          WebkitLineClamp: 2,
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {bot.name}
      </Link>

      {/* Delete Button */}
    </Stack>
  )

  const renderInfo = (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={1.5}
      justifyContent="flex-end"
      sx={{
        mt: 3,
        color: 'text.disabled',
      }}
    >
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={() => {
          handleInstanceClick(bot._id, post._id)
        }}
        sx={{ mt: 9, mb: 6 }}
      >
        Open
      </LoadingButton>
    </Stack>
  )

  const renderCover = (
    <Box
      component="img"
      alt={bot.name}
      src={cover}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  )

  const renderShape = (
    <SvgColor
      color="paper"
      src="/assets/icons/shape-avatar.svg"
      sx={{
        width: 80,
        height: 36,
        zIndex: 9,
        bottom: -15,
        position: 'absolute',
        color: 'background.paper',
      }}
    />
  )

  return (
    <Grid xs={12} sm={12} md={4}>
      <Card>
        <Box
          sx={{
            position: 'relative',
            pt: 'calc(100% * 3 / 4)',
          }}
        >
          {renderShape}

          {renderAvatar}

          {renderCover}
        </Box>

        <Box
          sx={{
            p: (theme) => theme.spacing(4, 3, 3, 3),
          }}
        >
          {renderTitle}

          {renderInfo}
        </Box>
      </Card>
    </Grid>
  )
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
}
