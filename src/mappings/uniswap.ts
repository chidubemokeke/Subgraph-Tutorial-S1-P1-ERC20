import { Transfer as TransferEvent } from "../../generated/Uniswap/Uniswap"; // Import the Transfer event from the Uniswap contract ABI
import { Transfer } from "../../generated/schema"; // Import the Transfer entity from the generated schema
import { getOrCreateAccount } from "../utils/helper"; // Import the helper function to get or create an Account entity

// Function to handle transfer events
export function handleTransfer(event: TransferEvent): void {
  // Get or create accounts for the sender and receiver
  let fromAccount = getOrCreateAccount(event.params.from);
  let toAccount = getOrCreateAccount(event.params.to);

  // Update the sender's sent count and total sent amount
  fromAccount.sentCount += 1;
  toAccount.receivedCount += 1;

  // Update the receiver's received count and total received amount
  fromAccount.totalSent = fromAccount.totalSent.plus(event.params.amount);
  toAccount.totalReceived = toAccount.totalReceived.plus(event.params.amount);

  // Save the updated accounts to the store
  fromAccount.save();
  toAccount.save();

  // Create a new Transfer entity with the unique ID
  let transfer = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  // Set the properties of the Transfer entity
  transfer.from = fromAccount.id;
  transfer.to = toAccount.id;
  transfer.value = event.params.amount;
  transfer.timestamp = event.block.timestamp;
  transfer.save(); // Save the Transfer entity to the store
}
