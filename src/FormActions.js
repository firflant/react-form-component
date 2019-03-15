import React from 'react'
import withStyles from 'react-jss'


const FormActions = ({ children, classes }) =>
  <div className={classes.formActions}>{children}</div>

export default withStyles(theme => ({
  formActions: {
    marginTop: theme.sizes.inputGutterBottom * 2,
    lineHeight: 'normal',
    display: 'flex',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    alignItems: 'center',
    margin: -10,
    '& > *': {
      margin: 10,
    },
  },
}))(FormActions)
