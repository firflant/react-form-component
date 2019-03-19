import validator from 'validator'


/**
 * Process the data from given field and prepare it for form mutation.
 * @param {object} fieldsData Object that contains data of all fields
 * @param {string} name Unique identifier of the field
 * @param {string|number|array|object} value Value received from the field
 * @param {string} type Type of the field that defines a method of validation
 */
export function processField(name, value, required, type, textLabels = {}) {
  // If the value is an array, remove its empty values for safety.
  const processedValue = Array.isArray(value)
    ? value.filter(item => Number.isInteger(item) || item instanceof Object || item.length)
    : value

  let validation; let help = null

  // VALIDATION - If check will fail, set an error state and help message.
  if (required && (!processedValue || processedValue.length === 0)) {
    // If the field is required and its value is empty, set an error. Otherwise
    // continue the validation.
    validation = 'error'
    help = textLabels.requiredField
  } else if (processedValue && processedValue.length > 0) {
    switch (type) {
      case 'text':
        // Text should be longer than 3 chars.
        if (processedValue.length < 5) {
          validation = 'error'
          help = textLabels.min5Chars
        }
        break
      case 'name':
        // No special rule for name input.
        break
      case 'password':
        // Password should be at least 6 characters long.
        if (processedValue.length < 6) {
          validation = 'error'
          help = textLabels.passwordInvalid
        }
        break
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

      case 'textarea':
        // Text should be longer than 15 chars.
        if (processedValue.length < 15) {
          validation = 'error'
          help = textLabels.longTextInvalid
        }
        break
      case 'wysiwyg':
        // Text should be longer than 15 chars.
        if (processedValue.length < 15) {
          validation = 'error'
          help = textLabels.longTextInvalid
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
      case 'number':
        // TODO: Should we check anything there?
        break
      case 'array':
        // TODO: If any item is mentioned twice, set validation error.
        break
      case 'object':
        // TODO: Check whether it is really a javascript object.
        break
      default:
        break
    }
  }

  // If there is no error and value is not empty, we can talk about success.
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
 * Returns a form object with initial null values from provided field names.
 * @param {array} fields List of all field names
 * @param {array} required List of names of all required fields
 */
export function initiateFormFields(fields = [], required = []) {
  return fields.reduce((acc, field) => (
    { ...acc,
      [field]: {
        value: null,
        validation: null,
        required: required.includes(field),
        help: null,
      } }
  ), {})
}


/**
 * Resets valdiation states and values of all fields in a form.
 * @param {object} fieldsData Object that contains data of all fields
 * @param {array} required List of names of all required fields
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
 * Handler for checkbox values from the same list.
 * @param {bool} checked
 * @param {string} value
 * @param {string} previousValue
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
 * Checks whether the whole form is valid or not.
 * @param {object} fieldsData Object that contains data of all fields
 * @param {array} fieldKeys fields to check against. Otherwise it checks whole form.
 */
export function formIsInvalid(fieldsData, fieldKeys = []) {
  const fieldsToCheck = fieldKeys.length ? fieldKeys : Object.keys(fieldsData)
  let requiredButEmpty = false
  let hasAnyError = false

  fieldsToCheck.forEach(key => {
    const { value, validation, required } = fieldsData[key]
    if (required && !((!Array.isArray(value) && value) || (Array.isArray(value) && value.length))) {
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
 * @param {object} fieldsData Object that contains data of all fields
 */
export function getValues(fieldsData) {
  let values = {}
  Object.keys(fieldsData).forEach(key => {
    values[key] = fieldsData[key].value
  })
  return values
}

/**
 * Converts the image url to image data object that is suitable for prepopulating
 * the image upload field with existing data.
 * @param {string} imageUrl Url of image
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
