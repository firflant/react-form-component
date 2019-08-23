import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import { lighten, darken } from 'polished'
import { withFormControl, checkboxHandler, overlay, selectTheme } from '../.'


const renderValueItem = (item, options) => {
  const value = options.find(option => option.value === item)
  return value
    ? typeof value === 'string' ? value : value.label
    : 'n/d'
}

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
        onClick={() => {
          if (!isOpen) { return this.setState({ isOpen: true }) }
        }}
      >{value && value.length
          ? value.map((item, index) =>
            <span
              key={index}
              className={classes.value}
            >{renderValueItem(item, options)}</span>
          )
          : placeholder || (required ? 'Select' : 'All')}
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
                >{optionLabel}{checked && <span className={classes.sign}>✓</span>}</div>
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
    whiteSpace: 'nowrap',
  },
  value: {
    padding: '3px 5px',
    backgroundColor: theme.colors.fill,
    borderRadius: 3,
    '& + &': {
      marginLeft: 5,
    },
  },
  options: {
    position: 'absolute',
    top: '100%',
    left: -1,
    right: -2,
    height: theme.sizes.inputHeight * 5,
    border: `1px solid ${theme.colors.inputBorder}`,
    backgroundColor: theme.colors.inputBg,
    zIndex: 101,
    overflowY: 'scroll',
  },
  option: {
    padding: '3px 5px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    '&:hover': {
      backgroundColor: lighten(0.05, theme.colors.inputBorder),
    },
  },
  isChecked: {
    backgroundColor: theme.colors.fill,
    '&:hover': {
      backgroundColor: darken(0.03, theme.colors.fill),
    },
  },
  sign: {
    color: darken(0.05, theme.colors.inputBorder),
  },
  overlay: {
    ...overlay(),
  },
}))(MultiSelect))
