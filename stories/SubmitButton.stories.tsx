import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { actions } from '@storybook/addon-actions'

import Form, {
  Input,
  SubmitButton as SubmitButtonComponent,
} from '../src'


export default {
  title: 'Components/Various/Submit Button',
  component: SubmitButtonComponent,
  parameters: {
    previewTabs: { canvas: { hidden: true }},
    viewMode: 'docs',
  },
} as ComponentMeta<typeof SubmitButtonComponent>

export const SubmitButton: ComponentStory<typeof SubmitButtonComponent> = args =>
  <Form fields={['name', 'email']} mandatory={['name']}>
    <Input name='name' label='Name (required)' />
    <Input name='email' label='E-mail ' type='email' />
    <SubmitButtonComponent {...args}{...actions('onChange')}>Submit</SubmitButtonComponent>
  </Form>
