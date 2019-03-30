import React from 'react';
import Typography from '@material-ui/core/Typography';
import { homepagestyles} from '../materialcss/home.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';


const FooterPage = (props) => {
    const { classes } = props;
    return (
        
  
        <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
      </footer>
      
        
   
    )
};
FooterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(homepagestyles)(FooterPage);
     