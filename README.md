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


const BasicFormExample = () =>
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

#### Step by step:

1. Wrap your entitre app into `<FormThemeProvider>`.
2. Put `<Form>` component anywhere inside the app, define each field by a name in `fields` prop.
3. Use a high variety of input components to build a form. Give each input a `name` prop that corresponds with any from `fields` prop of parent `<Form>` wrapper. Add other props to customize the inputs.
4. Use `<FormButton>` to trigger a submit function with access to all field values formatted as a simple javascript object.

[See more detailed examples](https://codesandbox.io/s/jp69w6kj35)

## Features

* Built in form state management
* Wide range of UI form components
* Built in form validation system
* Customizable theme and text labels
* Required or optional fields
* *Loading* state support for asynchronous operations
* Submit action triggered by a submit button or by each change with debounce
* Data collected from forms is well formatted for API calls
* Multiple forms support (being able to put a form into a form as a field group)
* Cross browser tested
* Easy way to create custom own inputs

## Docs

They are useful and up to date. Check the Component API, learn how to theme and
customize the forms, see advanced usage examples.

#### [Go to docs!](https://github.com/frontcraft/react-standalone-form/wiki)
