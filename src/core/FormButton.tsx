import React from 'react'
import DefaultButton from '../default/DefaultButton'
import withSubmit from './withSubmit'
import Loader from '../default/Loader'
import { fieldsData, submit } from '../typings'


/**
 * A button component to handle form actions, like submit or reset.
 */
const FormButton = ({
  onClick,
  component,
  reset,
  loading,
  loadingComponent,
  children,
  submit,
  ...otherProps
}: FormButtonProps) => {
  const Component = component || DefaultButton
  const LoadingComponent = loadingComponent || Loader
  return (
    <Component
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => submit && submit(e, onClick, reset)}
      disabled={loading}
      {...otherProps}
    >
      {loading && <><LoadingComponent />&nbsp;</>}
      {children}
    </Component>
  )
}

export interface FormButtonProps {
  onClick: (fieldsData: fieldsData) => void,
  component?: React.ComponentType,
  loading?: boolean,
  loadingComponent?: React.ComponentType,
  reset?: boolean,
  suppressErrorMessage?: boolean,
  children: React.ReactNode,
  submit?: submit,
}

export default withSubmit(FormButton)
