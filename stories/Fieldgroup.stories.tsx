import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Form, {
  FieldGroup as FieldGroupComponent,
  SubmitButton,
  Row,
  Input,
} from '../src'
import { formControlArgs, formControlArgTypes } from './formControlArgs'
import { actions } from '@storybook/addon-actions'

FieldGroupComponent.displayName = 'FieldGroup'


export default {
  title: 'Components/Inputs/Field Group',
  component: FieldGroupComponent,
  parameters: {
    docs: {
      description: {
        component: `Allows to build a nested form structure. The composition of fields, where every row has the same structure.\n\n**The code example of FieldGroup component misses the crucial fragment**, due to limitations of Storybook plugin, which does not render code of functions as a children.\n\n**[See the complete code example here](https://codesandbox.io/s/rfc-fieldgroup-1tig2u)**`,
      },
    },
  },
  args: {
    name: 'people',
    label: 'Field group',
    fields: ['name', 'email'],
    customMoreLabel: 'Add next person',
    ...formControlArgs,
    initialValue: undefined,
  },
  argTypes: {
    fields: {
      description: 'Names of fields in a group `string[]`',
      type: { required: true },
    },
    moreComponent: {
      description: 'Replace the default _Add more_ button component `ComponentType`',
    },
    moreComponentProps: {
      description: 'Props for custom _Add more_ button component `ComponentProps`',
    },
    customMoreLabel: {
      description: 'Custom label for _Add more_ button `string`',
      table: {
        defaultValue: { summary: 'Comes from theme' },
      },
    },
    deleteIcon: {
      description: 'Replace the default delete icon `ReactNode`',
    },
    ...formControlArgTypes,
  },
} as ComponentMeta<typeof FieldGroupComponent>

const Template: ComponentStory<typeof FieldGroupComponent> = args =>
  <Form fields={[args.name]}>
    <FieldGroupComponent {...args}>
      {({ values }) => (
        <Row>
          <Input name='name' label='Name' initialValue={values.name} />
          <Input
            name='email'
            type='email'
            label='E-mail'
            initialValue={values.email}
          />
        </Row>
      )}
    </FieldGroupComponent>
    <SubmitButton {...actions('onClick')}>
      Save
    </SubmitButton>
  </Form>

export const FieldGroup = Template.bind({})
