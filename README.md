# Subgraph Masterclass - Beginner - L1

Welcome to the Beginner Level of the Subgraph Development Masterclass. In this stage, you will learn the basics of subgraph development using The Graph. This tutorial will guide you through the process of setting up your development environment, creating your first subgraphs, and deploying them.

## Prerequisites

Before starting, make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [Graph CLI](https://github.com/graphprotocol/graph-cli)

## Step 1: Setting Up the Development Environment

1. Create a new project directory:
    ```bash
    mkdir my-first-subgraph
    cd my-first-subgraph
    ```

2. Initialize a new subgraph project:
    ```bash
    graph init --from-contract 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984 --network mainnet my-first-subgraph
    ```

## Step 2: Understanding the Subgraph Structure

The initialized project contains the following structure:
- **subgraph.yaml:** Defines the subgraph manifest. It outlines the data sources, ABI files, event handlers, and mappings.
- **schema.graphql:** Contains the GraphQL schema. This defines the data structure and relationships for the entities that your subgraph will index.
- **src/uniswap.ts:** Contains the mapping functions. These functions handle events emitted by the smart contract, transforming the event data into entities defined in the schema.
- **abis/**: Contains the contract ABI files. These files define the contract's functions and events, enabling the subgraph to understand and decode the data emitted by the contract.

Here is the YAML configuration for the subgraph:

```yaml
specVersion: 0.0.5
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum
    name: Uniswap
    network: mainnet
    source:
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
      abi: Uniswap
      startBlock: 20180838
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.7
      language: wasm/assemblyscript
      entities:
        - Transfer
      abis:
        - name: Uniswap
          file: ./abis/Uniswap.json
      eventHandlers:
        - event: Transfer(indexed address,indexed address,uint256)
          handler: handleTransfer
      file: ./src/uniswap.ts


 ## Step 3:
