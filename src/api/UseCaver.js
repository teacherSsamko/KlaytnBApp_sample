import Caver from 'caver-js';
// import CounterABI from '../abi/counter.abi.json'
import KIP17ABI from '../abi/KIP17TokenABI.json'
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY, CHAIN_ID, NFT_CONTRACT_ADDRESS } from '../constants/index'


const option = {
    headers: [{
            name: "Authorization",
            value: "Basic " + Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString('base64')
        },
        {
            name: "x-chain-id",
            value: CHAIN_ID
        }
    ]
}


const caver = new Caver(new Caver.providers.HttpProvider('https://node-api.klaytnapi.com/v1/klaytn', option));
const NFTContract = new caver.contract(KIP17ABI, NFT_CONTRACT_ADDRESS);

export const fetchCardOf = async(address) => {
    // Fetch balance
    const balance = await NFTContract.methods.balanceOf(address).call();
    console.log(`[NFT Balance]${balance}`);
    // Fetch token IDs
    const tokenIds = []
    for (let i = 0; i < balance; i++) {
        const tokenId = await NFTContract.methods.tokenOfOwnerByIndex(address, i).call();
        tokenIds.push(tokenId);
    }
    // Fetch Token URIs
    const tokenUris = []
    for (let i = 0; i < balance; i++) {
        const tokenUri = await NFTContract.methods.tokenURI(tokenIds[i]).call();
        tokenUris.push(tokenUri);
    }
    console.log(`[NFT TokenIds]${tokenIds}`);
    console.log(`[NFT TokenUris]${tokenUris}`);
    const nfts = [];
    for (let i = 0; i < balance; i++) {
        nfts.push({ uri: tokenUris[i], id: tokenIds[i] });
    }
    console.log(nfts);
    return nfts;

}

export const getBalance = (address) => {
    return caver.rpc.klay.getBalance(address).then((response) => {
        const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
        console.log("BALANCE", balance)
        return balance;
    })
}

// const CountContract = new caver.contract(CounterABI, COUNNT_CONTRACT_ADDRESS);

// export const readCount = async() => {
//     const _count = await CountContract.methods.count().call();
//     console.log(_count);
// }

// export const setCount = async(newCount) => {
//     try {
//         // set account to use
//         const privatekey = '0x4c38c3ad18e81a2bdf62c17cba93c0408ff475d1dcfb9edbb5aec1e9f0130543'
//         const deployer = caver.wallet.keyring.createFromPrivateKey(privatekey);
//         caver.wallet.add(deployer);
//         // send transcation for executing smart contract
//         // check result

//         const receipt = await CountContract.methods.setCount(newCount).send({
//             from: deployer.address,
//             gas: "0x4bfd200" // balance will be returned
//         })
//         console.log(receipt);
//     } catch (e) {
//         console.log(`[ERROR_SET_COUNT]${e}`);
//     }
// }