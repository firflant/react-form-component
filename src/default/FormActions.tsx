import React from 'react'
import { createUseStyles } from 'react-jss'
import { fullTheme } from '../typings'


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
