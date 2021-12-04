import logo from './logo.svg';
import Caver from 'caver-js';
import './App.css';

const COUNNT_CONTRACT_ADDRESS = '0x0B793f5740AbC02E259A6eA8740aAC69d6974de6'
const ACCESS_KEY_ID = 'KASKASKASKASKASKASKASKAS'; // TODO: make secret
const SECRET_ACCESS_KEY = '9abcdabcdabcdabcdabcdabcdabcdabcddabcdhw';
const CHAIN_ID = '1001'; // TESTNET 1001, MAINNET 8217
const COUNT_ABI = '[ { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ]'

const option = {
  headers: [
    {
      name: "Authorization",
      value: "Basic " + Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString('base64')
    },
    {
      name: "x-chain-id", value: CHAIN_ID
    }
  ]
}

const caver = new Caver(new Caver.providers.HttpProvider('https://node-api.klaytnapi.com/v1/klaytn', option));
const CountContract = new caver.contract(JSON.parse(COUNT_ABI), COUNNT_CONTRACT_ADDRESS);
const readCount = async () => {
  const _count = await CountContract.methods.count().call();
  console.log(_count);
}

const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
    console.log("BALANCE", balance)
    return balance;
  })
}

const setCount = async (newCount) => {
  try {
    // set account to use
    const privatekey = '0x1a2s3d4f'
    const deployer = caver.wallet.keyring.createFromPrivateKey(privatekey);
    caver.wallet.add(deployer);
    // send transcation for executing smart contract
    // check result

    const receipt = await CountContract.methods.setCount(newCount).send({
      from: deployer.address,
      gas: "0x4bfd200" // balance will be returned
    })
    console.log(receipt);
  } catch (e) {
    console.log(`[ERROR_SET_COUNT]${e}`);
  }
}

// 1 Get Smart Contract Address
// 2 Link to Smart Contract using caver-js
// 3 Display Result of the Smart Contract on App screen

function App() {
  readCount();
  getBalance('0x933bcb4908bdf20bfc85516cfc48f381d26a689c');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => { setCount(100) }}>setCount 100</button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
