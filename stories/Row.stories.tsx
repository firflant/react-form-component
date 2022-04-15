import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form, { Input, Row as RowComponent } from '../src'


export default {
  title: 'Components/Various/Row',
  component: RowComponent,
} as ComponentMeta<typeof RowComponent>

export const Row: ComponentStory<typeof RowComponent> = args =>
  <Form fields={['name', 'email']} >
    <RowComponent {...args}>
      <Input name='name' label='Name' />
      <Input
        name='email'
        type='email'
        label='E-mail'
      />
    </RowComponent>
  </Form>
