import { useState } from 'react';
import {
  Button,
  CardActionArea,
  Typography,
  makeStyles,
  Paper,
  Card,
  CardContent,
  CardActions,
  createStyles,
} from '@material-ui/core'
import { dateConverter } from '../helpers/dateConverter'
import { averageTemperature } from '../helpers/averageTemperature'
import { RiCelsiusFill, RiFahrenheitFill } from 'react-icons/ri'

const useStyles = makeStyles((theme) =>
  createStyles({
  root: {
    width: '32%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: '1rem',
    },
  },
  title: {
    fontSize: 14,
  },
}),
);

const WeatherCard = ({ value, currentTemp, click }) => {
  const [showMore, setShowMore] = useState(false)
  const classes = useStyles();
  return (
    
      <Paper className={classes.root}>
        <Card onClick={click} elevation={0} mb='3rem'>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                Date: {dateConverter(value[0].dt).dateFormat}
              </Typography>
              <Typography className={classes.title} gutterBottom>
                Temp: {averageTemperature(value)[currentTemp]}
                {currentTemp === 'c' ? <RiCelsiusFill /> : <RiFahrenheitFill />}
              </Typography>

              {showMore && (
                <CardActionArea>
                  <Typography variant='body1'>
                    main: {value[0].weather[0].main}
                  </Typography>
                  <Typography variant='body1'>
                    Desc: {value[0].weather[0].description.toUpperCase()}
                  </Typography>
                </CardActionArea>
              )}
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size='small'
              color='primary'
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'Collapse' : 'Expand'}
            </Button>
          </CardActions>
        </Card>
      </Paper>
  )
};

export default WeatherCard;
