import { BigInt, Bytes } from "@graphprotocol/graph-ts"; // Import necessary types from graph-ts
import { Account } from "../../generated/schema"; // Import the Account entity from the generated Uniswap schema

// Function to get an existing account or create a new one if it doesn't exist
export function getOrCreateAccount(address: Bytes): Account {
  // Attempt to load an existing Account entity from the store using the address
  let account = Account.load(address.toHex());

  // If the Account entity does not exist, create and initialize a new one
  if (account == null) {
    account = new Account(address.toHex()); // Create a new Account entity with the address as ID
    // Initialize the account's properties
    account.totalSent = BigInt.fromI32(0); // Initialize totalSent field to 0
    account.totalReceived = BigInt.fromI32(0); // Initialize totalReceived field to 0
    account.sentCount = 0; // Initialize sentCount field to 0
    account.receivedCount = 0; // Initialize receivedCount field to 0
    account.save(); // Save the newly created Account entity to the store
  }

  // Return the Account entity, either loaded or newly created
  return account as Account;
}
