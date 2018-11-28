import Web3 from 'web3';

var web3provider = undefined

if (typeof Web3 != 'undefined') {
    web3provider = Web3.currentProvider
    console.log("Metamask provider")
  } else {
    alert("Please, install Metamask plugin.")
    web3provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545")
    console.log("Ganache provider")

  }

  var web3 = new Web3(web3provider)

  export default web3 

  console.log("Default Account:" + web3.givenProvider.selectedAddress)
  console.log(web3)

  console.log(web3.givenProvider.networkVersion)
  var netId = web3.givenProvider.networkVersion
  switch (netId) {
    case "1":
      console.log('This is mainnet')
      break
    case "2":
      console.log('This is the deprecated Morden test network.')
      break
    case "3":
      console.log('This is the ropsten test network.')
      break
    case "4":
      console.log('This is the Rinkeby test network.')
      break
    case "42":
      console.log('This is the Kovan test network.')
      break
    default:
      console.log('This is an unknown network.')
  }

