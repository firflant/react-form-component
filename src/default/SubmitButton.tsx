import React from 'react'
import { Button, useSubmit  } from '../.'
import { fieldsData } from '../typings'


/**
 * A button component to trigger form submit action. Cane also uti or reset.
 */
const SubmitButton = ({
  onClick = () => {},
  reset,
  loading,
  suppressErrorMessage,
  children,
}: SubmitButtonProps) => {
  const submit = useSubmit(suppressErrorMessage)
  return (
    <Button
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => submit(e, onClick, reset)}
      loading={loading}
    >
      {children}
    </Button>
  )
}

export interface SubmitButtonProps {
  /**
   * Submit function. It triggers validation of a whole form and collects all values into one _fieldsData_ object.
   */
  onClick?: (fieldsData: fieldsData) => void,
  /**
   * Turns on the loading state for async operations.
   */
  loading?: boolean,
  /**
   * Cleans up all inputs on click, if validation was successfull.
   */
  reset?: boolean,
  /**
   * Disables default notification when form is not filled correctly
   */
  suppressErrorMessage?: boolean,
  children: React.ReactNode,
}

export default SubmitButton
