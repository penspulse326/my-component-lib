import type { Meta, StoryObj } from '@storybook/vue3-vite';

import Button from './Button.vue';

const meta: Meta<typeof Button> = {
  argTypes: {
    role: {
      control: 'text',
      description:
        'ARIA 角色。預設情況下，如果是 `button` 標籤則不設定，若是其他標籤（如 `div`）則自動設為 `button`。',
      table: {
        category: 'Accessibility',
        defaultValue: { summary: "undefined | 'button'" },
        type: { summary: 'string' },
      },
    },
    tabindex: {
      control: 'number',
      description:
        '鍵盤導航順序。若渲染為非 `button` 標籤，組件會自動設為 `0` 以確保可被鍵盤聚焦。',
      table: {
        category: 'Accessibility',
        defaultValue: { summary: 'undefined | 0 | -1' },
        type: { summary: 'number' },
      },
    },
  },
  component: Button,
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind="args">
        <template v-if="args.default">
          <template v-if="typeof args.default === 'string'">{{ args.default }}</template>
          <component v-else :is="args.default" />
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
    default: '預設按鈕',
  },
};

export const Loading: Story = {
  args: {
    default: '載入中',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    default: '禁用狀態',
    disabled: true,
  },
};

export const Hover: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args" data-hover>強制 Hover 狀態</Button>',
  }),
};

export const Active: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args" data-active>強制 Active 狀態</Button>',
  }),
};

export const Focus: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args" data-focus>強制 Focus 狀態</Button>',
  }),
};

export const AsLink: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind="args" as="a" href="https://google.com" target="_blank">
        渲染為連結 (&lt;a&gt;)
      </Button>
    `,
  }),
};

export const Polymorphic: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
        <div style="display: flex; flex-direction: column; gap: 0.5rem">
          <strong>渲染為連結 (a tag)</strong>
          <p style="font-size: 0.875rem; margin: 0">
            檢查 DOM: 應具備 <code style="background-color: #eee; padding: 0.2rem">role="button"</code> 若未指定 href。
          </p>
          <Button v-bind="args" as="a" href="https://google.com" target="_blank">
            我是 &lt;a&gt; 標籤
          </Button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.5rem">
          <strong>渲染為 Div (div tag)</strong>
          <p style="font-size: 0.875rem; margin: 0">
            檢查 DOM: 自動補上 <code style="background-color: #eee; padding: 0.2rem">role="button"</code>
            以及 <code style="background-color: #eee; padding: 0.2rem">tabindex="0"</code>
          </p>
          <Button v-bind="args" as="div" @click="() => alert('Div 被點擊了!')">
            我是 &lt;div&gt; 標籤
          </Button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.5rem">
          <strong>渲染為 Span (span tag) - 禁用狀態</strong>
          <p style="font-size: 0.875rem; margin: 0">
            檢查 DOM: 自動補上 <code style="background-color: #eee; padding: 0.2rem">tabindex="-1"</code>
            並標示 <code style="background-color: #eee; padding: 0.2rem">aria-disabled="true"</code>
          </p>
          <Button v-bind="args" as="span" :disabled="true">
            我是被禁用的 &lt;span&gt;
          </Button>
        </div>
      </div>
    `,
  }),
};
