pragma solidity ^0.4.24;

contract Forum {
    struct Post {
        string text;
        address poster;
        uint256 replyingTo;
        bool isForum;
    }
    mapping (uint256=>Post) public posts;
    mapping (uint256=>uint256[]) public postReplies;
    mapping (address=>string) public aliases;
    constructor(uint256 id, string text) public {
        posts[id] = Post(text, msg.sender, id, true);
    }
    function MakePost(uint256 id, string text, uint256 replyingTo, bool isForum) public {
        require(posts[id].poster==0, "Cannot overwrite posts");
        require(posts[replyingTo].poster!=0, "Cannot reply to non-existent posts");
        require(!isForum || posts[replyingTo].isForum, "Cannot make a forum off of a non-forum");
        posts[id] = Post(text, msg.sender, replyingTo, isForum);
        postReplies[replyingTo].push(id);
    }
    function SetAlias(string alias) public {
        aliases[msg.sender] = alias;
    }
}
