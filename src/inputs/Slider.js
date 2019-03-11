import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import withFormControl from '../FormControl'
import theme from '../theme'


const Slider = ({
  name,
  value,
  required,
  setValue,
  min,
  max,
  step,
  unit,
  classes,
}) =>
  <div>
    <input
      className={classes.input}
      type='range'
      name={name}
      value={value || 0}
      min={min}
      max={max}
      onChange={e => setValue(name, Math.floor(e.target.value / step) * step, required)}
    />
    <div className={classes.value}>
      {value || '0'}{unit && ` ${unit}`}
    </div>
  </div>

Slider.defaultProps = {
  max: 300,
  step: 1,
}

Slider.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  unit: PropTypes.string,
}

export default withFormControl(withStyles({
  input: {
    padding: 0,
    '-webkit-appearance': 'none',
    display: 'flex',
    width: '100%',
    cursor: 'pointer',
    height: theme.formItemHeight,
    marginBottom: -5,
    backgroundColor: 'transparent',
    '&:focus': {
      outline: 'none',
    },
    '&::-webkit-slider-runnable-track': {
      backgroundColor: theme.formItemBorderColor,
      boxShadow: '0 0 60px 15px white',
      height: 6,
    },
    '&::-webkit-slider-thumb': {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginTop: -3,
      backgroundColor: theme.brandPrimary,
      border: 'none',
      '-webkit-appearance': 'none',
    },
  },
  value: {
    color: theme.formItemColor,
    fontSize: 13,
    textAlign: 'right',
    whiteSpace: 'nowrap',
    position: 'absolute',
    top: -3,
    right: 0,
  },
})(Slider))
