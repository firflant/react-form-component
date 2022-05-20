import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form, {
  Input,
  TextArea,
  SubmitButton,
  FormActions as FormActionsComponent,
} from '../src'


export default {
  title: 'Components/Various/Form Actions',
  component: FormActionsComponent,
} as ComponentMeta<typeof FormActionsComponent>

export const FormActions: ComponentStory<typeof FormActionsComponent> = args =>
  <Form fields={['name', 'title', 'message']}>
    <Input name='name' label='Name' />
    <Input name='title' label='Title' />
    <TextArea name='message' label='Message' />
    <FormActionsComponent {...args}>
      <SubmitButton>Submit</SubmitButton>
      <SubmitButton reset>Reset</SubmitButton>
    </FormActionsComponent>
  </Form>
