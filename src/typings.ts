export type setValue = (
  name?: string,
  value?: string | number | object,
  required?: boolean | undefined,
  options?: object,
) => void

export type value = any

export type checkboxValue = boolean | string

export type validation = 'error' | 'success' | null

export type fieldData = {
  value: value,
  required: boolean,
  help: string,
  validation: validation,
  type?: string,
}

export type fieldsData = {} | {
  [key: string]: fieldData,
}

export type submit = (
  e:React.MouseEvent<HTMLButtonElement>,
  onClick: (fieldsData: fieldsData) => void,
  reset: boolean | undefined,
) => void

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

export type errorNotificationFunc = (message: string) => void

export type customValidationFunction = (value: value, type: string) => boolean

export interface fullTheme {
  sizes: {
    inputHeight: number,
    inputWidth: number | string,
    inputGutterBottom: number,
    inputSidePaddings: number,
    labelGutterBottom: number,
    narrowInputWidth: number,
    inlineLabelWidth: number,
    borderRadius: number,
    borderWidth: number,
    formRowGutter: number,
    formActionsDistance: number,
    onlyBottomBorder: boolean,
    moveAddonToLeft: boolean,
    addonSpacing: number,
  },
  colors: {
    accent: string,
    inputText: string,
    inputBorder: string,
    inputBg: string,
    inputFocusShadow: string,
    label: string,
    fill: string,
    placeholder: string,
    success: string,
    error: string,
  },
  typography: {
    inputFontSize: number,
    inputFontWeight: string,
    labelFontSize: number,
    labelFontWeight: string,
    helpFontSize: number,
  },
  breakpoints: {
    xs: number | string,
    sm: string,
    md: string,
    lg: string,
  },
  textLabels: textLabels,
  toastContainerProps: object,
  errorNotificationFunc: errorNotificationFunc,
  customValidationFunction: customValidationFunction,
}

export interface themeOverrides {
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
  textLabels?: {
    formInvalid?: string,
    requiredField?:string,
    minChars?: string,
    passwordInvalid?: string,
    emailInvalid?: string,
    urlInvalid?: string,
    phoneInvalid?: string,
    postCodeInvalid?: string,
    jsonInvalid?: string,
  },
  toastContainerProps?: object,
  errorNotificationFunc?: errorNotificationFunc,
  customValidationFunction?: customValidationFunction,
}
