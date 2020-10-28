/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled/macro'
import { Dialog as ReachDialog } from '@reach/dialog'
import React from 'react'
import { ImPlus, ImSpinner3 } from 'react-icons/im'
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'
import tw from 'twin.macro'

const CircleButton = styled.button({
  borderRadius: '30px',
  padding: '0',
  width: '40px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#f1f2f7',
  color: colors.neutral900,
  border: `1px solid #f1f1f4`,
  cursor: 'pointer',
})

const Spinner = styled(ImSpinner3)(tw`text-neutral-900 animate-spin`)
Spinner.defaultProps = {
  'aria-label': 'loading',
}

const buttonVariants = {
  primary: {
    background: colors.primary500,
    color: colors.neutral000,
  },
  secondary: {
    background: colors.neutral000,
    border: `1px solid ${colors.primary500}`,
    color: colors.neutral900,
  },
}

const Button = styled.button(
  {
    padding: '10px 15px',
    border: '0',
    lineHeight: '1',
    borderRadius: '3px',
  },
  ({ variant = 'primary' }) => buttonVariants[variant]
)

const Input = styled.input(
  tw`bg-neutral-200 pl-6 rounded-full h-10 align-middle`
)

const AddButton = styled.button(
  tw`w-6 h-6 p-1 bg-neutral-100 rounded-full align-middle`
)

const AddPlus = styled(ImPlus)(tw`text-primary-300`)

const Dialog = styled(ReachDialog)({
  maxWidth: '450px',
  borderRadius: '3px',
  paddingBottom: '3.5em',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  margin: '20vh auto',
  [mq.small]: {
    width: '100%',
    margin: '10vh auto',
  },
})

const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

function FullPageSpinner() {
  return (
    <div tw="text-6xl h-screen flex flex-col justify-center items-center">
      <Spinner />
    </div>
  )
}

function TodoInput() {
  return (
    <React.Fragment>
      <Input />
      <AddButton
        type="submit"
        css={{
          border: '0',
          position: 'relative',
          marginLeft: '-30px',
        }}
      >
        <AddPlus />
      </AddButton>
    </React.Fragment>
  )
}

const errorMessageVariants = {
  stacked: { display: 'block' },
  inline: { display: 'inline-block' },
}

function ErrorMessage({ errorMessage, variant = 'stacked', ...props }) {
  return (
    <div
      role="alert"
      css={[{ color: colors.red500 }, errorMessageVariants[variant]]}
      {...props}
    >
      <pre
        css={[
          { whiteSpace: 'break-spaces', margin: '0', marginBottom: -5 },
          errorMessageVariants[variant],
        ]}
      >
        {errorMessage}
      </pre>
    </div>
  )
}

export {
  AddButton,
  Button,
  CircleButton,
  Dialog,
  ErrorMessage,
  FormGroup,
  Input,
  Spinner,
  FullPageSpinner,
  TodoInput,
}
