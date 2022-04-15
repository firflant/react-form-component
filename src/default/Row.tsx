import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'
import { breakpoint } from '..'
import { fullTheme } from '../typings'

/**
 * A wrapper to put multiple form items into one line. By default, for the
 * purpose of better RWD experience, it keeps a column layout for mobile devices.
 */
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
  /**
   * Keeps row layout also for mobile devices
   */
  mobile?: boolean,
  /**
   * Disables bottom margin
   */
  noBottomGutter?: boolean,
  /**
   * Set additional classes
   */
  className?: string,
  children: React.ReactNode,
}

const useStyles = createUseStyles((theme: fullTheme) => {
  const commonStyling = {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: theme.sizes.inputGutterBottom,
    '& .rfc-form-control': {
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
