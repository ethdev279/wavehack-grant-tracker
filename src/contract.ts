import { Withdraw as WithdrawEvent } from "../generated/Contract/Contract"
import { Withdraw } from "../generated/schema"

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._secret = event.params._secret
  entity.addr = event.params.addr
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
