# react-standalone-form

Create React forms with a very minimalistic code, without having to write state
management logic on your own. Let everything happening under the hood. A themeable
form library based on Context API with a wide selection of user friendly inputs.

## Install

```
yarn add react-standalone-form
```

## Demo

[![See working example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/jp69w6kj35?fontsize=14&hidenavigation=1)

## Example usage

### Quick start:

1. Wrap your entitre app into `<FormThemeProvider>`.
2. Put `<Form>` component anywhere in the app, define each field by adding its name to a `fields` prop array.
3. Use any from built-in [visual input components](https://github.com/frontcraft/react-standalone-form/wiki/Components-API#Inputs) to compose a form. Give each input a `name` prop to tell which field from a `fields` array should be controlled by it. Add other props in order to customize the inputs.
4. Use `<FormButton>` to trigger a submit function which gives access to all field values formatted in a form of a simple javascript object.

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
      callback={fields => console.log(fields)}
    >Save</FormButton>
  </Form>


const App extends React.Component {
  render() {
    return (
      <FormThemeProvider>
        <div className='my-app'>
          <BasicFormExample />
        </div>
      </FormThemeProvider>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'))
```

## Features

* Built in form state management
* Wide range of UI form components
* Built in form validation system
* Customizable theme and text labels
* Required or optional fields
* *Loading* state support for asynchronous operations
* Submit action triggered by a submit button or by each change with debounce
* Ability to reset all fields after successful submit ([show docs](https://github.com/frontcraft/react-standalone-form/wiki/Components-API#FormButton))
* Data collected from forms is well formatted for API calls
* Multiple forms support (being able to put a form into a form as a field group)
* Cross browser tested
* Easy way to create custom own inputs

## Docs

* [Components API](https://github.com/frontcraft/react-standalone-form/wiki/Components-API)
* [Form layouts](https://github.com/frontcraft/react-standalone-form/wiki/Form-layouts)
* [Theming](https://github.com/frontcraft/react-standalone-form/wiki/Theming)
* [Advanced usage](https://github.com/frontcraft/react-standalone-form/wiki/Advanced-usage)

