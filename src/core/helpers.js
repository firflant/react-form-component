import validator from 'validator'


/**
 * Process data from given field and prepare it for a form mutation.
 */
export function processField(
  name,
  value,
  required,
  options = {},
  textLabels = {},
  customValidationFunction
) {
  const { type, min, forcedErrorMessage } = options

  // If the value is an array, remove its empty values for safety.
  const processedValue = Array.isArray(value)
    ? value.filter(item => Number.isInteger(item) || item instanceof Object || item.length)
    : value

  let validation = null; let help = null

  // VALIDATION - If any check will fail, raise error state and set help message.
  if (required && (!processedValue || processedValue.length === 0)) {
    // If the field is required and its value is empty, set an error. Otherwise
    // continue the validation.
    validation = 'error'
    help = textLabels.requiredField
  } else if (processedValue && processedValue.length > 0) {

    // Force error message if it is present and abandon further validation.
    if (forcedErrorMessage) {
      return {
        [name]: {
          value: processedValue,
          validation: 'error',
          required,
          help: forcedErrorMessage,
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

      case 'json':
        try {
          JSON.parse(value)
        } catch (e) {
          validation = 'error'
          help = textLabels.jsonInvalid
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
        if (min && processedValue.length < min) {
          validation = 'error'
          help = textLabels.minChars.replace(':length:', min)
        }
        break
    }
  }

  // If there is no error and value is not empty, indicate success state.
  if (validation !== 'error' && ((processedValue && processedValue.length > 0) ||
  (typeof value === 'object' && !Array.isArray(value)))) {
    validation = 'success'
  }

  return {
    [name]: {
      value: processedValue,
      validation,
      required,
      help,
    },
  }
}


/**
 * Generate initial form state, where all values are set to null.
 */
export function initiateFormFields(fieldNames = [], required = []) {
  let valueUndefined
  // Value undefined acts as a flag saying that field is only initiated, untouch.
  // It becomes defined after first change. It is being used by the onChange Form prop.
  // TODO: Consider adding additional property called `untouch`.
  return fieldNames.reduce((acc, field) => (
    { ...acc,
      [field]: {
        value: valueUndefined,
        validation: null,
        required: required.includes(field),
        help: null,
      } }
  ), {})
}


/**
 * Reset valdiation states of all fields in a form.
 */
export function updateFieldsRequirements(fieldsData, required) {
  let updatedFieldsData = {}
  Object.keys(fieldsData).forEach(key => {
    const { value, help } = fieldsData[key]
    const isRequired = required.includes(key)
    updatedFieldsData[key] = {
      value,
      // If the field is not on required anymore, validation must be cleaned up.
      validation: (fieldsData[key].validation === 'error' && !isRequired) ? null : fieldsData[key].validation,
      help,
      required: isRequired,
    }
  })
  return updatedFieldsData
}


/**
 * Update single checkbox value in a list of all checkboxes.
 */
export function checkboxHandler(checked, value, previousValue) {
  if (checked) {
    if (previousValue) {
      return [...previousValue, value]
    }
    return [value]
  }
  return previousValue.filter(item => item !== value)
}


/**
 * Check whether whole form is filled correctly.
 */
export function formIsInvalid(fieldsData, fieldKeys = []) {
  // Check only fields of given keys, otherwise check whole form.
  const fieldsToCheck = fieldKeys.length ? fieldKeys : Object.keys(fieldsData)
  let requiredButEmpty = false
  let hasAnyError = false

  fieldsToCheck.forEach(key => {
    const { value, validation, required } = fieldsData[key]
    if (required && (
      typeof value === 'undefined' ||
      (typeof value === 'string' && value === '') ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' && !Array.isArray(value) && (value === null || !Object.keys(value).length))
    )) {
      requiredButEmpty = true
    }
    if (validation === 'error') {
      hasAnyError = true
    }
  })

  return requiredButEmpty || hasAnyError
}


/**
 * Get values from all fields and organize them into API friendly format.
 */
export function getValues(fieldsData) {
  let values = {}
  Object.keys(fieldsData).forEach(key => {
    values[key] = fieldsData[key].value
  })
  return values
}


/**
 * Convert image url to image data format that is compatible with image upload
 * input.
 */
export function imageUrltoImageData(imageUrl) {
  if (imageUrl) {
    return {
      name: imageUrl.split('/').pop(),
      data: imageUrl,
      type: 'image',
    }
  }
  return null
}
