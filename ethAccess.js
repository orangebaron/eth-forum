if (!web3.isConnected()){
    alert("Please install MetaMask.")
}

const addr = '0xfbc07AAEDBa22c20Cb10189f98f0d2683d56ff71';
const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "Downvote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "text",
				"type": "string"
			},
			{
				"name": "replyingTo",
				"type": "uint256"
			},
			{
				"name": "isForum",
				"type": "bool"
			}
		],
		"name": "MakePost",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "alias",
				"type": "string"
			}
		],
		"name": "SetAlias",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "text",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "Upvote",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "aliases",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "downvoted",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "postReplies",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "posts",
		"outputs": [
			{
				"name": "text",
				"type": "string"
			},
			{
				"name": "poster",
				"type": "address"
			},
			{
				"name": "replyingTo",
				"type": "uint256"
			},
			{
				"name": "isForum",
				"type": "bool"
			},
			{
				"name": "voteTotal",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "upvoted",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

var forumContract = web3.eth.contract(abi).at(addr);



function getReplyList (id,func) {
	var replies = [];
	var done = false;
	function getReply(num) {
		forumContract.postReplies(id,num, function(a,b) {
			if (b.c[0]==0) { func(replies); return; }
			replies.push(b.c[0]);
			getReply(num+1);
		});
	};
	getReply(0);
}

function getMoreInfo(idlist, func){
	var Info = [];
	function getInfo(counter) {
		if(counter==-1) {func(Info); return;}
		forumContract.posts(idlist[counter], function(a,b) {
			b[2] = b[2].c[0];
			b.push(idlist[counter]);		
			Info.push(b);
			getInfo(counter-1);
		});
	};
	getInfo(idlist.length-1);
}

function getAliases(postList, func){
	function getAlias(counter){
		if(counter==-1) {func(postList); return;}
		forumContract.aliases(postList[counter][1],function (a,b) {
			postList[counter].push(b);
			getAlias(counter-1);
		});
	};
	getAlias(postList.length-1);
}

function actOnReplyList(id,func) {
	getReplyList(id,function(a){getMoreInfo(a,function(a){getAliases(a, func)})}); //first element is the text, second the address of sender, third the parent address, and fourth is whether it's a forum, fifth is ID, sixth is alias most recent at 0
}

function makePost(id, text, replyingTo, isForum) {
	forumContract.MakePost(id, text, replyingTo, isForum, {value: 0, gas: 200000}, function(err, result){});
}
function upvote(id){
	forumContract.Upvote(id, {value: 0, gas: 200000}, function(err, result){});
}
function downvote(id){
	forumContract.Downvote(id, {value: 0, gas: 200000}, function(err, result){});
}
