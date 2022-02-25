import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'
import { breakpoint } from '..'
import { fullTheme } from '../typings'


const Row = ({
  mobile,
  noBottomGutter,
  className = '',
  children,
}: RowProps) => {
  const classes = useStyles()
  return (
    <div className={classNames({
      [classes.row]: !mobile,
      [classes.rowMobile]: mobile,
      [classes.noBottomGutter]: noBottomGutter,
      [className]: className,
    })}>{children}</div>
  )
}

export interface RowProps {
  mobile?: boolean,
  noBottomGutter?: boolean,
  className?: string,
  children: React.ReactNode,
}

const useStyles = createUseStyles((theme: fullTheme) => {
  const commonStyling = {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: theme.sizes.inputGutterBottom,
    '& .form-control': {
      marginBottom: 0,
    },
    '& > div + *': {
      marginLeft: theme.sizes.rowGutter,
    },
  }
  return {
    row: {
      [breakpoint(theme.breakpoints.sm)]: commonStyling,
    },
    rowMobile: commonStyling,
    noBottomGutter: {
      marginBottom: 0,
    },
  }
})

export default Row
