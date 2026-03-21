import type {Meta, StoryObj} from '@storybook/nextjs-vite'
import NextLink from 'next/link'
import {Button} from './button'

const meta: Meta<typeof Button> = {
  title: 'ShadCn/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      description: 'Button variants.',
      options: [
        'default',
        'outline',
        'secondary',
        'ghost',
        'destructive',
        'link',
      ],
    },
    size: {
      control: 'select',
      description: 'Button sizes.',
      options: [
        'default',
        'xs',
        'sm',
        'lg',
        'icon',
        'icon-xs',
        'icon-sm',
        'icon-lg',
      ],
    },
    asChild: {
      control: 'boolean',
      description: 'Button child will be like as button. Use Only when child is element as link',
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when the button is clicked.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button.',
    },
    className: {
      control: 'text',
      description: 'Custom tailwind CSS class for apply to button.',
    },
    children: {
      control: false,
      description: 'Content is displayed inside the button.',
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Default',
  }
}

export const Link: Story = {
  args: {
    asChild: true,
    variant: 'link',
    children: (
      <NextLink href={'#'}>Link</NextLink>
    )
  }
}
