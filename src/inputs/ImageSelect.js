import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import { lighten } from 'polished'
import withFormControl from '../FormControl'
import { checkboxHandler } from '../helpers'


const ImageSelect = ({
  name,
  value,
  required,
  setValue,
  options,
  multiple,
  classes,
}) =>
  <div className={classes.ImageSelect}>
    {options.map((option, index) => {
      const optionLabel = option.label ? option.label : option.value
      const checked = (value && multiple ? value.includes(option.value) : value === option.value)
      return (
        <div
          key={index}
          className={classNames(classes.input, 'form-checkitem', { [classes.isChecked]: checked })}
          onClick={() => {
            const finalValue = multiple ? checkboxHandler(!checked, option.value, value) : option.value
            setValue(name, finalValue, required)
          }}>
          <img className={classes.image} src={option.image} />
          {optionLabel}
        </div>
      )
    })}
  </div>

ImageSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  multiple: PropTypes.bool,
}

export default withFormControl(withStyles(theme => ({
  ImageSelect: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flex: '65px 0 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 9,
    lineHeight: 'normal',
    marginTop: 5,
    marginBottom: 10,
    padding: '0 1px',
    color: theme.colors.inputText,
    cursor: 'pointer',
    position: 'relative',
    zIndex: 1,
  },
  image: {
    marginBottom: 12,
  },
  isChecked: {
    '&:before': {
      content: '""',
      position: 'absolute',
      top: -5,
      right: 1,
      bottom: -5,
      left: 1,
      backgroundColor: lighten(0.6, theme.colors.accent),
      border: `1px solid ${theme.colors.accent}`,
      borderRadius: theme.sizes.borderRadius,
      zIndex: -1,
    },
  },
}))(ImageSelect))
