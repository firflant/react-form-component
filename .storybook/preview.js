import React from 'react';

import { FormThemeProvider } from '../dist'
import './style.css'

export const decorators = [
  (Story) => (
    <FormThemeProvider>
      <Story />
    </FormThemeProvider>
  ),
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [
        'Introduction',
        ['Overview', 'Getting started', 'Concept'],
        'Docs',
        ['Theming', 'Async', 'Field layouts', '*', 'Contribution guidelines'],
        'Components',
        ['Form']
      ],
    },
  },
}