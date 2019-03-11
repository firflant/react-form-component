# react-standalone-form

Simply create a forms, without writing a state management by your own. Let everything happen under the hood. A form library based on the Context API with a wide selection of user friendly inputs.

## Install

```
yarn add react-standalone-form
```

## Example usage

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

const App extends React.Component {
  render() {
    return (
      <FormThemeProvider>
        <Form fields={['name', 'email', 'role']}>
          <Input
            name='userName'
            label='User name'
          />
          <Input
            name='E-mail'
            type='email'
            label='User name'
          />
          <Select
            name='role'
            label='Role'
            options={['Viewer', 'Moderator', 'Admin']}
          />
          <FormButton
            callback={fields => console.log(fields)}
          >Save</FormButton>
        </Form>
      </FormThemeProvider>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'))
```

1. Wrap your app into `<FormThemeProvider>`.
2. Put `<Form>` component anywhere in the app, define desired field names in a `fields` prop.
3. Use high variety of input components to build a form. Give each corresponding `name` prop.
4. Use `<FormButton>` to trigger a `callback` function with access to all field values in format of a simple javascript object.

## Features

* Built in form state management
* Wide range of UI form components
* Validation states displayed to the user
* Customizable theme
* Global form validation (does not run a callback if form is not valid)
* *Loading* state support for asynchronous operations
* Multiple forms support (ability to put a form into a form as a multiple values field)
* Easy way to create own custom inputs
