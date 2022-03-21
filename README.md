Create React forms just with a pure JSX code and let the react-form-component
manage its state for you. A themeable form library based on Context API, with a
selection of user friendly inputs and wide customization abilities to match your
design and functionality.

>This package is a continuation of [react-standalone-form](https://www.npmjs.com/package/react-standalone-form),
which in version 1.x had a different name.

## Install

```
yarn add react-form-component
```

## Demo

![Screenshot](https://raw.githubusercontent.com/firflant/react-form-component/master/screenshot.jpg "Screenshot")

[![See working example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-form-component-advanced-example-24uz22?fontsize=14&hidenavigation=1&theme=dark)

## Quick start example

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
* Built in, customizable form validation system
* Customizable theme and notification labels
* Marking fields as required
* *Loading* state support for asynchronous operations
* Submit action triggered by a submit button or on each change with debounce
* Optional reseting of all fields after a successful submit ([show docs](https://github.com/firflant/react-form-component/wiki/Components#FormButton))
* Data collected from forms is formatted well for API calls
* Nested forms (possibility to put a form as a multiple fieldset of anorher form)
* Built in, repleacable react-toastify notification plugin
* Cross browser tested
* SSR support
* Easy way of creating custom inputs


## Docs

* [Components API](https://github.com/firflant/react-form-component/wiki/Components)
* [Form layouts](https://github.com/firflant/react-form-component/wiki/Form-layouts)
* [Theming](https://github.com/firflant/react-form-component/wiki/Theming)
* [Advanced usage](https://github.com/firflant/react-form-component/wiki/Advanced-usage)
* [Contribution guidelines](https://github.com/firflant/react-form-component/wiki/Contribution-guidelines)
