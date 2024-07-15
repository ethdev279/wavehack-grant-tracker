import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { Withdraw } from "../generated/schema"
import { Withdraw as WithdrawEvent } from "../generated/Contract/Contract"
import { handleWithdraw } from "../src/contract"
import { createWithdrawEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _secret = Bytes.fromI32(1234567890)
    let addr = Address.fromString("0x0000000000000000000000000000000000000001")
    let amount = BigInt.fromI32(234)
    let newWithdrawEvent = createWithdrawEvent(_secret, addr, amount)
    handleWithdraw(newWithdrawEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Withdraw created and stored", () => {
    assert.entityCount("Withdraw", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Withdraw",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_secret",
      "1234567890"
    )
    assert.fieldEquals(
      "Withdraw",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "addr",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Withdraw",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
