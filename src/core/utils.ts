import validator from 'validator'
import {
  type value,
  type checkboxValue,
  type fieldsData,
  type textLabels,
  type customValidationFunction,
  type option,
  type parsedOption,
} from '../typings'


/**
 * Process data from given field and prepare it for a form mutation.
 */
export const processField = (
  name: string,
  value: value,
  mandatory: boolean,
  options: {
    touched?: boolean, // Override touched flag
    type?: string, // Type of input for validation
    min?: number, // Minimal acceptable lenght of input
    forceErrorMessage?: string | false, // Skip validation and rise error with given message
  } = {},
  textLabels: textLabels,
  customValidationFunction: customValidationFunction,
): fieldsData => {
  const { type, min, forceErrorMessage, touched = false } = options

  // If the value is an array, remove its empty values for safety.
  const valueIsArray = Array.isArray(value)
  const safeValue = valueIsArray
    ? value.filter(item => Number.isInteger(item) || item instanceof Object || item.length)
    : value

  const valueIsEmpty = !safeValue || (valueIsArray && safeValue.length === 0)

  // Vintage, mutable javascript ;)
  let validation = null; let help = null

  // VALIDATION - If any check will fail, raise error state and set help message.
  if (mandatory && valueIsEmpty) {
    // If the field is mandatory and its value is empty, set an error. Otherwise
    // continue the validation.
    validation = 'error'
    help = textLabels.mandatoryField
  } else if (safeValue?.length && safeValue.length > 0) {

    // Force error message if it is present and abandon further validation.
    if (forceErrorMessage) {
      return {
        [name]: {
          value: safeValue,
          touched: true,
          validation: 'error',
          mandatory,
          help: forceErrorMessage,
        },
      }
    }

    switch (type) {
      case 'email':
        if (!validator.isEmail(value)) {
          validation = 'error'
          help = textLabels.emailInvalid
        }
        break

      case 'url':
        if (!validator.isURL(value)) {
          validation = 'error'
          help = textLabels.urlInvalid
        }
        break

      case 'tel':
        if (!value.match(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/g)) {
          validation = 'error'
          help = textLabels.phoneInvalid
        }
        break

      case 'postcode':
        if (!validator.isPostalCode(value, 'DE')) {
          validation = 'error'
          help = textLabels.postCodeInvalid
        }
        break

      default:
        // Handle custom validation function.
        if (type && customValidationFunction) {
          const error = customValidationFunction(value, type)
          if (error) {
            validation = 'error'
            help = error
            // TODO: Multilanguage support for error message.
          }
        }

        // Minimal length option support.
        if (min && safeValue.length < min) {
          validation = 'error'
          help = textLabels.minChars.replace(':length:', min.toString())
        }
        break
    }
  }

  // If there is no error, value is not empty, and field state was touched,
  // indicate the success state.
  if (validation !== 'error' && (!valueIsEmpty ||
  (typeof value === 'object' && !Array.isArray(value))) && touched) {
    validation = 'success'
  }

  return {
    [name]: {
      value: safeValue,
      touched, // Whether the field was touched by user.
      validation,
      mandatory,
      help,
      type,
    },
  } as fieldsData
}


/**
 * Generate initial form state, where all values are undefined.
 */
export const initiateFormFields = (fieldNames: string[], mandatory?: string[]): fieldsData =>
  fieldNames.reduce((acc: object, field: string) => (
    { ...acc,
      [field]: {
        value: undefined,
        touched: false, // Untouched means that user did not interacted with a field yet.
        validation: null,
        mandatory: mandatory && mandatory.includes(field),
        help: null,
      } }
  ), {})

/**
 * Reset valdiation states of all fields in a form.
 */
export const updateMandatory = (
  fieldsData: fieldsData,
  mandatory?: string[],
): fieldsData =>
  Object.entries(fieldsData).reduce((acc, [key, { value, help, validation }]) => {
    const isMandatory = mandatory && mandatory.includes(key)
    return {
      ...acc,
      [key]: {
        value,
        touched: false,
        // If the field is not on mandatory anymore, validation must be cleaned up.
        validation: (validation === 'error' && !isMandatory) ? null : validation,
        mandatory: isMandatory,
        help,
      },
    }
  }, {})

/**
 * Parse option, which can be a string or an object, to return an object.
 */
export const parseOption = (option: option): parsedOption => {
  const optionLabel = (typeof option === 'string') ? option : option.label
  const optionValue = (typeof option === 'string') ? option : option.value
  return { optionLabel, optionValue }
}

/**
 * Update single checkbox value in a list of all checkboxes.
 */
export const checkboxHandler = (
  checked: boolean,
  newValue: checkboxValue,
  previousValues: checkboxValue[],
): checkboxValue[] => {
  if (checked) {
    if (previousValues) {
      return [...previousValues, newValue]
    }
    return [newValue]
  }
  return previousValues.filter(item => item !== newValue)
}


/**
 * Check whether whole form is filled correctly.
 */
export const formHasErrors = (fieldsData: fieldsData): boolean => {
  // Check only fields of given keys, otherwise check whole form.
  let mandatoryButEmpty = false
  let hasAnyError = false

  Object.values(fieldsData).forEach(({ value, validation, mandatory }) => {
    if (mandatory && (
      typeof value === 'undefined' ||
      (typeof value === 'string' && value === '') ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' && !Array.isArray(value) && (value === null || !Object.keys(value).length))
    )) {
      mandatoryButEmpty = true
    }
    if (validation === 'error') {
      hasAnyError = true
    }
  })

  return mandatoryButEmpty || hasAnyError
}


/**
 * Get values from all fields and organize them into API friendly format.
 */
export const getValues = (fieldsData: fieldsData): fieldsData =>
  Object.entries(fieldsData).reduce((acc, [key, { value }]) => ({
    ...acc,
    [key]: value,
  }), {})


/**
 * Convert image url to image data format that is compatible with image upload
 * input.
 */
export const imageUrltoImageData = (imageUrl: string) => {
  if (imageUrl) {
    return {
      name: imageUrl.split('/').pop(),
      data: imageUrl,
      type: 'image',
    }
  }
  return null
}
