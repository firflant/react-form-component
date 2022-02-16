import React from 'react'
import { FormControl, useControlLogic } from '../.'
import { ControlLogicProps, InputProps } from '../typings'


function withFormControl<T>(
  InputComponent: React.ComponentType<T | InputProps>,
) {
  // eslint-disable-next-line react/display-name
  return (props: ControlLogicProps) => {
    const {
      formControlProps,
      inputProps,
    } = useControlLogic(InputComponent, props)

    return (
      <FormControl { ...formControlProps}>
        <InputComponent {...inputProps} />
      </FormControl>
    )
  }
}

export default withFormControl


