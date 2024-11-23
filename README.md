Create React forms just with a pure JSX code and let the react-form-component
manage its state for you. A themeable form library based on Context API, with a
selection of user friendly inputs and wide customization abilities to match your
design and functionality.

## [Docs and examples](https://firflant.github.io/react-form-component)

![Screenshot](https://raw.githubusercontent.com/firflant/react-form-component/master/screenshot.jpg "Screenshot")


## Quick start

### Install

```
yarn add react-form-component
```

### Use

1. Wrap entitre app into `<FormThemeProvider>`. Optionally define a [custom theme](https://github.com/firflant/react-form-component/wiki/Theming) in theme prop.
2. Use `<Form>` component anywhere in the app, declare all field names in a `fields` prop.
3. Use any from built-in [input widgets](https://github.com/firflant/react-form-component/wiki/Components) or [build custom inputs](https://github.com/firflant/react-form-component/wiki/Advanced-usage#creating-custom-inputs) to compose a form. Give each input a `name` prop that corresponds with one defined in a `fields` prop of the ancestor `<Form>` component.
4. Use `<FormButton>` to trigger a submit function that returns all values formatted in a form of a simple javascript object.

```jsx
// App.js
// Wrap entitre app into a FormThemeProvider.
import React from 'react'
import ReactDOM from 'react-dom'
import { FormThemeProvider } from 'react-form-component'
import BasicExampleForm from './BasicExampleForm'

const App = () =>
  <FormThemeProvider>
    <BasicExampleForm />
  </FormThemeProvider>

ReactDOM.render(<App />, document.querySelector('#app'))


// BasicExampleForm.js
// Create a fully operational form.
import React from 'react'
import ReactDOM from 'react-dom'
import Form, {
  Input,
  Select,
  FormButton,
} from 'react-form-component'

const BasicExampleForm = () =>
  <Form fields={['name', 'email', 'type']}>
    <Input
      name='name'
      label='User name'
    />
    <Input
      name='email'
      type='email'
      label='E-mail'
    />
    <Select
      name='type'
      label='Type of a user'
      options={['Viewer', 'Moderator', 'Admin']}
    />
    <FormButton
      onClick={fields => console.log(fields)}
    >Save</FormButton>
  </Form>

export default BasicExampleForm
```

## Features

* Built in form state management
* Wide range of UI form components
* Handles validation, success states, error state and error messages
* Customizable theme and notification labels
* Marking mandatory fields
* *Loading* state support for asynchronous operations
* Various ways for triggering submit action.
* Optional reseting of all fields after a successful submit ([show docs](https://github.com/firflant/react-form-component/wiki/Components#FormButton))
* Values from all fields formatted as one object, well formatted for API calls
* Suppports nested structure of a form (Field groups)
* Built in, repleacable react-toastify notification plugin
* Cross-browser tested
* SSR support
* Easy way of custom inputs creation
