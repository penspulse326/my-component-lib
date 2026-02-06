import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Button from './Button.vue';

const meta: Meta<typeof Button> = {
  component: Button,
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind="args">
        <template v-if="args.default">
          <span v-if="typeof args.default === 'string'" v-html="args.default"></span>
          <component :is="args.default" v-else />
        </template>
      </Button>
    `,
  }),
  tags: ['autodocs'],

  title: 'Components/Button',
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    default: 'Default Button',
  },
};
