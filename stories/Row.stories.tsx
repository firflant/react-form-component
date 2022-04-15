import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form, { Input, Row } from '../src'


export default {
  title: 'Components/Various/Row',
  component: Row,
} as ComponentMeta<typeof Row>

export const Example: ComponentStory<typeof Row> = args =>
  <Form fields={['name', 'email']} >
    <Row {...args}>
      <Input name='name' label='Name' />
      <Input
        name='email'
        type='email'
        label='E-mail'
      />
    </Row>
  </Form>
