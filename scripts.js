$(document).ready(function(){
	var displayLimit=7;
	function drawReplies(posts) {
		if (posts.length==0) { return; }
		var startFrom = 1;
		if (posts[0][2] == 880654) { startFrom = 0; }
		var numPosts = displayLimit>posts.length ? posts.length : displayLimit;
		for (var i=startFrom;i<numPosts+startFrom;i++) {
			var elem = document.createElement('div');
			if (posts[i-startFrom][3]) {
				elem.innerHTML = '<input type="button" value="'+posts[i-startFrom][0]+'"><img src="circle-png-7.png"></img></input>';
				$(elem).addClass('circle');
			} else {
				elem.innerHTML = posts[i-startFrom][0];
				$(elem).css('text-align','center');
				$(elem).css('background-color','#aaccff');
			}
			$(elem).css('position','absolute');
			$(elem).css('margin','-75px 0 0 -75px');
			$(elem).css('width','150px');
			$(elem).css('height','150px');
			console.log(numPosts+startFrom);
			$(elem).css('top',String(
				50+30*Math.sin(6.28318530718*i/(numPosts+startFrom))
			)+'%');
			$(elem).css('right',String(
				50+30*Math.cos(6.28318530718*i/(numPosts+startFrom))
			)+'%');
			document.getElementsByTagName('body')[0].appendChild(elem);
		}
	}
	function moveLeft(x) {
		x.animate({top:"50%",
			left: "175px",
			width: "50px",
			height: "50px",
			margin: "-25px 0 0 -25px"
		});
	}
	$("#center").click(function(){
		moveLeft($(this));
	});
	actOnReplyList(880654,console.log);
	actOnReplyList(880654,drawReplies);
})
