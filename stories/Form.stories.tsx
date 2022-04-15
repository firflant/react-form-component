import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import FormComponent from '../src'


export default {
  title: 'Components/Form',
  component: FormComponent,
  parameters: {
    previewTabs: { canvas: { hidden: true }},
    viewMode: 'docs',
  },
} as ComponentMeta<typeof FormComponent>

const Template: ComponentStory<typeof FormComponent> = args =>
  <FormComponent {...args}>
    This component does not provide any display.
  </FormComponent>

export const Form = Template.bind({})
Form.args = {
  fields: [],
  mandatory: [],
}

