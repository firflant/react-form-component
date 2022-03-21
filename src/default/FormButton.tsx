import React from 'react'
import { createUseStyles } from 'react-jss'
import { lighten } from 'polished'
import { useSubmit, Loader } from '../.'
import { fieldsData, fullTheme } from '../typings'


/**
 * A button component to handle form actions, like submit or reset.
 */
const FormButton = ({
  onClick,
  reset,
  loading,
  suppressErrorMessage,
  children,
}: FormButtonProps) => {
  const classes = useStyles()
  const submit = useSubmit(suppressErrorMessage)

  return (
    <button
      type='button'
      className={classes.button}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => submit && submit(e, onClick, reset)}
      disabled={loading}
    >
      {loading && <><Loader />&nbsp;</>}{children}
    </button>
  )
}

export interface FormButtonProps {
  onClick: (fieldsData: fieldsData) => void,
  loading?: boolean,
  reset?: boolean,
  suppressErrorMessage?: boolean,
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
