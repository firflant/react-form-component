import React from 'react'
import PropTypes from 'prop-types'
import withFormControl from './FormControl'

const Range = ({
  name,
  value,
  required,
  setValue,
  min,
  max,
  step,
  unit,
}) =>
  <div>
    <input
      className='form__range-input'
      type='range'
      name={name}
      value={value || 0}
      min={min}
      max={max}
      onChange={e => setValue(name, Math.floor(e.target.value / step) * step, required)}
    />
    <div className='form__range-value'>
      {value || '0'}{unit && ` ${unit}`}
    </div>
  </div>

Range.defaultProps = {
  max: 300,
  step: 1,
}

Range.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  unit: PropTypes.string,
}

export default withFormControl(Range)
