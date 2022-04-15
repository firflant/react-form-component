import React from 'react'
import { createUseStyles } from 'react-jss'
import { fullTheme } from '../typings'

/**
 * Wrap `<FormButton>` and other action buttons into `<FormActions>` component
 * to position them accordingly and move them away from the fields above.
 */
const FormActions = ({ align = 'right', children }: FormActionsProps) => {
  const classes = useStyles()
  return (
    <div
      className={classes.root}
      style={{ justifyContent: align === 'left'
        ? 'flex-start'
        : align === 'right'
          ? 'flex-end'
          : 'center',
      }}
    >{children}</div>
  )
}

export interface FormActionsProps {
  /**
   * Align buttons to left or right
   */
  align?: 'left' | 'right',
  children: React.ReactNode,
}

const useStyles = createUseStyles((theme: fullTheme) => ({
  root: {
    marginTop: theme.sizes.formActionsDistance,
    lineHeight: 'normal',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: -10,
    '& > *': {
      margin: 10,
    },
  },
}))

export default FormActions
