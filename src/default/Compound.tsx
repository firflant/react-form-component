import React from 'react'
import { createUseStyles } from 'react-jss'


const Compound = ({ children }: CompoundProps) => {
  const classes = useStyles()
  return <div className={classes.root}>{children}</div>
}

export interface CompoundProps {
  children: React.ReactNode,
}

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    '& > *:not(:last-child)': {
      flexGrow: 1,
      '&, & .rfc-input': {
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
})

export default Compound
