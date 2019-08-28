import React from 'react'
import withStyles from 'react-jss'
import { lighten } from 'polished'


const DefaultButton = ({ onClick, classes, disabled, children }) =>
  <button
    type='button'
    className={classes.button}
    onClick={e => onClick(e)}
    disabled={disabled}
  >{children}</button>

export default withStyles(theme => ({
  button: {
    padding: `0 ${theme.sizes.inputHeight / 2}px`,
    fontSize: theme.typography.inputFontSize,
    lineHeight: `${theme.sizes.inputHeight}px`,
    height: theme.sizes.inputHeight,
    borderWidth: 0,
    borderRadius: theme.sizes.borderRadius,
    whiteSpace: 'nowrap',
    color: 'white',
    backgroundColor: theme.colors.accent,
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: lighten(0.1, theme.colors.accent),
    },
    '&:focus': {
      outline: 'none',
    },
    '&:disabled': {
      opacity: 0.6,
      pointerEvents: 'none',
    },
  },
}))(DefaultButton)
