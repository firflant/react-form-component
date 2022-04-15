import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form, { Input, FormButton, FormActions, Row, Compound } from '../src'


export default {
  title: 'Components/Layouts/Compound',
  component: Compound,
} as ComponentMeta<typeof Compound>

export const Example: ComponentStory<typeof Compound> = args =>
  <Form fields={['email']} >
    <Compound {...args}>
      <Input
        name='email'
        type='email'
        placeholder='E-mail'
      />
      <FormButton>Subscribe</FormButton>
    </Compound>
  </Form>
