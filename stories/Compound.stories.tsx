import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form, {
  Input,
  SubmitButton,
  Compound as CompoundComponent,
} from '../src'


export default {
  title: 'Components/Various/Compound',
  component: CompoundComponent,
} as ComponentMeta<typeof CompoundComponent>

export const Compound: ComponentStory<typeof CompoundComponent> = args =>
  <Form fields={['email']} >
    <CompoundComponent {...args}>
      <Input
        name='email'
        type='email'
        placeholder='E-mail'
      />
      <SubmitButton>Subscribe</SubmitButton>
    </CompoundComponent>
  </Form>
