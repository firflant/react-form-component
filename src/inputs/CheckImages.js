import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'react-jss'
import classNames from 'classnames'
import withFormControl from '../FormControl'
import { checkboxHandler } from '../helpers'
import theme from '../theme'


const CheckImages = ({
  name,
  value,
  required,
  setValue,
  options,
  multiple,
  classes,
}) =>
  <div className={classes.checkImages}>
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

CheckImages.propTypes = {
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

export default withFormControl(withStyles({
  checkImages: {
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
    fontWeight: theme.regular,
    lineHeight: 'normal',
    marginTop: 5,
    marginBottom: 10,
    padding: '0 1px',
    color: theme.formItemColor,
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
      backgroundColor: theme.formItemBorderColor,
      borderRadius: 6,
      border: `1px dashed ${theme.formItemColor}`,
      zIndex: -1,
    },
  },
})(CheckImages))
