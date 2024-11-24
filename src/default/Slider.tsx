import React from 'react'
import { createUseStyles } from 'react-jss'
import { withFormControl } from '../.'
import {
  type value,
  type setValue,
  type fullTheme,
} from '../typings'


/**
 * A range input where user chooses a value by moving a dot on a trail.
 */
const Slider = ({
  name,
  value,
  mandatory,
  setValue,
  min = 0,
  max = 300,
  step = 1,
  unit,
}: SliderProps) => {
  const classes = useStyles()
  return (
    <div>
      <input
        className={classes.input}
        type='range'
        name={name}
        value={value || 0}
        min={min}
        max={max}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const newVal = Math.floor(parseInt(e.target.value) / step)
          setValue(name, newVal * step, mandatory, { touched: true })
        }}
      />
      <div className={classes.value}>
        {value || '0'}{unit && ` ${unit}`}
      </div>
    </div>
  )
}

export interface SliderProps {
  name: string,
  value: value,
  mandatory: boolean,
  setValue: setValue,
  min?: number,
  max?: number,
  step?: number,
  unit?: string,
}

const useStyles = createUseStyles((theme: fullTheme) => ({
  input: {
    padding: 0,
    '-webkit-appearance': 'none',
    display: 'flex',
    width: '100%',
    cursor: 'pointer',
    height: theme.sizes.inputHeight,
    margin: 0,
    backgroundColor: 'transparent',
    '&:focus': {
      outline: 'none',
    },
    '&::-webkit-slider-runnable-track': {
      backgroundColor: theme.colors.inputBorder,
      boxShadow: '0 0 60px 15px white',
      height: 4,
    },
    '&::-webkit-slider-thumb': {
      width: 16,
      height: 16,
      borderRadius: 8,
      marginTop: -6,
      backgroundColor: theme.colors.accent,
      border: 'none',
      '-webkit-appearance': 'none',
    },
  },
  value: {
    color: theme.colors.inputText,
    fontSize: 13,
    textAlign: 'right',
    whiteSpace: 'nowrap',
    position: 'absolute',
    top: -3,
    ...(theme.typography.direction === 'rtl'
      ? { left: 0 }
      : { right: 0 }
    ),
  },
}))

export default withFormControl(Slider)
