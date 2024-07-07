import { Transfer as TransferEvent } from "../../generated/Uniswap/Uniswap"; // Import the Transfer event from the Uniswap contract ABI
import { Transfer } from "../../generated/schema"; // Import the Transfer entity from the generated schema
import { getOrCreateAccount } from "../utils/helper"; // Import the helper function to get or create an Account entity

// Function to handle transfer events
export function handleTransfer(event: TransferEvent): void {
  // Load or create the 'from' account involved in the transfer
  let fromAccount = getOrCreateAccount(event.params.from);
  // Load or create the 'to' account involved in the transfer
  let toAccount = getOrCreateAccount(event.params.to);

  // Update the count of transfers sent by the 'from' account
  fromAccount.sentCount += 1;
  // Update the count of transfers received by the 'to' account
  toAccount.receivedCount += 1;

  // Update the total value of tokens sent by the 'from' account
  fromAccount.totalSent = fromAccount.totalSent.plus(event.params.amount);
  // Update the total value of tokens received by the 'to' account
  toAccount.totalReceived = toAccount.totalReceived.plus(event.params.amount);

  // Create a new Transfer entity with the unique transaction hash
  let transfer = new Transfer(event.transaction.hash.toHex());
  // Set the 'from' field of the Transfer entity to the 'from' account ID
  transfer.from = fromAccount.id;
  // Set the 'to' field of the Transfer entity to the 'to' account ID
  transfer.to = toAccount.id;
  // Set the value of the transfer to the value from the event
  transfer.value = event.params.amount;
  // Set the timestamp of the transfer to the block timestamp
  transfer.timestamp = event.block.timestamp;

  // Save the updated 'from' account entity to the store
  fromAccount.save();
  // Save the updated 'to' account entity to the store
  toAccount.save();
  // Save the new Transfer entity to the store
  transfer.save();
}
