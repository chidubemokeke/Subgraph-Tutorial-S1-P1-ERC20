import { Transfer as TransferEvent } from "../generated/Uniswap/Uniswap";
import { Transfer } from "../generated/schema"; // Import the Transfer and Account entities from the generated schema
import { getOrCreateAccount } from "../src/helpers";

// Handler function for the Transfer event
export function handleTransfer(event: TransferEvent): void {
  // Create a new Transfer entity with a unique ID (transaction hash + log index)
  let transfer = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  // Load or create the 'from' account
  let fromAccount = getOrCreateAccount(event.params.from);
  // Load or create the 'to' account
  let toAccount = getOrCreateAccount(event.params.to);

  // Set the Transfer entity fields
  transfer.from = fromAccount.id;
  transfer.to = toAccount.id;
  transfer.value = event.params.amount;
  transfer.timestamp = event.block.timestamp;

  // Save the Transfer entity to the store
  transfer.save();

  // Update the 'from' account's totalSent field
  fromAccount.totalSent = fromAccount.totalSent.plus(event.params.amount);
  // Save the updated 'from' account to the store
  fromAccount.save();

  // Update the 'to' account's totalReceived field
  toAccount.totalReceived = toAccount.totalReceived.plus(event.params.amount);
  // Save the updated 'to' account to the store
  toAccount.save();
}
