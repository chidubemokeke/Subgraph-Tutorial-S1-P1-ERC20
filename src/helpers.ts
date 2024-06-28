import { BigInt, Bytes } from "@graphprotocol/graph-ts"; // Import necessary types from graph-ts
import { Account } from "../generated/schema"; // Import the Transfer event from the Token contract ABI

// Helper function to load or create an Account entity
export function getOrCreateAccount(address: Bytes): Account {
  // Try to load the Account entity from the store
  let account = Account.load(address.toHex());

  // If the Account entity does not exist, create a new one
  if (account == null) {
    account = new Account(address.toHex());
    account.totalSent = BigInt.fromI32(0); // Initialize totalSent to 0
    account.totalReceived = BigInt.fromI32(0); // Initialize totalReceived to 0
    account.save(); // Save the new Account entity to the store
  }

  // Return the Account entity
  return account as Account;
}
