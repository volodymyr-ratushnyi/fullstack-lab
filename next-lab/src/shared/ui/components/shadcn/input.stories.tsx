import type {Meta, StoryObj} from '@storybook/nextjs-vite'
import {expect, userEvent, within} from 'storybook/test'
import {Input} from './input'

const meta: Meta<typeof Input> = {
  title: 'ShadCn/Input',
  component: Input,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Input>

export const Simple: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByTestId('test-input')
    await expect(input).not.toHaveFocus()
    await userEvent.click(input)
    await expect(input).toHaveFocus()
  },
  args: {
    'data-testid': 'test-input',
    placeholder: 'Input text...',
    type: 'text',
    disabled: false
  }
}
