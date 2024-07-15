import { BigInt, log, Address, Bytes, ethereum } from "@graphprotocol/graph-ts";
import { Withdraw as WithdrawEvent } from "../generated/Contract/Contract";
import { Withdraw, Transfer } from "../generated/schema";

const TRANSFER_EVENT_SIGNATURE =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

// Function to convert bytes32 log topic to an address
function bytesToAddress(data: Bytes): Address {
  // Extract the last 20 bytes (20 bytes address from the 32 bytes data)
  let addressBytes = data.subarray(12); // Skip the first 12 bytes (24 hex characters)
  return Address.fromBytes(Bytes.fromUint8Array(addressBytes));
}

export function handleWithdraw(event: WithdrawEvent): void {
  let withdraw = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  withdraw.secret = event.params._secret;
  withdraw.address = event.params.addr;
  withdraw.amount = event.params.amount;
  withdraw.timestamp = event.block.timestamp;
  withdraw.save();

  // handle transaction logs with erc20 transfers
  const logs = event.receipt!.logs;
  for (let i = 0; i < logs.length; i++) {
    let logData = logs[i];
    if (logData.topics[0].toHex() == TRANSFER_EVENT_SIGNATURE) {
      // Decode the log data with the Transfer event signature
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

      // Decode the log data with the Transfer event signature
      const transfer = new Transfer(
        event.transaction.hash.concatI32(event.logIndex.toI32())
      );
      transfer.token = logData.address;
      // topic1 is the from address it should be 20 bytes
      transfer.from = fromAddress;
      transfer.to = toAddress;
      transfer.value = transferAmount;
      transfer.txHash = event.transaction.hash;
      transfer.timestamp = event.block.timestamp;
      transfer.save();
    }
  }
}
