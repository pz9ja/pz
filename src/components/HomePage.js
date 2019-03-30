import React from 'react';
import {Link } from'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { homepagestyles} from '../materialcss/home.css';


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function HomePage(props) {
  const { classes } = props;

  return (
    
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              WELCOME TO HELPFUL
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              In this world you have to help people and get help , that is why we have decide to bring people 
              togther on this great and welcoming platform
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={16} justify="center">
                <Grid item>
                <Link to="/login" >
                  <Button variant="contained" color="primary">
                  Sign in
                  </Button>
                  </Link>
                </Grid>
                <Grid item>
                <Link to="/register" > <Button variant="outlined" color="primary">
                  Register>
                  </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
       
  );
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(homepagestyles)(HomePage);