import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { actions } from '@storybook/addon-actions'

import Form, {
  Input,
  FormButton as FormButtonComponent,
} from '../src'


export default {
  title: 'Components/Various/Form Button',
  component: FormButtonComponent,
} as ComponentMeta<typeof FormButtonComponent>

export const FormButton: ComponentStory<typeof FormButtonComponent> = args =>
  <Form fields={['name', 'email']} mandatory={['name']}>
    <Input name='name' label='Name (required)' />
    <Input name='email' label='E-mail ' type='email' />
    <FormButtonComponent {...args}{...actions('onChange')}>Submit</FormButtonComponent>
  </Form>
