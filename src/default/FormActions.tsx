import React from 'react'
import { createUseStyles } from 'react-jss'
import { fullTheme } from '../typings'

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
    marginTop: theme.sizes.formActionsDistance,
    lineHeight: 'normal',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: -theme.sizes.rowGutter,
    justifyContent: ({ align }: styleProps) => alignToJustify(align),
    '& > *': {
      margin: theme.sizes.rowGutter,
    },
  },
}))

export default FormActions
