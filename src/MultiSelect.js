import React from 'react'
import PropTypes from 'prop-types'
import withFormControl from './FormControl'
import { checkboxHandler } from './helpers'


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
    } = this.props
    return (
      <React.Fragment>
        <div
          className='form__input form__input--multiselect'
          onClick={() => this.setState({ isOpen: true })}
        >{value.length
            ? value.map((item, index) =>
              <span
                key={index}
                className='form__multiselect-value'
              >{(typeof item === 'string') ? item : item.label}</span>
            )
            : 'All'}
        </div>
        {this.state.isOpen &&
          <React.Fragment>
            <div
              className='form__multiselect-overlay'
              onClick={() => this.setState({ isOpen: false })}
            />
            <div className='form__multiselect'>
              {options.map((option, index) => {
                const optionLabel = (typeof option === 'string') ? option : option.label
                const optionValue = (typeof option === 'string') ? option : option.value
                const checked = (value && value.includes(optionValue))
                return <div
                  key={index}
                  className={`form__multiselect-option${checked ? ' is-checked' : ''}`}
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

export default withFormControl(MultiSelect)
