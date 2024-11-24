import React from 'react'
import { createUseStyles } from 'react-jss'
import { lighten } from 'polished'
import { Loader } from '../.'
import { type fullTheme } from '../typings'


/**
 * A button component to handle form actions, like submit or reset.
 */
const FormButton = ({
  onClick,
  loading,
  children,
}: FormButtonProps) => {
  const classes = useStyles()

  return (
    <button
      type='button'
      className={classes.button}
      onClick={onClick}
      disabled={loading}
    >
      {loading && <><Loader />&nbsp;</>}{children}
    </button>
  )
}

export interface FormButtonProps {
  /**
   * onClick callback
   */
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
  /**
   * Turns on loading state
   */
  loading?: boolean,
  children: React.ReactNode,
}

const useStyles = createUseStyles((theme: fullTheme) => ({
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
}))

export default FormButton
