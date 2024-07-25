# Subgraph Development Tutorial - Beginner - Part 1 - ERC20

Welcome to the Beginner Level of the Subgraph Development Masterclass. This tutorial will guide you through the fundamentals of subgraph development using [The Graph Studio](https://thegraph.com/studio/), from setting up your environment to deploying your first subgraph using an ERC20 token contract as a use case.

## Overview

In this masterclass, you'll gain essential skills in subgraph development, enabling you to efficiently index and query blockchain data for your decentralized application(dApps).

## Learning Objective

By completing this masterclass, you will:

- Understand the purpose and benefits of subgraphs in dApps.
- Learn how to set up your development environment for subgraph development.
- Define GraphQL entities to model data structures for indexing smart contract events.
- Implement mappings logic to transform blockchain events to entities in your subgraph.
- Deploy your subgraph using The Graph Studio for querying.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [Graph CLI](https://github.com/graphprotocol/graph-cli)
- [Create a Graph Studio Account](https://thegraph.com/studio/)

## Step-by-Step Tutorial

### Step 1: Using The Graph Studio

**Create a New Subgraph in The Graph Studio:**

- Navigate to The Graph Studio, sign in, and create a new subgraph.
- Enter the required details such as the subgraph name and description.
- You will receive a deploy key and subgraph slug (e.g., username/subgraph-name)
- Initialize your subgraph with the command from the studio.

```bash
graph init --studio <subgraph-name>
```

**Authenticate with The Graph Studio:**

- Copy the deploy key from The Graph Studio
- Run the following command in your terminal to authenticate:

```bash
graph auth --studio <ACCESS_TOKEN>
```

### Step 2: Understanding the Project Structure

The initialized project contains the following structure:

- **subgraph.yaml**: Defines the subgraph manifest.
- **schema.graphql**: Contains the GraphQL schema.
- **src/**: Contains the source files.
  - **mappings/**: Contains the mapping functions.
    - **uniswap.ts**: Handles the mappings for the Uniswap contract.
  - **utils/**: Contains utility files.
    - **helper.ts**: Contains helper functions.
- **abis/**: Contains the contract ABI files.
  - **Uniswap.json**: ABI for the Uniwsap contract.
- **generated/**: Contains auto-generated files.
  - **schema.ts**: Type definitions generated from the GraphQL schema.

### Step 3: Defining your GraphQL Entities (`schema.graphql`)

After initializing your subgraph project and setting up your directory structure, the next crucial step is to define your GraphQL entities in the schema. Entities represent and define the data structures that your subgraph will index from Ethereum smart contracts. Let's break down the entities defined in schema.graphql:

```gql
# Define a Transfer type representing the transfer of tokens
type Transfer @entity(immutable: true) {
  id: ID! # Unique identifier for the transfer entity
  from: Account! # Reference to the Account entity sending the tokens
  to: Account! # Reference to the Account entity receiving the tokens
  value: BigInt! # Amount of tokens transferred
  timestamp: BigInt! # Timestamp when the transfer occurred
}

# Define an Account type representing a user account
type Account @entity {
  id: ID! # Unique identifier for the account entity
  sentTransfers: [Transfer!]! @derivedFrom(field: "from") # Array of transfers sent by the account # Use @derivedFrom to create a relationship from Transfer 'from' field
  receivedTransfers: [Transfer!]! @derivedFrom(field: "to") # Array of transfers received by the account # Use @derivedFrom to create a relationship from Transfer 'to' field
  totalSent: BigInt! # Total amount of tokens sent by the account
  totalReceived: BigInt! # Total amount of tokens received by the account
  sentCount: Int! # Number of transfers sent by the account
  receivedCount: Int! # Number of transfers received by the account
}
```

### Transfer Entity

- Purpose: The Transfer entity represents a transfer event on the Ethereum blockchain.
- Fields:
  - id: A unique identifier for each transfer event, combining the transaction hash and log index.
    - from: A reference to the Account entity representing the sender.
    - to: A reference to the Account entity representing the receiver.
    - value: The amount transferred, represented as a BigInt.
    - timestamp: The block timestamp when the transfer occurred, represented as a BigInt.
    - @entity(immutable: true): This directive ensures that the entity's fields cannot be modified once created, reflecting the immutable nature of blockchain data.

### Account Entity

- Purpose: The Account entity represents an Ethereum account involved in transfers.
- Fields:
  - id: A unique identifier for each account, usually the account address.
  - sentTransfers: A list of Transfer entities where this account is the sender.
  - receivedTransfers: A list of Transfer entities where this account is the receiver.
  - totalSent: The total amount sent by this account, represented as a BigInt.
  - totalReceived: The total amount received by this account, represented as a BigInt.
  - sentCount: The number of transfers sent by this account.
    -receivedCount: The number of transfers received by this account.
- Derived Fields:
  - @derivedFrom(field: "from"): This directive indicates that the sentTransfers field should be populated based on the from field of the Transfer entity.
  - @derivedFrom(field: "to"): This directive indicates that the receivedTransfers field should be populated based on the to field of the Transfer entity.

### Step 4: YAML Configuration (`subgraph.yaml`)

To configure your entities for deployment, you need to define them in your subgraph.yaml file. Here’s how you can specify the entities:

```yaml
specVersion: 0.0.5 #The version of the subgraph schema definition
schema:
  file: ./schema.graphql #The location of the GraphQL schema file
dataSources: #The data sources for the subgraph
  - kind: ethereum #The kind of data source, in this case, Ethereum
    name: Uniswap # Name of the data source
    network: mainnet # The Ethereum network to use (mainnet)
    source:
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984" # The contract address for Uniswap
      abi: Uniswap # The ABI (Application Binary Interface) to use for the contract
      startBlock: 20180838 # The block number from which to start indexing events
    mapping: # Specify the kind of mapping (event handlers for Ethereum)
      kind: ethereum/events # The API version to use for the mapping
      apiVersion: 0.0.7 # The API version to use for the mapping
      language: wasm/assemblyscript # The language used for writing mappings (AssemblyScript for WebAssembly)
      entities:
        - Transfer # The entities defined in the GraphQL schema that this data source will map to
      abis:
        - name: Uniswap # Define the ABI for Uniswap
          file: ./abis/Uniswap.json # The path to the ABI file
      eventHandlers:
        - event: Transfer(indexed address,indexed address,uint256) # The event signature to handle (Transfer event)
          handler: handleTransfer # The handler function to call when the event is emitted
      file: ./src/mappings/uniswap.ts # The path to the mapping file containing the handler functions
```

- **specVersion**: Specifies the version of the subgraph manifest specification being used (0.0.5).
- **schema**: Points to the GraphQL schema file (`schema.graphql`) defining entities and types.
- **dataSources**: Configures the data source for indexing Ethereum events from Uniswap on the mainnet.
  - **kind**: Specifies the type of data source (ethereum).
  - **name**: Describes the name of the data source (Uniswap).
  - **network**: Specifies the Ethereum network (mainnet).
  - **source**: Provides details about the Ethereum smart contract (address, abi, startBlock).
  - **mapping**: Defines how Ethereum events are mapped to entities in the subgraph.
    - **kind**: Specifies the type of mapping (ethereum/events).
    - **apiVersion**: Specifies the version of the mapping API (0.0.7).
    - **language**: Specifies the language for writing the mapping (wasm/assemblyscript).
    - **entities**: Lists the entities defined in the GraphQL schema (Transfer).
    - **abis**: Specifies the ABI file used for interacting with the smart contract.
    - **eventHandlers**: Defines event handlers for specific Ethereum events (Transfer).
    - **file**: Points to the TypeScript file containing the mapping logic (./src/mappings/uniswap.ts).

### Step 5: Helper Functions

In src/utils/helper.ts, define helper functions to manage the creation and retrieval of entities:

````ts
import { BigInt, Bytes } from "@graphprotocol/graph-ts"; // Import necessary types from graph-ts
import { Account } from "../../generated/schema"; // Import the Account entity from the generated Uniswap schema

// Helper function to load or create an Account entity
export function getOrCreateAccount(address: Bytes): Account {
  // Attempt to load an existing Account entity from the store using the address
  let account = Account.load(address.toHex());

  // If the Account entity does not exist, create and initialize a new one
  if (account == null) {
    account = new Account(address.toHex()); // Create a new Account entity with the address as ID
    account.totalSent = BigInt.fromI32(0); // Initialize totalSent field to 0
    account.totalReceived = BigInt.fromI32(0); // Initialize totalReceived field to 0
    account.sentCount = 0; // Initialize sentCount field to 0
    account.receivedCount = 0; // Initialize receivedCount field to 0
    account.save(); // Save the newly created Account entity to the store
  }

  // Return the Account entity, either loaded or newly created
  return account as Account;
}```

Helper Functions: These utility functions such as `getOrCreateAccount` are like trusty sidekicks for managing entities within the subgraph's datastore. They are crucial for creating, retrieving, and updating entities, ensuring everything runs smoothly behind the scenes. This ensures entities are correctly instantiated and updated during event processing.
````

### Step 6: Implementing Mapping Functions Logic

````ts
Mapping functions in src/mappings/uniswap.ts are crucial for translating Ethereum smart contract events into GraphQL entities:

import { Transfer as TransferEvent } from "../../generated/Uniswap/Uniswap"; // Import the Transfer event from the Uniswap contract ABI
import { Transfer } from "../../generated/schema"; // Import the Transfer entity from the generated schema
import { getOrCreateAccount } from "../utils/helper"; // Import the helper function to get or create an Account e  ntity

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
}```

Event Handling: handleTransfer listens to TransferEvent emitted by the Uniswap contract.
Unique ID Generation: Uses the transaction hash and log index to ensure unique entity IDs.
Entity Creation: Retrieves or creates Account entities for sender and receiver.
Data Assignment: Maps event parameters to entity fields.
Statistics Update: Updates sender and receiver statistics based on transfer value.
Mapping Functions: Functions like `handleTransfer` act as event handlers for Ethereum smart contract events (TransferEvent). They instantiate new GraphQL entities (Transfer) using event data, update related account entities (`fromAccount` and `toAccount`), and ensure these changes are persistently stored in the subgraph's datastore.
````

## Step 7: Running graph codegen

**_Why You need to Run `graph codegen`_**

After making any changes to your schema, mappings, or subgraph manifest, it's crucial to run graph codegen. This command generates the necessary TypeScript types and code that your mappings rely on to interact with the subgraph's data entities. Skipping this step can result in type errors and unexpected behavior during development and deployment.
How to Run graph codegen

- Open your terminal.
- Navigate to your subgraph's project directory.
- Run the following command:

```bash
graph codegen
```

## Step 8: Generate Types and Build Subgraph

Before deploying your subgraph to The Graph Studio, ensure to generate TypeScript typings and build your subgraph. Together, `graph codegen` prepares your subgraph project by generating TypeScript typings for your subgraph based on your GraphQL schema (`schema.graphql`) and the mappings defined in your project. It analyzes your mappings (typically located in /src/mappings) and generates TypeScript types that correspond to your entities and their fields.

While `graph build` compiles your subgraph and creates the necessary artifacts for deployment. It validates your schema, compiles your mappings into WASM (WebAssembly) modules, and prepares your subgraph for deployment to The Graph's Network or for local deployment on a Graph Node. During this process, it also ensures that all dependencies and configurations specified in your subgraph.yaml file are correctly processed and included.
How to Run graph codegen and graph build

- Open your terminal.
- Navigate to your subgraph's project directory.
- Run the following command:

```bash
graph codegen && graph build
```

## Step 9: Deploying the Subgraph

Deploy your subgraph with the following command from your account in The Graph Studio.

```bash
graph deploy --studio <subgraph-name>
```

## Testing and Queries

The playground in the [The Subgraph Studio](https://thegraph.com/studio/) allows you to test and query your subgraph after deploying it, but before publishing. Once tested, you can publish your subgraph to The Graph's Decentralized Network, leveraging the protocol's robustness to scale the potential of your full-stack dApp!

## Conclusion

Congratulations! You've successfully built and deployed your first subgraph. You can now query your subgraph using The Graph Explorer.

## Summary

In Part 1 of this masterclass, you learned how to:
Set up your subgraph development environment.
Define GraphQL entities and mappings.
Implement helper functions and mapping logic.
Build and deploy your subgraph to The Graph Studio.

In Part 2, we'll expand on these concepts by indexing multiple smart contracts using two DAOs as a use case. Stay tuned!

## Sample Queries

## Query 1: Most Recent Transfers

This query retrieves the five most recent transfers sorted by timestamp in descending order:

```gql
query GetRecentTransfers {
  transfers(orderBy: timestamp, orderDirection: desc, first: 5) {
    id
    from {
      id
    }
    to {
      id
    }
    value
    timestamp
  }
}
```

## Returns

```gql
{
  "data": {
    "transfers": [
      {
        "id": "0xf3a626cdfcfe1562f2465df4fce18ba75abf757526191d7419fd1625d23f0509-149",
        "from": {
          "id": "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43"
        },
        "to": {
          "id": "0x4eb0de411d9001b666bbba8030d913de5625ab1a"
        },
        "value": "6233636700000000000",
        "timestamp": "1720468631"
      },
      {
        "id": "0xb037f89f18cbaf7af41a74e90196df859f62a26eb7b478e6be7c2fd09543b505-31",
        "from": {
          "id": "0x51c72848c68a965f66fa7a88855f9f7784502a7f"
        },
        "to": {
          "id": "0x1d42064fc4beb5f8aaf85f4617ae8b3b5b8bd801"
        },
        "value": "1934976683105875394560",
        "timestamp": "1720468463"
      },
      {
        "id": "0x162f7d067e7de4f10db7dc11985bfebb3330cdb78e5fc4512a115b1d0833c24f-631",
        "from": {
          "id": "0x68d3a973e7272eb388022a5c6518d9b2a2e66fbf"
        },
        "to": {
          "id": "0x1d42064fc4beb5f8aaf85f4617ae8b3b5b8bd801"
        },
        "value": "1065720858947633858632",
        "timestamp": "1720468319"
      },
      {
        "id": "0x0a4a83ffe486424ba8c18ff5e1087fb80c393e0d6ab104139daf77ac147390fd-617",
        "from": {
          "id": "0xa69babef1ca67a37ffaf7a485dfff3382056e78c"
        },
        "to": {
          "id": "0xd3d2e2692501a5c9ca623199d38826e513033a17"
        },
        "value": "231641637524769961951",
        "timestamp": "1720468319"
      },
      {
        "id": "0xe182b0d0984e78d193ab8559e5a0b272df65ff5a65e16526858a225e38ae9efa-256",
        "from": {
          "id": "0x941b4fdb4b1533ab2cc8b90ff0700f658b4aa642"
        },
        "to": {
          "id": "0xec11acc6d90482b9c70cebd04605d0192bd2d8a8"
        },
        "value": "307905080000000000",
        "timestamp": "1720468307"
      }
    ]
  }
}
```

## Query 2: Account with Highest Total Received and Sent

This query fetches the account with the highest total amount received and sent (totalReceived, totalSent):

```gql
query GetAccountWithHighestSentAndReceived {
  highestReceived: accounts(
    orderBy: totalReceived
    orderDirection: desc
    first: 1
  ) {
    id
    totalReceived
    receivedCount
  }
  highestSent: accounts(orderBy: totalSent, orderDirection: desc, first: 1) {
    id
    totalSent
    sentCount
  }
}
```

### Result 2

```gql
{
  "data": {
    "highestReceived": [
      {
        "id": "0xceb69f6342ece283b2f5c9088ff249b5d0ae66ea",
        "totalReceived": "4346430298149661862912400",
        "receivedCount": 7
      }
    ],
    "highestSent": [
      {
        "id": "0xceb69f6342ece283b2f5c9088ff249b5d0ae66ea",
        "totalSent": "4273064450700601552394449",
        "sentCount": 145
      }
    ]
  }
}
```

After my second query, I discovered the same account had sent and received the highest amount so my spidey senses started tingling (LOL)

I decided to dig a little deeper to see it's last seven interactions in transfers and receipts with the highest values and the accounts(IDs) involved (I think I have a bit of OCD)

## Query 3: Top 7 interactions in transfers (totalSent, totalReceived) and the IDs (accounts involved) for a specific account

This query fetches all transfers involving a specific account, identified by its ID (address):

```gql
query GetTop7Interactions {
  account(id: "0xceb69f6342ece283b2f5c9088ff249b5d0ae66ea") {
    id
    totalSent
    totalReceived
    sentCount
    receivedCount
    sentTransfers(orderBy: value, orderDirection: desc, first: 7) {
      to {
        id
      }
      value
      timestamp
    }
    receivedTransfers(orderBy: value, orderDirection: desc, first: 7) {
      from {
        id
      }
      value
      timestamp
    }
  }
}
```

### Result 3

```gql
{
  "data": {
    "account": {
      "id": "0xceb69f6342ece283b2f5c9088ff249b5d0ae66ea",
      "totalSent": "4273064450700601552394449",
      "totalReceived": "4346430298149661862912400",
      "sentCount": 145,
      "receivedCount": 7,
      "sentTransfers": [
        {
          "to": {
            "id": "0xdfe696ff5443a42dd4c53be979e9de4ce6e979c6"
          },
          "value": "313984368071616599889300",
          "timestamp": "1719893471"
        },
        {
          "to": {
            "id": "0xe2cf7f78238cf9e4e329d341fb77dcee088f56c5"
          },
          "value": "129316050200000000000000",
          "timestamp": "1719937439"
        },
        {
          "to": {
            "id": "0xfc2bb1e27c5d6aec85b8b6731999041a7aa6ab3e"
          },
          "value": "109707121825329314672250",
          "timestamp": "1720038575"
        },
        {
          "to": {
            "id": "0xfc2bb1e27c5d6aec85b8b6731999041a7aa6ab3e"
          },
          "value": "109707121825329314672250",
          "timestamp": "1720038599"
        },
        {
          "to": {
            "id": "0xa91d546814feb61eff741007f2bf21e244a633a9"
          },
          "value": "109707121825329314672250",
          "timestamp": "1720038551"
        },
        {
          "to": {
            "id": "0x798b6816978e1b174b0ea69b7be2abbd5fc305d8"
          },
          "value": "109707121825329314672250",
          "timestamp": "1720038443"
        },
        {
          "to": {
            "id": "0x798b6816978e1b174b0ea69b7be2abbd5fc305d8"
          },
          "value": "109707121825329314672250",
          "timestamp": "1720038431"
        }
      ],
      "receivedTransfers": [
        {
          "from": {
            "id": "0xc5e3e60c107da406540611437b35a04f62acd7e9"
          },
          "value": "1226825308183760000000000",
          "timestamp": "1720034591"
        },
        {
          "from": {
            "id": "0xc5e3e60c107da406540611437b35a04f62acd7e9"
          },
          "value": "1132916709238291000000000",
          "timestamp": "1720030811"
        },
        {
          "from": {
            "id": "0xf74cad18819866f07ba83cdc3b53211b45246129"
          },
          "value": "497172139725000000000000",
          "timestamp": "1719901991"
        },
        {
          "from": {
            "id": "0xa1faf10424969a9d5036def19d38d826f864e40d"
          },
          "value": "413605214944582770910600",
          "timestamp": "1719892955"
        },
        {
          "from": {
            "id": "0x5c739d009f42470ae169cc8a576e1831a228157b"
          },
          "value": "413605214944582770910600",
          "timestamp": "1719945239"
        },
        {
          "from": {
            "id": "0x59c31e27700c7bf1338ef05f2b691f20b7cc2a5a"
          },
          "value": "412305711113445321091200",
          "timestamp": "1719892847"
        },
        {
          "from": {
            "id": "0x9478a441115489b1bc33b1c4b1de8bb7fbd315d1"
          },
          "value": "250000000000000000000000",
          "timestamp": "1719851171"
        }
      ]
    }
  }
}
```

I then got a bit more obsessed after noticing it had received only 7 interactions. I decided to dig up the details of these 7 addresses to understand more about their interactions. I think I should stop now before I get sucked in (LOL)

## Query 4

This query retrieves detailed information about the sender accounts for the top 7 transfers received by the specified account, providing a comprehensive view of each sender’s transfer activity and statistics.

```gql
query GetAccountReceivedFrom {
  account(id: "0xceb69f6342ece283b2f5c9088ff249b5d0ae66ea") {
    receivedTransfers(orderBy: value, orderDirection: desc, first: 7) {
      from {
        id
        sentTransfers {
          id
          value
          timestamp
        }
        receivedTransfers {
          id
          value
          timestamp
        }
        totalSent
        totalReceived
        sentCount
        receivedCount
      }
      value
      timestamp
    }
  }
}
```

### Result 4

```gql
{
  "data": {
    "account": {
      "receivedTransfers": [
        {
          "from": {
            "id": "0xc5e3e60c107da406540611437b35a04f62acd7e9",
            "sentTransfers": [
              {
                "id": "0x3a775350a9908cfca1695b064f00c72b007f2538e0e8926a2df2a2f57b4720b4-424",
                "value": "1132916709238291000000000",
                "timestamp": "1720030811"
              },
              {
                "id": "0x776032122b0d745ef52b7c9fecfa65e5d6270af0bcbe67139adabab1d884c845-303",
                "value": "1226825308183760000000000",
                "timestamp": "1720034591"
              }
            ],
            "receivedTransfers": [
              {
                "id": "0x32594afb9395b75f5734bff8cc82c8a4f91d5d28e94a392d05255ce6faa9584b-278",
                "value": "1132916709238291000000000",
                "timestamp": "1720030751"
              },
              {
                "id": "0x97945f5540805abd44b7a2b8d0902de3df13e33289159659573b43eb222a0445-104",
                "value": "1226825308183760000000000",
                "timestamp": "1720034531"
              }
            ],
            "totalSent": "2359742017422051000000000",
            "totalReceived": "2359742017422051000000000",
            "sentCount": 2,
            "receivedCount": 2
          },
          "value": "1226825308183760000000000",
          "timestamp": "1720034591"
        },
        {
          "from": {
            "id": "0xc5e3e60c107da406540611437b35a04f62acd7e9",
            "sentTransfers": [
              {
                "id": "0x3a775350a9908cfca1695b064f00c72b007f2538e0e8926a2df2a2f57b4720b4-424",
                "value": "1132916709238291000000000",
                "timestamp": "1720030811"
              },
              {
                "id": "0x776032122b0d745ef52b7c9fecfa65e5d6270af0bcbe67139adabab1d884c845-303",
                "value": "1226825308183760000000000",
                "timestamp": "1720034591"
              }
            ],
            "receivedTransfers": [
              {
                "id": "0x32594afb9395b75f5734bff8cc82c8a4f91d5d28e94a392d05255ce6faa9584b-278",
                "value": "1132916709238291000000000",
                "timestamp": "1720030751"
              },
              {
                "id": "0x97945f5540805abd44b7a2b8d0902de3df13e33289159659573b43eb222a0445-104",
                "value": "1226825308183760000000000",
                "timestamp": "1720034531"
              }
            ],
            "totalSent": "2359742017422051000000000",
            "totalReceived": "2359742017422051000000000",
            "sentCount": 2,
            "receivedCount": 2
          },
          "value": "1132916709238291000000000",
          "timestamp": "1720030811"
        },
        {
          "from": {
            "id": "0xf74cad18819866f07ba83cdc3b53211b45246129",
            "sentTransfers": [
              {
                "id": "0x4dad199fe5af03dc6c4d0ff3a7715b726e7c062ff7019e3877d98ab2291601a7-318",
                "value": "497172139725000000000000",
                "timestamp": "1719901991"
              }
            ],
            "receivedTransfers": [
              {
                "id": "0x685868831e502b460ba6134ddb207f40ecba8667ac68e63874289a342fefb114-94",
                "value": "497172139725000000000000",
                "timestamp": "1719901931"
              }
            ],
            "totalSent": "497172139725000000000000",
            "totalReceived": "497172139725000000000000",
            "sentCount": 1,
            "receivedCount": 1
          },
          "value": "497172139725000000000000",
          "timestamp": "1719901991"
        },
        {
          "from": {
            "id": "0xa1faf10424969a9d5036def19d38d826f864e40d",
            "sentTransfers": [
              {
                "id": "0x62f68fbe04a071b63b9b0c3e1202eb5dd2298c0a4c67f0e29e70a4006d6fe77c-247",
                "value": "413605214944582770910600",
                "timestamp": "1719892955"
              }
            ],
            "receivedTransfers": [
              {
                "id": "0x7ebcbd1839a4824476151b08bca67319f58d0dd6604f1c1fc4e1e84eddfa1963-140",
                "value": "16667448953359234315600",
                "timestamp": "1719854795"
              }
            ],
            "totalSent": "413605214944582770910600",
            "totalReceived": "16667448953359234315600",
            "sentCount": 1,
            "receivedCount": 1
          },
          "value": "413605214944582770910600",
          "timestamp": "1719892955"
        },
        {
          "from": {
            "id": "0x5c739d009f42470ae169cc8a576e1831a228157b",
            "sentTransfers": [
              {
                "id": "0x536113e134ad14ae989e1be97e5b2ff7a00011a9495f7ae1f2fd0cead33de995-3219",
                "value": "413605214944582770910600",
                "timestamp": "1719945239"
              }
            ],
            "receivedTransfers": [
              {
                "id": "0xa5c2acdc0a8b7baf08973ab804f9d8ba231ba7a664d392aced2b3d9e95dc85ca-141",
                "value": "16667448953359234315600",
                "timestamp": "1719854795"
              }
            ],
            "totalSent": "413605214944582770910600",
            "totalReceived": "16667448953359234315600",
            "sentCount": 1,
            "receivedCount": 1
          },
          "value": "413605214944582770910600",
          "timestamp": "1719945239"
        },
        {
          "from": {
            "id": "0x59c31e27700c7bf1338ef05f2b691f20b7cc2a5a",
            "sentTransfers": [
              {
                "id": "0x69f3108384f6ad8371636ec5d2c9a3f3d5e6ebd6be1777ce8f42d5f14c053c71-97",
                "value": "412305711113445321091200",
                "timestamp": "1719892847"
              }
            ],
            "receivedTransfers": [],
            "totalSent": "412305711113445321091200",
            "totalReceived": "0",
            "sentCount": 1,
            "receivedCount": 0
          },
          "value": "412305711113445321091200",
          "timestamp": "1719892847"
        },
        {
          "from": {
            "id": "0x9478a441115489b1bc33b1c4b1de8bb7fbd315d1",
            "sentTransfers": [
              {
                "id": "0xabd4415b336bbf4d68547229ffcc5c82f668cec8c77a6faed82ef199c782f748-567",
                "value": "250000000000000000000000",
                "timestamp": "1719851171"
              }
            ],
            "receivedTransfers": [
              {
                "id": "0x7b3213e612ce1785cda8a471214d8f35f0231744d01ccc0dbbd9c5faeef570f1-351",
                "value": "250000000000000000000000",
                "timestamp": "1719851051"
              }
            ],
            "totalSent": "250000000000000000000000",
            "totalReceived": "250000000000000000000000",
            "sentCount": 1,
            "receivedCount": 1
          },
          "value": "250000000000000000000000",
          "timestamp": "1719851171"
        }
      ]
    }
  }
}
```

What if I became santa and wanted to reward the top 5 lifetime users of my dApp?

## Query 5

### This query provides a snapshot of the top 5 accounts by lifetime transfers, whether they are sending or receiving tokens

```graphql
query TopAccountsLifetime {
  topSenders: accounts(
    where: { totalSent_not: null }
    orderBy: totalSent
    orderDirection: desc
    first: 5
  ) {
    id
    totalSent
    sentCount
  }
  topReceivers: accounts(
    where: { totalReceived_not: null }
    orderBy: totalReceived
    orderDirection: desc
    first: 5
  ) {
    id
    totalReceived
    receivedCount
  }
}
```

## Result 5

```gql
{
  "data": {
    "topSenders": [
      {
        "id": "0xceb69f6342ece283b2f5c9088ff249b5d0ae66ea",
        "totalSent": "4273064450700601552394449",
        "sentCount": 145
      },
      {
        "id": "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
        "totalSent": "3771322525996224967367645",
        "sentCount": 758
      },
      {
        "id": "0x28c6c06298d514db089934071355e5743bf21d60",
        "totalSent": "3738606268814830000000000",
        "sentCount": 249
      },
      {
        "id": "0x1d42064fc4beb5f8aaf85f4617ae8b3b5b8bd801",
        "totalSent": "3354289694171527390083944",
        "sentCount": 1480
      },
      {
        "id": "0xc5e3e60c107da406540611437b35a04f62acd7e9",
        "totalSent": "2359742017422051000000000",
        "sentCount": 2
      }
    ],
    "topReceivers": [
      {
        "id": "0xceb69f6342ece283b2f5c9088ff249b5d0ae66ea",
        "totalReceived": "4346430298149661862912400",
        "receivedCount": 7
      },
      {
        "id": "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
        "totalReceived": "3838529608228784655116182",
        "receivedCount": 150
      },
      {
        "id": "0x1d42064fc4beb5f8aaf85f4617ae8b3b5b8bd801",
        "totalReceived": "3448983886682133378856203",
        "receivedCount": 1476
      },
      {
        "id": "0x28c6c06298d514db089934071355e5743bf21d60",
        "totalReceived": "2586453345660636149443395",
        "receivedCount": 448
      },
      {
        "id": "0xc5e3e60c107da406540611437b35a04f62acd7e9",
        "totalReceived": "2359742017422051000000000",
        "receivedCount": 2
      }
    ]
  }
}
```
