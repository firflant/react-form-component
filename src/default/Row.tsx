import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'
import { breakpoint } from '..'
import { fullTheme } from '../typings'

/**
 * Combines multiple fields into one row. Wrapped fields will be displayed one
 * after one with a proper gap in between. On smaller screens they will keep the
 * default, column behavior.
 */
const Row = ({
  mobile,
  noBottomGutter,
  className = '',
  children,
}: RowProps) => {
  const classes = useStyles()
  return (
    <div className={classNames('rfc-row', {
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
    '& > * + *': {
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
