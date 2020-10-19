import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import { withFormControl, checkboxHandler, overlay, selectTheme } from '../.'


class MultiSelect extends React.Component {
  state = {
    isOpen: false,
  }
  render() {
    const {
      name,
      value,
      placeholder,
      required,
      setValue,
      options,
      classes,
    } = this.props
    const { isOpen } = this.state
    return (
      <div
        className={classNames(classes.select, classes.multiSelect, 'form-input form-select')}
        onClick={() => !isOpen && this.setState({ isOpen: true })}
      >
        {value && value.length && options && options.length
          ? <div className={classes.values}>
            {value.map((item, index) => {
              const selectedOption = options.find(option => option.value === item)
              return <span
                key={index}
                className={classes.value}
              >
                {typeof selectedOption === 'string'
                  ? item
                  : selectedOption.label
                }
              </span>
            })}
          </div>
          : placeholder || (required ? 'Select' : 'All')
        }
        {isOpen &&
          <React.Fragment>
            <div
              className={classes.overlay}
              onClick={() => this.setState({ isOpen: false })}
            />
            <div className={classes.options}>
              {options.map((option, index) => {
                const optionLabel = (typeof option === 'string') ? option : option.label
                const optionValue = (typeof option === 'string') ? option : option.value
                const checked = (value && value.includes(optionValue))
                return <div
                  key={index}
                  className={classNames(classes.option, { [classes.isChecked]: checked })}
                  onClick={() => setValue(name, checkboxHandler(!checked, optionValue, value), required)}
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
}

MultiSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  placeholder: PropTypes.node,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
  ])),
}

export default withFormControl(withStyles(theme => ({
  ...selectTheme(theme),
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
}))(MultiSelect))
