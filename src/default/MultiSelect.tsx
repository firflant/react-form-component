import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'
import {
  withFormControl,
  parseOption,
  checkboxHandler,
  overlay,
  useSelectStyles,
} from '../.'
import { value, setValue, option, options, fullTheme } from '../typings'

const MultiSelect = ({
  name,
  value,
  placeholder,
  mandatory,
  setValue,
  options,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const selectClasses = useSelectStyles()
  const multiSelectClasses = useStyles()
  const classes = { ...selectClasses, ...multiSelectClasses }

  return (
    <div
      className={classNames(classes.select, classes.multiSelect, 'rfc-input rfc-select')}
      onClick={() => !isOpen && setIsOpen(true)}
    >
      {value && value.length && options && options.length
        ? <div className={classes.values}>
          {value.map((option: option, index: number) => {
            const { optionLabel } = parseOption(option)
            return <span
              key={index}
              className={classes.value}
            >{optionLabel}</span>
          })}
        </div>
        : placeholder || (mandatory ? 'Select' : 'All')
      }
      {isOpen &&
        <React.Fragment>
          <div
            className={classes.overlay}
            onClick={() => setIsOpen(false)}
          />
          <div className={classes.options}>
            {options.map((option: option, index: number) => {
              const { optionLabel, optionValue} = parseOption(option)
              const checked = (value && value.includes(optionValue))
              return <div
                key={index}
                className={classNames(classes.option, { [classes.isChecked]: checked })}
                onClick={() => setValue(name, checkboxHandler(!checked, optionValue, value), mandatory)}
              >
                {optionLabel}{checked &&
                  <>
                    <span className={classes.check}>✓</span>
                    <span className={classes.close}>✗</span>
                  </>
                }
              </div>
            })}
          </div>
        </React.Fragment>
      }
    </div>
  )
}

export interface MultiSelectProps {
  name: string,
  value: value,
  placeholder: React.ReactNode,
  mandatory?: boolean,
  setValue: setValue,
  options: options,
}

export const useStyles = createUseStyles((theme: fullTheme) => ({
  multiSelect: {
    position: 'relative',
    height: 'auto !important',
  },
  values: {
    margin: -3,
  },
  value: {
    padding: '0 5px',
    backgroundColor: theme.colors.fill,
    borderRadius: 3,
    whiteSpace: 'nowrap',
    display: 'inline-block',
    margin: 3,
  },
  options: {
    position: 'absolute',
    top: '100%',
    left: -1,
    right: -2,
    height: theme.sizes.inputHeight * 5,
    border: `1px solid ${theme.colors.inputBorder}`,
    backgroundColor: 'white',
    zIndex: 101,
    overflowY: 'scroll',
  },
  option: {
    padding: '3px 5px',
    marginBottom: 1,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.04)',
    },
  },
  isChecked: {
    backgroundColor: 'rgba(0,0,0,0.12)',
    '&:hover ': {
      backgroundColor: 'rgba(0,0,0,0.08)',
      '& $check': {
        display: 'none',
      },
      '& $close': {
        display: 'inline',
      },
    },
  },
  check: {
    color: 'rgba(0,0,0,0.12)',
  },
  close: {
    display: 'none',
    color: 'rgba(0,0,0,0.2)',
  },
  overlay: {
    ...overlay(),
  },
}))

export default withFormControl(MultiSelect)
