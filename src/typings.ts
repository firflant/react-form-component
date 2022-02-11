export type setValue = (name: string, value: string | number | object, required: boolean | undefined, options?: object) => void

export type value = any

export type checkboxValue = boolean | string

export type fieldsData = object

export type textLabels = {
  formInvalid: string,
  requiredField:string,
  minChars: string,
  passwordInvalid: string,
  emailInvalid: string,
  urlInvalid: string,
  phoneInvalid: string,
  postCodeInvalid: string,
  jsonInvalid: string,
}

export type textLabelsOptional = {
  formInvalid?: string,
  requiredField?:string,
  minChars?: string,
  passwordInvalid?: string,
  emailInvalid?: string,
  urlInvalid?: string,
  phoneInvalid?: string,
  postCodeInvalid?: string,
  jsonInvalid?: string,
}

export type theme = {
  sizes?: {
    inputHeight?: number,
    inputWidth?: number | string,
    inputGutterBottom?: number,
    inputSidePaddings?: number,
    labelGutterBottom?: number,
    narrowInputWidth?: number,
    inlineLabelWidth?: number,
    borderRadius?: number,
    borderWidth?: number,
    formRowGutter?: number,
    formActionsDistance?: number,
    onlyBottomBorder?: boolean,
    moveAddonToLeft?: boolean,
    addonSpacing?: number,
  },
  colors?: {
    accent?: string,
    inputText?: string,
    inputBorder?: string,
    inputBg?: string,
    inputFocusShadow?: string,
    label?: string,
    fill?: string,
    placeholder?: string,
    success?: string,
    error?: string,
  },
  typography?: {
    inputFontSize?: number,
    inputFontWeight?: string,
    labelFontSize?: number,
    labelFontWeight?: string,
    helpFontSize?: number,
  },
  breakpoints?: {
    xs?: number | string,
    sm?: string,
    md?: string,
    lg?: string,
  },
  textLabels?: textLabelsOptional,
  toastContainerProps?: object,
  errorNotificationFunc?: (message: string) => void,
  customValidationFunction?: (value: value, type: string) => boolean,
}
