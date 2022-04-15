import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form, { ImageUpload as ImageSelectComponent } from '../src'
import { formControlArgs, formControlArgTypes } from './formControlArgs'

ImageSelectComponent.displayName = 'ImageSelect'


export default {
  title: 'Components/Inputs/Image Select',
  component: ImageSelectComponent,
  args: {
    name: 'example',
    label: 'Image select',
    options: [
      {
        label: 'Animals',
        value: 'animals',
        image: 'https://placeimg.com/54/54/animals',
      },
      {
        label: 'People',
        value: 'people',
        image: 'https://placeimg.com/54/54/people',
      },
      {
        label: 'Nature',
        value: 'nature',
        image: 'https://placeimg.com/54/54/nature',
      },
      {
        label: 'Tech',
        value: 'tech',
        image: 'https://placeimg.com/54/54/tech',
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
