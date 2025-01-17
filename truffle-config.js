/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

 const HDWalletProvider = require('@truffle/hdwallet-provider');
// const infuraKey = "fj4jll3k.....";
//
 const fs = require('fs');
 const mnemonic = fs.readFileSync(".secret").toString().trim();
//var okexPrivateKeys = [
//    "d0e96ff86850ca27a7911d237a0d6335370ea271e99c65d2121b67ab70748b75"
//]
var privateKeys = [
    "0x5c5db1ce2016982241455768db28f014e3d939acdca70c939a18d9cc8255cbfe",
    "7cf474d9206fc1522937597042e05ddfe61bd12c56d0c65ffff96faf57e0116f",
    "57aa4b1fa4f1bc6824d8ed3cea202b4753e0734ccd94a4a7ba941a3f46739cce",
    "320a11f656e35d00cd4a9e0003d7b069660eedf3e7fc1a545604782dc05c34bd"
];

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {

     mainnet: {
          provider: () => new HDWalletProvider(mnemonic, `http://onto-eth.ont.io:10331`),
          port: 10331,            // Standard Ethereum port (default: none)
          network_id: 1,       // Any network (default: none)
          gas: 8000000,           // Gas sent with each transaction (default: ~6700000)
          gasPrice: 2000000000,  // 20 gwei (in wei) (default: 100 gwei)
          confirmations: 3,    // # of confs to wait between deployments. (default: 0)
          timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
          skipDryRun: true,
          networkCheckTimeout: 100000000
      },
      okex: {
          provider: () => new HDWalletProvider(mnemonic, `https://exchaintestrpc.okex.org`),
          network_id: 65,
          confirmations: 4,
          skipDryRun: true,
          networkCheckTimeout: 100000000,
          gas: 8000000,           // Gas sent with each transaction (default: ~6700000)
          gasPrice: 50000000000,  // 20 gwei (in wei) (default: 100 gwei)
      },
      kovan: {
          provider: () => new HDWalletProvider(privateKeys, `https://kovan.infura.io/v3/d87255a6627542eba4eaa9d5278832e0`),
          network_id: '*',       // kovan's id
          gas: 8000000,        // kovan has a lower block limit than mainnet
          gasPrice: 10000000000,//10
          confirmations: 3,    // # of confs to wait between deployments. (default: 0)
          timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
          skipDryRun: true,
          networkCheckTimeout: 100000000
      },
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: 5777,       // Any network (default: none)
     gas: 6721975,           // Gas sent with each transaction (default: ~6700000)
     gasPrice: 2000000000,  // 20 gwei (in wei) (default: 100 gwei)
    },
    // Another network with more advanced options...
    // advanced: {
    // port: 8777,             // Custom port
    // network_id: 1342,       // Custom network
    // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
    // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    // from: <address>,        // Account to send txs from (default: accounts[0])
    // websockets: true        // Enable EventEmitter interface for web3 (default: false)
    // },
    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    // ropsten: {
    // provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/YOUR-PROJECT-ID`),
    // network_id: 3,       // Ropsten's id
    // gas: 5500000,        // Ropsten has a lower block limit than mainnet
    // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // },
    // Useful for private networks
    // private: {
    // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
    // network_id: 2111,   // This network is yours, in the cloud.
    // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
       version: "0.8.1",    // Fetch exact version from solc-bin (default: truffle's version)
       docker: false,        // Use "0.5.1" you've installed locally with docker (default: false)
       settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
        // evmVersion: "byzantium"
       }
    }
  }
};
