import Form from './core/Form'
export default Form
export { FieldsContext, SetValueContext } from './core/Form'
export { default as FormThemeProvider } from './core/FormThemeProvider'
export {
  processField,
  initiateFormFields,
  updateMandatory,
  parseOption,
  checkboxHandler,
  formHasErrors,
  getValues,
  imageUrltoImageData,
} from './core/utils'
export {
  inputHeight,
  breakpoint,
  clearfix,
  overlay,
  maxRows,
  placeholder,
  calculateInputTranslation,
} from './core/themeHelpers'
export { default as useSubmit } from './core/useSubmit'
export { default as useControlLogic } from './core/useControlLogic'

export { default as withFormControl } from './default/withFormControl'
export { default as FormControl } from './default/FormControl'
export { default as defautTheme } from './core/theme'
export { default as FormActions } from './default/FormActions'
export { default as Button } from './default/Button'
export { default as SubmitButton } from './default/SubmitButton'
export { default as FormButton } from './default/SubmitButton' // Legacy
export { default as Row } from './default/Row'
export { default as Compound } from './default/Compound'

export { default as Checkbox, useCheckboxStyles } from './default/Checkbox'
export { default as CheckboxList } from './default/CheckboxList'
export { default as Checkboxes } from './default/CheckboxList' // Legacy
export { default as ImageSelect } from './default/ImageSelect'
export { default as ImageUpload } from './default/ImageUpload'
export { default as Input } from './default/Input'
export { default as FieldGroup } from './default/FieldGroup'
export { default as Fieldgroup } from './default/FieldGroup' // Legacy
export { default as GalleryUpload } from './default/GalleryUpload'
export { default as MultiImageUpload } from './default/GalleryUpload' // Legacy
export { default as MultiSelect } from './default/MultiSelect'
export { default as Radio } from './default/Radio'
export { default as Slider } from './default/Slider'
export { default as Select, useSelectStyles } from './default/Select'
export { default as Switch, useSwitchStyles } from './default/Switch'
export { default as SwitchList } from './default/SwitchList'
export { default as Switches } from './default/SwitchList' // Legacy
export { default as TextArea } from './default/TextArea'
export { default as Loader } from './default/Loader'

export * from './typings'
