export default {
  sizes: {
    inputHeight: 40,
    inputWidth: '100%',
    inputGutterBottom: 30,
    inputSidePaddings: 10,
    labelGutterBottom: 10,
    narrowInputWidth: 140,
    inlineLabelWidth: 130,
    borderRadius: 0,
    borderWidth: 2,
    rowGutter: 50,
    formActionsDistance: 60,
    onlyBottomBorder: false,
    largeInputExtraHeight: 10,
    prefixExtraSpacing: 20,
  },

  colors: {
    accent: '#1565c0',
    inputText: '#3d4348',
    inputBorder: '#e6edf4',
    inputBg: 'white',
    inputFocusShadow: 'none',
    label: 'inherit',
    fill: '#e6edf4',
    placeholder: '#c3d4e4',
    success: '#00a651',
    error: '#e50038',
  },

  typography: {
    inputFontSize: 16,
    inputFontWeight: 'normal',
    labelFontSize: 14,
    labelFontWeight: 'normal',
    helpFontSize: 12,
  },

  breakpoints: {
    xs: 0, // Extra small screen / phone
    sm: '768px', // Small screen / tablet
    md: '1000px', // Medium screen / desktop
    lg: '1400px', // Large screen / wide desktop
  },

  textLabels: {
    formInvalid: 'The form is incomplete or contains errors.',
    mandatoryField: 'This field is required.',
    minChars: 'Minimum :length: characters required.',
    passwordInvalid: 'Password must be at least 6 characters long.',
    emailInvalid: 'Please enter a valid email address.',
    urlInvalid: 'Please enter a valid URL.',
    phoneInvalid: 'Please enter a valid phone number.',
    postCodeInvalid: 'Please enter a valid postal code.',
    fieldgroupInvalid: 'Some rows are not filled in correctly.',
    addMore: 'Add More',
    upload: 'Upload',
    delete: 'Delete',
  },

  toastContainerProps: {
    hideProgressBar: true,
    autoClose: 5000,
  },
}
