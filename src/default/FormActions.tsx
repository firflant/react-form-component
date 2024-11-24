import React from 'react'
import { createUseStyles } from 'react-jss'
import { type fullTheme } from '../typings'

/**
 * Wrap `<FormButton>` and other action buttons into `<FormActions>` component
 * to position them accordingly and move them away from the fields above.
 */
const FormActions = ({ align = 'right', children }: FormActionsProps) => {
  const classes = useStyles({ align })
  return (
    <div className={classes.root}>{children}</div>
  )
}

type align = 'left' | 'right' | 'center' | 'space-between'

export interface FormActionsProps {
  align?: align,
  children: React.ReactNode,
}

const alignToJustify = (align: align) => {
  switch (align) {
    case 'left':
      return 'flex-start'
    case 'right':
      return 'flex-end'
    case 'center':
      return 'center'
    case 'space-between':
      return 'space-between'
  }
}

interface styleProps {
  align: align
}

const useStyles = createUseStyles((theme: fullTheme) => ({
  root: {
    lineHeight: 'normal',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.sizes.rowGutter,
    marginTop: theme.sizes.formActionsDistance,
    justifyContent: ({ align }: styleProps) => alignToJustify(align),
  },
}))

export default FormActions
