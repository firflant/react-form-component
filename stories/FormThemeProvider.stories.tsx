import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { FormThemeProvider as FormThemeProviderComponent} from '../src'


export default {
  title: 'Components/Various/Form Theme Provider',
  component: FormThemeProviderComponent,
  parameters: {
    previewTabs: { canvas: { hidden: true }},
    viewMode: 'docs',
  },
} as ComponentMeta<typeof FormThemeProviderComponent>

const Template: ComponentStory<typeof FormThemeProviderComponent> = args =>
  <FormThemeProviderComponent {...args}>
    This component does not provide any display.
  </FormThemeProviderComponent>

export const FormThemeProvider = Template.bind({})
FormThemeProvider.args = {
  theme: {},
}

