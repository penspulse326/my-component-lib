import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Hover: Story = {
  render: (args) => (
    <Button
      {...args}
      data-hover
    >
      Hover State (Forced)
    </Button>
  ),
};

export const Active: Story = {
  render: (args) => (
    <Button
      {...args}
      data-active
    >
      Active State (Forced)
    </Button>
  ),
};

export const Focus: Story = {
  render: (args) => (
    <Button
      {...args}
      data-focus
    >
      Focus State (Forced)
    </Button>
  ),
};

export const AsLink: Story = {
  render: (args) => (
    <Button
      {...args}
      as="a"
      href="https://google.com"
      target="_blank"
    >
      {`Rendered as Link (<a>)`}
    </Button>
  ),
};
