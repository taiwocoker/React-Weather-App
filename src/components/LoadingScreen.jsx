import {
  Grid,
  createStyles,
  makeStyles,
  CircularProgress,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles((theme) =>
  createStyles({
    grid: {
      minHeight: '100vh',
    },
  })
)

const LoadingScreen = () => {
  const classes = useStyles()

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justify='center'
      className={classes.grid}
    >
      <Typography variant='h6' component='p'>
        Loading Page
      </Typography>
      <CircularProgress size={80}/>
    </Grid>
  )
}

export default LoadingScreen
