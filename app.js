require('dotenv/config')
const express = require('express')
const Web3 = require('web3');
const web3 = new Web3('https://sepolia.infura.io/v3/e41ff617a4344dd784fd4e42fadfd548');
const crypto = require('crypto')
const buffer = require('buffer')
const contractAddress = '0x75aF7066bbB0e791E4424228f94d552274422f6c'

const contractABI = [
	{
		"inputs": [],
		"name": "acceptOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkCancelled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkFulfilled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkRequested",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_requestId",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "_currString",
				"type": "string"
			}
		],
		"name": "fulfill",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "requestLatestPost",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			}
		],
		"name": "RequestLatestPost",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawLink",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "counter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "description",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "signature",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "title",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const contract = new web3.eth.Contract(contractABI, contractAddress)

const app = express()

async function getInfo() {
    const title = await contract.methods.title().call()
    const description = await contract.methods.description().call()
    const signature = await contract.methods.signature().call()
    const arr = new Array()
    arr.push(title)
    arr.push(description)
    arr.push(signature)
    return arr
}

const public_key = process.env.PUBLIC_KEY
const signing_algorithm = 'sha256'
const format_string = 'hex'
function verifySignature(title, description, signature, public_key, signing_algorithm, format_string) {
    let verifier = crypto.createVerify(signing_algorithm)
    verifier.update(Buffer.from(title))
    verifier.update(Buffer.from(description))
    verifier.end()
    const isValid = verifier.verify(public_key, signature, format_string)
    return isValid

}

app.get('/', async (req,res) => {
        const strings = await getInfo()
        const title = strings[0]
        const description = strings[1]
        const signature = strings[2]
        const isValid = verifySignature(title,description,signature,public_key,signing_algorithm,format_string)
        let response = "<p>Title: " + title + "<p>"
        response+= "<p>Description: " + description + "<p>"
        response+= "<p>Signature: " + signature + "<p>"
        if (isValid) {
            response+="<p>Valid Signature" + "<p>"
            res.send(response)
        } else {
            response+="<p>False signature" + "<p>"
            res.send(response)
        }
    }
)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})