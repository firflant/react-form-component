import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form, { Input, TextArea, FormButton, FormActions } from '../src'


export default {
  title: 'Components/Various/FormActions',
  component: FormActions,
} as ComponentMeta<typeof FormActions>

export const Example: ComponentStory<typeof FormActions> = args =>
  <Form fields={['name', 'title', 'message']}>
    <Input name='name' label='Name' />
    <Input name='title' label='Title' />
    <TextArea name='message' label='Message' />
    <FormActions {...args}>
      <FormButton>Submit</FormButton>
      <FormButton reset>Reset</FormButton>
    </FormActions>
  </Form>
