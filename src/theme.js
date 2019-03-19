export default {
  sizes: {
    inputHeight: 40,
    inputWidth: '100%',
    inputGutterBottom: 30,
    narrowInputWidth: 140,
    inlineLabelWidth: 130,
    borderRadius: 0,
  },

  colors: {
    accent: '#1fc59c',
    inputText: '#3d4348',
    inputBorder: '#e6edf4',
    inputBg: 'white',
    success: '#00a651',
    error: '#e50038',
  },

  typography: {
    inputFontSize: 16,
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
    formInvalid: 'Form contains errors. Check all fields.',
    requiredField: 'This field is required.',
    minChars: 'This field should have at least :length: characters.',
    passwordInvalid: 'Password should be at least 6 characters long.',
    emailInvalid: 'This is not a valid email address.',
    urlInvalid: 'This is not a valid URL.',
    phoneInvalid: 'This is not a valid phone number.',
    postCodeInvalid: 'This is not a valid postal code.',
    jsonInvalid: 'Enter a valid JSON.',
  },
}
