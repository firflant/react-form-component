import Form from './core/Form'
export default Form

export { FormConsumer } from './core/Form'
export { default as FormThemeProvider } from './core/FormThemeProvider'
export {
  processField,
  initiateFormFields,
  updateFieldsRequirements,
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

export { default as withFormControl } from './default/FormControl'
export { default as FormActions } from './default/FormActions'
export { default as FormButton } from './default/FormButton'
export { default as DefaultButton } from './default/DefaultButton'
export { default as FormRow } from './default/FormRow'

export { default as Checkbox, checkboxTheme } from './default/Checkbox'
export { default as Checkboxes } from './default/Checkboxes'
export { default as ImageSelect } from './default/ImageSelect'
export { default as ImageUpload } from './default/ImageUpload'
export { default as MultiImageUpload } from './default/MultiImageUpload'
export { default as Input } from './default/Input'
export { default as MultiFormInput } from './default/MultiFormInput'
export { default as MultiSelect } from './default/MultiSelect'
export { default as Radio } from './default/Radio'
export { default as Slider } from './default/Slider'
export { default as Select, selectTheme } from './default/Select'
export { default as Switch, switchTheme } from './default/Switch'
export { default as Switches } from './default/Switches'
export { default as TextArea } from './default/TextArea'
