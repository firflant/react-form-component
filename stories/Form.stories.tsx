import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import FormComponent from '../src'


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Form',
  component: FormComponent,
  parameters: {
    previewTabs: { canvas: { hidden: true }},
    viewMode: 'docs',
  },
} as ComponentMeta<typeof FormComponent>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FormComponent> = args =>
  <FormComponent {...args}>
    This component does not provide any display.
  </FormComponent>

export const Form = Template.bind({})
Form.args = {
  fields: [],
  mandatory: [],
}

