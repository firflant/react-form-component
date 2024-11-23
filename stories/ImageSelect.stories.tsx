import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form, { ImageSelect as ImageSelectComponent } from '../src'
import { formControlArgs, formControlArgTypes } from './formControlArgs'

ImageSelectComponent.displayName = 'ImageSelect'


export default {
  title: 'Components/Inputs/Image Select',
  component: ImageSelectComponent,
  parameters: {
    docs: {
      description: {
        component: 'A list of selectable options, where each one is represented by an image and text.',
      },
    },
  },
  args: {
    name: 'example',
    label: 'Image select',
    options: [
      {
        label: 'Animals',
        value: 'animals',
        image: 'https://placehold.co/64x64',
      },
      {
        label: 'People',
        value: 'people',
        image: 'https://placehold.co/64x64',
      },
      {
        label: 'Nature',
        value: 'nature',
        image: 'https://placehold.co/64x64',
      },
      {
        label: 'Tech',
        value: 'tech',
        image: 'https://placehold.co/64x64',
      },
    ],
    multiple: false,
    ...formControlArgs,
  },
  argTypes: {
    options: {
      description: 'Available options `{ image, label, value }[]`',
    },
    multiple: {
      description: 'Enables selecting multiple values',
    },
    ...formControlArgTypes,
  },
} as ComponentMeta<typeof ImageSelectComponent>

const Template: ComponentStory<typeof ImageSelectComponent> = args =>
  <Form fields={[args.name]}>
    <ImageSelectComponent {...args} />
  </Form>

export const ImageSelect = Template.bind({})
