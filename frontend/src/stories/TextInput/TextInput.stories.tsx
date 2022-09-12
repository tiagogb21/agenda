import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextInput from './TextInput';

export default {
  title: 'TextInput',
  component: TextInput,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  primary: true,
  label: 'Email',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Email',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Email',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Email',
};
