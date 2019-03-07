import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import withFormControl from './FormControl'
import { checkboxHandler } from './helpers'
import { overlay } from './themeHelpers'
import { selectTheme } from './Select'
import theme from './theme'


class MultiSelect extends React.Component {
  state = {
    isOpen: false,
  }
  render() {
    const {
      name,
      value,
      required,
      setValue,
      options,
      classes,
    } = this.props
    return (
      <React.Fragment>
        <div
          className={classNames(classes.select, classes.multiSelect, 'form-input form-select')}
          onClick={() => this.setState({ isOpen: true })}
        >{value.length
            ? value.map((item, index) =>
              <span
                key={index}
                className={classes.value}
              >{(typeof item === 'string') ? item : item.label}</span>
            )
            : 'All'}
        </div>
        {this.state.isOpen &&
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
                >{optionLabel}{checked && <span>✓</span>}</div>
              })}
            </div>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}

MultiSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
  ])),
}

export default withFormControl(withStyles({
  ...selectTheme,
  value: {
    padding: '3px 5px',
    backgroundColor: theme.formItemBorderColor,
    borderRadius: 2,
    '& + &': {
      marginLeft: 5,
    },
  },
  options: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    height: theme.formItemHeight * 5,
    border: `1px solid ${theme.formItemBorderColor}`,
    backgroundColor: 'white',
    zIndex: 101,
    overflowY: 'scroll',
  },
  option: {
    padding: '3px 5px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    '&:hover': {
      backgroundColor: theme.formItemBorderColor,
    },
  },
  isChecked: {
    backgroundColor: theme.formItemBorderColor,
  },
  overlay: {
    ...overlay(),
  },
})(MultiSelect))
