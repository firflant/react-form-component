import Form from './core/Form'
export default Form
export { FieldsContext, SetValueContext } from './core/Form'
export { default as FormThemeProvider } from './core/FormThemeProvider'
export {
  processField,
  initiateFormFields,
  updateFieldsRequirements,
  parseOption,
  checkboxHandler,
  formIsInvalid,
  getValues,
  imageUrltoImageData,
} from './core/helpers'
export {
  inputHeight,
  breakpoint,
  clearfix,
  overlay,
  maxRows,
  placeholder,
} from './core/themeHelpers'
export { default as useSubmit } from './core/useSubmit'
export { default as useControlLogic } from './core/useControlLogic'

export { default as withFormControl } from './default/withFormControl'
export { default as FormControl } from './default/FormControl'
export { default as defautTheme } from './core/theme'
export { default as FormActions } from './default/FormActions'
export { default as FormButton } from './default/FormButton'
export { default as Row } from './default/Row'
export { default as Compound } from './default/Compound'

export { default as Checkbox, useCheckboxStyles } from './default/Checkbox'
export { default as Checkboxes } from './default/Checkboxes'
export { default as ImageSelect } from './default/ImageSelect'
export { default as ImageUpload } from './default/ImageUpload'
export { default as MultiImageUpload } from './default/MultiImageUpload'
export { default as Input } from './default/Input'
export { default as FieldGroup } from './default/FieldGroup'
export { default as Fieldgroup } from './default/FieldGroup' // Legacy
export { default as MultiSelect } from './default/MultiSelect'
export { default as Radio } from './default/Radio'
export { default as Slider } from './default/Slider'
export { default as Select, useSelectStyles } from './default/Select'
export { default as Switch, useSwitchStyles } from './default/Switch'
export { default as Switches } from './default/Switches'
export { default as TextArea } from './default/TextArea'
export { default as Loader } from './default/Loader'
