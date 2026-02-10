import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from './Button';

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
    tabIndex: {
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
  tags: ['autodocs'],
  title: 'Components/Button',
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '預設按鈕',
  },
};

export const Loading: Story = {
  args: {
    children: '載入中',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: '禁用狀態',
    disabled: true,
  },
};

export const Hover: Story = {
  render: (args) => (
    <Button
      {...args}
      data-hover
    >
      強制 Hover 狀態
    </Button>
  ),
};

export const Active: Story = {
  render: (args) => (
    <Button
      {...args}
      data-active
    >
      強制 Active 狀態
    </Button>
  ),
};

export const Focus: Story = {
  render: (args) => (
    <Button
      {...args}
      data-focus
    >
      強制 Focus 狀態
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
      渲染為連結 (&lt;a&gt;)
    </Button>
  ),
};

export const Polymorphic: Story = {
  // @ts-expect-error - Storybook args type inference for polymorphic component is tricky
  render: (args) => (
    <div
      style={{
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <strong>渲染為連結 (a tag)</strong>
        <p style={{ fontSize: '0.875rem', margin: 0 }}>
          檢查 DOM: 應具備{' '}
          <code style={{ backgroundColor: '#eee', padding: '0.2rem' }}>
            role="button"
          </code>{' '}
          (若未指定 href) 或視為一般連結。
        </p>
        <Button
          {...args}
          as="a"
          href="https://google.com"
          target="_blank"
        >
          我是 &lt;a&gt; 標籤
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <strong>渲染為 Div (div tag)</strong>
        <p style={{ fontSize: '0.875rem', margin: 0 }}>
          檢查 DOM: 自動補上{' '}
          <code style={{ backgroundColor: '#eee', padding: '0.2rem' }}>
            role="button"
          </code>{' '}
          以及{' '}
          <code style={{ backgroundColor: '#eee', padding: '0.2rem' }}>
            tabIndex="0"
          </code>{' '}
          以支援鍵盤操作。
        </p>
        <Button
          {...args}
          as="div"
          onClick={() => alert('Div 被點擊了!')}
        >
          我是 &lt;div&gt; 標籤
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <strong>渲染為 Span (span tag) - 禁用狀態</strong>
        <p style={{ fontSize: '0.875rem', margin: 0 }}>
          檢查 DOM: 自動補上{' '}
          <code style={{ backgroundColor: '#eee', padding: '0.2rem' }}>
            tabIndex="-1"
          </code>{' '}
          並標示{' '}
          <code style={{ backgroundColor: '#eee', padding: '0.2rem' }}>
            aria-disabled="true"
          </code>
          。
        </p>
        <Button
          {...args}
          as="span"
          disabled
        >
          我是被禁用的 &lt;span&gt;
        </Button>
      </div>
    </div>
  ),
};
