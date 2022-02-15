import validator from 'validator'
import {
  value,
  checkboxValue,
  fieldsData,
  textLabels,
  customValidationFunction,
} from '../typings'


/**
 * Process data from given field and prepare it for a form mutation.
 */
export function processField(
  name: string,
  value: value,
  required: boolean,
  options: {
    type?: string,
    min?: number,
    forcedErrorMessage?: string,
  } = {},
  textLabels: textLabels,
  customValidationFunction: customValidationFunction,
) {
  const { type, min, forcedErrorMessage } = options

  // If the value is an array, remove its empty values for safety.
  const valueIsArray = Array.isArray(value)
  const processedValue = valueIsArray
    ? value.filter(item => Number.isInteger(item) || item instanceof Object || item.length)
    : value

  let validation = null; let help = null

  // VALIDATION - If any check will fail, raise error state and set help message.
  if (required && (!processedValue || (valueIsArray && processedValue.length === 0))) {
    // If the field is required and its value is empty, set an error. Otherwise
    // continue the validation.
    validation = 'error'
    help = textLabels.requiredField
  } else if (processedValue?.length && processedValue.length > 0) {

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
          help = textLabels.minChars.replace(':length:', min.toString())
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
 * Generate initial form state, where all values are undefined.
 */
export function initiateFormFields(fieldNames: [string], required?: [string]) {
  let valueUndefined: undefined
  // valueUndefined is a flag saying that field is in initial state, untouch.
  // It becomes defined after first change. This logic is used by the onChange Form prop.
  // TODO: Consider adding additional property called `untouch`.
  return fieldNames.reduce((acc: object, field: string) => (
    { ...acc,
      [field]: {
        value: valueUndefined,
        validation: null,
        required: required && required.includes(field),
        help: null,
      } }
  ), {})
}


/**
 * Reset valdiation states of all fields in a form.
 */
export function updateFieldsRequirements(fieldsData: fieldsData, required: [string] | undefined) {
  let updatedFieldsData: object = {}
  Object.keys(fieldsData).forEach(key => {
    const { value, help } = fieldsData[key]
    const isRequired = required && required.includes(key)
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
export function checkboxHandler(
  checked: boolean,
  newValue: checkboxValue,
  previousValues: [checkboxValue],
) {
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
export function formIsInvalid(fieldsData: fieldsData, fieldKeys = []) {
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
export function getValues(fieldsData: fieldsData) {
  let values: object = {}
  Object.keys(fieldsData).forEach(key => {
    values[key] = fieldsData[key].value
  })
  return values
}


/**
 * Convert image url to image data format that is compatible with image upload
 * input.
 */
export function imageUrltoImageData(imageUrl: string) {
  if (imageUrl) {
    return {
      name: imageUrl.split('/').pop(),
      data: imageUrl,
      type: 'image',
    }
  }
  return null
}
