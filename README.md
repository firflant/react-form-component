# react-standalone-form

Create React forms just with a pure JSX and let the react-standalone-form
manage its state for you. A themeable form library based on
Context API with a selection of user friendly inputs and wide customization abilities to match your design and functionality.

## Install

```
yarn add react-standalone-form
```

## Demo

![Screenshot](https://raw.githubusercontent.com/frontcraft/react-standalone-form/master/screenshot.jpg "Screenshot")

[![See working example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/jp69w6kj35?fontsize=14&hidenavigation=1)

## Quick start example

1. Wrap entitre app into `<FormThemeProvider>`. Optionally define a [custom theme](https://github.com/frontcraft/react-standalone-form/wiki/Theming) in theme prop.
2. Use `<Form>` component anywhere in the app, declare all fields in a `fields` prop array.
3. Use any from built-in [input widgets](https://github.com/frontcraft/react-standalone-form/wiki/Components-API) or [build custom inputs](https://github.com/frontcraft/react-standalone-form/wiki/Advanced-usage#creating-custom-inputs) to compose a form. Give each input a `name` prop that corresponds with a name defined in a `fields` array of the ancestor `<Form>` component.
4. Use `<FormButton>` to trigger a submit function that returns all field values formatted in a form of a simple javascript object.

```jsx
// App.js
import React from 'react'
import ReactDOM from 'react-dom'
import Form, {
  FormThemeProvider,
  Input,
  Select,
  FormButton,
} from 'react-standalone-form'


// Wrap entitre app into FormThemeProvider.
const App = () =>
  <FormThemeProvider>
    <div className='my-app'>
      <BasicFormExample />
    </div>
  </FormThemeProvider>


// Build a fully operational form.
const BasicFormExample = () =>
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

ReactDOM.render(<App />, document.querySelector('#app'))
```

## Features

* Built in form state management
* Wide range of UI form components
* Built in, customizable form validation system
* Customizable theme and notification labels
* Marking fields as required
* *Loading* state support for asynchronous operations
* Submit action triggered by a submit button or on each change with debounce
* Optional reseting of all fields after a successful submit ([show docs](https://github.com/frontcraft/react-standalone-form/wiki/Components-API#FormButton))
* Data collected from forms is formatted well for API calls
* Nested forms (possibility to put a form as a multiple fieldset of anorher form)
* Built in, repleacable react-toastify notification plugin
* Cross browser tested
* SSR support
* Easy way of creating custom inputs


## Docs

* [Components API](https://github.com/frontcraft/react-standalone-form/wiki/Components-API)
* [Form layouts](https://github.com/frontcraft/react-standalone-form/wiki/Form-layouts)
* [Theming](https://github.com/frontcraft/react-standalone-form/wiki/Theming)
* [Advanced usage](https://github.com/frontcraft/react-standalone-form/wiki/Advanced-usage)
* [Contribution guidelines](https://github.com/frontcraft/react-standalone-form/wiki/Contribution-guidelines)
