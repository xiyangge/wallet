import React from 'react'
import PropTypes from 'prop-types'
import { FilecoinNumber } from '@glif/filecoin-number'

import { Box, Input, Text } from '../../../Shared'
import { MESSAGE_PROPS, ADDRESS_PROPTYPE } from '../../../../customPropTypes'
import { EXEC, PROPOSE, SEND } from '../../../../constants'

const WithdrawDetails = ({ from, multisigAddr, recipient, value }) => {
  return (
    <>
      <Box mt={3}>
        <Input.Address value={multisigAddr} label='Multisig actor' disabled />
        <Box height={3} />
        <Input.Address value={recipient} label='Recipient' disabled />
        <Box height={3} />
        <Input.Address value={from} label='From' disabled />
      </Box>
      <Input.Funds
        my={3}
        balance={new FilecoinNumber('0.1', 'fil')}
        label='Amount'
        disabled
        amount={new FilecoinNumber(value, 'attofil').toAttoFil()}
      />
    </>
  )
}

WithdrawDetails.propTypes = {
  from: ADDRESS_PROPTYPE,
  multisigAddr: ADDRESS_PROPTYPE,
  recipient: ADDRESS_PROPTYPE,
  value: PropTypes.string.isRequired
}

const ChangeOwnerDetails = ({ from, multisigAddr, to }) => {
  return (
    <Box mt={3}>
      <Input.Address value={multisigAddr} label='Multisig actor' disabled />
      <Box height={3} />
      <Input.Address value={to} label='New owner' disabled />
      <Box height={3} />
      <Input.Address value={from} label='Old owner' disabled />
    </Box>
  )
}

ChangeOwnerDetails.propTypes = {
  from: ADDRESS_PROPTYPE,
  multisigAddr: ADDRESS_PROPTYPE,
  to: ADDRESS_PROPTYPE
}

const ProposeDetails = ({ message }) => {
  if (message.params.method === 0) {
    return (
      <WithdrawDetails
        from={message.from}
        multisigAddr={message.to}
        recipient={message.params.to}
        value={message.params.value}
      />
    )
  }
  if (message.params.method === 7) {
    return (
      <ChangeOwnerDetails
        multisigAddr={message.to}
        from={message.params.params.from}
        to={message.params.params.to}
      />
    )
  }
}

ProposeDetails.propTypes = {
  message: MESSAGE_PROPS
}

const SendDetails = ({ from, to, value }) => (
  <>
    <Box mt={3}>
      <Input.Address value={from} label='From' disabled />
      <Box height={3} />
      <Input.Address value={to} label='To' disabled />
    </Box>
    <Input.Funds
      my={3}
      balance={new FilecoinNumber('0.1', 'fil')}
      label='Amount'
      disabled
      amount={new FilecoinNumber(value, 'attofil').toAttoFil()}
    />
  </>
)

SendDetails.propTypes = {
  from: ADDRESS_PROPTYPE,
  to: ADDRESS_PROPTYPE,
  value: PropTypes.string.isRequired
}

const ExecDetails = ({ message }) => {
  return (
    <>
      <Box mt={3}>
        <Text>Created new actor</Text>
      </Box>
      <Input.Funds
        my={3}
        balance={new FilecoinNumber('0.1', 'fil')}
        label='Amount'
        disabled
        amount={new FilecoinNumber(message.value, 'attofil').toAttoFil()}
      />
    </>
  )
}

ExecDetails.propTypes = {
  message: MESSAGE_PROPS.isRequired
}

const DetailSection = ({ message }) => {
  switch (message.method) {
    case SEND:
      return (
        <SendDetails
          from={message.from}
          to={message.to}
          value={message.value}
        />
      )
    case PROPOSE:
      return <ProposeDetails message={message} />
    case EXEC:
      return <ExecDetails message={message} />
    default:
      return <div>Unknown</div>
  }
}

DetailSection.propTypes = {
  message: MESSAGE_PROPS.isRequired
}

export default DetailSection
