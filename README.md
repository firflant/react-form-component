# react-standalone-form

Create React forms with a very minimalistic code, without having to write state
management logic on your own. Let everything happen under the hood. A themeable
form library based on Context API with a wide selection of user friendly inputs.

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

#### Step by step:

1. Wrap your app into `<FormThemeProvider>`.
2. Put `<Form>` component anywhere in the app, define desired field names in a `fields` prop.
3. Inside a `<Form>`, use a high variety of input components to build a form. Give each a `name` prop that corresponds with one from `fields` values.
4. Use `<FormButton>` to trigger a `callback` function with access to all field values in format of a simple javascript object.

[See more detailed examples](https://codesandbox.io/s/jp69w6kj35)

## Features

* Built in form state management
* Wide range of UI form components
* Validation states displayed to the user
* Customizable theme
* Required or optional fields
* Global form validation (it does not run a callback if form is not valid)
* *Loading* state support for asynchronous operations
* Multiple forms support (being able to put a form into a form as a multiple values field)
* Easy way to create own custom inputs

## Docs

[Read components API and learn how to theme a forms](https://github.com/frontcraft/react-standalone-form/wiki)
