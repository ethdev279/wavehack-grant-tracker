import { log, ethereum, Bytes, BigInt } from "@graphprotocol/graph-ts";
import { Withdraw as WithdrawEvent } from "../generated/Contract/Contract";
import { Transfer, User } from "../generated/schema";

const TRANSFER_EVENT_SIGNATURE =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

export function handleWithdraw(event: WithdrawEvent): void {
  const blockTimestamp = event.block.timestamp;
  // handle transaction logs with erc20 transfers
  const logs = event.receipt!.logs;
  for (let i = 0; i < logs.length; i++) {
    let logData = logs[i];
    if (logData.topics[0].toHex() == TRANSFER_EVENT_SIGNATURE) {
      // Decode the log data with the Transfer event signature
      // topic[0] is the event signature
      // topic[1] is the from address
      // topic[2] is the to address
      // data is the amount in bytes
      const fromAddress = ethereum
        .decode("address", logData.topics[1])!
        .toAddress();
      const toAddress = ethereum
        .decode("address", logData.topics[2])!
        .toAddress();
      const transferAmount = ethereum
        .decode("uint256", logData.data)!
        .toBigInt();

      log.debug("logData from transaction: {}, {}, {}, {}", [
        logData.address.toHex(),
        fromAddress.toHex(),
        toAddress.toHex(),
        transferAmount.toString()
      ]);

      // Create or update from and to users
      getOrInitUser(fromAddress, blockTimestamp);
      getOrInitUser(toAddress, blockTimestamp);

      const transfer = new Transfer(
        event.transaction.hash.concatI32(
          event.receipt!.logs[i].logIndex.toI32()
        )
      );
      transfer.token = logData.address.toHex();
      transfer.from = fromAddress.toHex();
      transfer.to = toAddress.toHex();
      transfer.value = transferAmount;
      transfer.txHash = event.transaction.hash.toHex();
      transfer.timestamp = blockTimestamp;
      transfer.save();
    }
  }
}

// Helper function to get or initialize a user
function getOrInitUser(address: Bytes, initTimestamp: BigInt): User {
  let user = User.load(address.toHex());
  if (user == null) {
    user = new User(address.toHex());
    user.address = address;
    user.createdAt = initTimestamp;
    user.updatedAt = initTimestamp;
    user.save();
  }
  return user;
}
