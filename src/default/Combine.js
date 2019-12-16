import React from 'react'
import withStyles from 'react-jss'
import './style.sass'


const Combine = ({ classes, children }) =>
  <div className={classes.root}>{children}</div>


export default withStyles(theme => ({
  root: {
    display: 'flex',
    '& > *:not(:last-child)': {
      flexGrow: 1,
      '&, & .form-input': {
        borderTopRightRadius: '0 !important',
        borderBottomRightRadius: '0 !important',
      },
    },
    '& > * + *': {
      borderTopLeftRadius: '0 !important',
      borderBottomLeftRadius: '0 !important',
    },
    '& > *': {
      margin: '0 !important',
    },
  },
}))(Combine)
