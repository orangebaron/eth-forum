pragma solidity ^0.4.24;

contract Forum {
    struct Post {
        string text;
        address poster;
        uint256 replyingTo;
        bool isForum;
        int voteTotal;
    }
    mapping (uint256=>Post) public posts;
    mapping (uint256=>uint256[]) public postReplies;
    mapping (address=>string) public aliases;
    mapping (uint256=>mapping(address=>bool)) public upvoted;
    mapping (uint256=>mapping(address=>bool)) public downvoted;
    constructor(uint256 id, string text) public {
        posts[id] = Post(text, msg.sender, id, true, 0);
    }
    function MakePost(uint256 id, string text, uint256 replyingTo, bool isForum) public {
        require(posts[id].poster==0, "Cannot overwrite posts");
        require(posts[replyingTo].poster!=0, "Cannot reply to non-existent posts");
        require(!isForum || posts[replyingTo].isForum, "Cannot make a forum off of a non-forum");
        posts[id] = Post(text, msg.sender, replyingTo, isForum, 0);
        postReplies[replyingTo].push(id);
    }
    function SetAlias(string alias) public {
        aliases[msg.sender] = alias;
    }
    function Upvote(uint256 id) public {
        require(!upvoted[id][msg.sender], "Upvoting an already-upvoted post");
        upvoted[id][msg.sender] = true;
        posts[id].voteTotal++;
        if (downvoted[id][msg.sender]) {
            downvoted[id][msg.sender] = false;
            posts[id].voteTotal++;
        }
    }
    function Downvote(uint256 id) public {
        require(!downvoted[id][msg.sender], "Downvoting an already-downvoted post");
        downvoted[id][msg.sender] = true;
        posts[id].voteTotal--;
        if (upvoted[id][msg.sender]) {
            upvoted[id][msg.sender] = false;
            posts[id].voteTotal--;
        }
    }
}
