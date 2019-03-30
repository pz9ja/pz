import React from 'react';
import { Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { homepagestyles } from '../materialcss/home.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const HeaderPage = (props) => {
    const { classes } = props;
    return (
<div>
<CssBaseline />
<AppBar position="static" className={classes.appBar}>
  <Toolbar>
    <CameraIcon className={classes.icon} />
    <Typography variant="h6" color="inherit" noWrap>
      HELPFUL
    </Typography>
  </Toolbar>
</AppBar>
</div>
     
    )
};

HeaderPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(homepagestyles)(HeaderPage)
     