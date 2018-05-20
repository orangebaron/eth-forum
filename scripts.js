$(document).ready(function(){
	var displayLimit=7;
	function drawReplies(posts) {
		if (posts.length==0) { return; }
		var startFrom = 1;
		if (posts[0][2] == 880654) { startFrom = 0; }
		var numPosts = displayLimit>posts.length ? posts.length : displayLimit;
		for (var i=startFrom;i<numPosts+startFrom;i++) {
			var elem = document.createElement('div');
			$(elem).css('position','absolute');
			if (posts[i-startFrom][3]) {
				elem.innerHTML = '<div class = "imageContainer">' + '<br>' +posts[i-startFrom][5] + ' | ' + (posts[i-startFrom][4].s*posts[i-startFrom][4].c[0])+ '<p style="display: block; padding-left: 33px; padding-right: 33px; width: 50%; left:25%; font-size:1em;">' + posts[i-startFrom][0] + '</p>' + posts[i-startFrom][6]+'</div>';

				$(elem).addClass('circle');
				$(elem).css('color', '#ffffff');
				$(elem).css('overflow', 'hidden');
				$(elem).css('-webkit-column-width', '75%');
				$(elem).css('column-width', '75%');
			} else {
				elem.innerHTML = '<p style = "border:2px; border-style: solid; border-color: #ffffff;position:absolute;top:30%;">' + posts[i-startFrom][5] + ' | ' + (posts[i-startFrom][4].s*posts[i-startFrom][4].c[0])+ '<br>' + posts[i-startFrom][6] + '<br>'+ posts[i-startFrom][0] + '</p>';
				
				$(elem).css('color', '#ffffff'); 
				$(elem).css('background-color','transparent');
			}
			$(elem).css('text-align','center');
			$(elem).addClass('surrounding');
			elem.id = posts[i-startFrom][5];
			$(elem).css('margin','-75px 0 0 -75px');
			$(elem).css('width','150px');
			$(elem).css('height','150px');
			$(elem).css('font-size','9.4pt');
			console.log(numPosts+startFrom);
			$(elem).css('top',String(
				50+(30*Math.sin(6.28318530718*i/(numPosts+startFrom)))
			)+'%');
			$(elem).css('right',String(
				50+(30*Math.cos(6.28318530718*i/(numPosts+startFrom)))
			)+'%');
			document.getElementsByTagName('body')[0].appendChild(elem);
		}
	}

	function moveLeft(x) {
		x.animate({top:"50%",
			left: "30%",
			width: "100px",
			height: "100px",
			margin: "-25px 0 0 -25px",
			fontSize: "6.2pt"
		});
	}
	function moveCenter(x){
		x.animate({
			top:"50%",
			left:"50%",
			width: "250px",
			height: "250px",
			margin: "-175px 0 0 -175px",
			fontSize: "15.7pt"
		});
	}
	var numOfLefts = 0;
	function boxClick(){
	  $(".surrounding").on("click",function(){
		moveLeft($(".centered"));
		moveCenter($(this));

		for (var i=numOfLefts;i>0;i--) {
			$(".left"+String(i)).animate({left: String(3-(i+2))+"0%"});
			$(".left"+String(i)).removeClass("left"+String(i)).addClass("left"+String(i+1));
		}
		if (numOfLefts>0){
			$(".left").off("click");
			$(".left").animate({left: "20%"});
			$(".left").removeClass("left").addClass("left1");
		}
		numOfLefts++;

		$(".centered").removeClass("centered").addClass("left");
		$(this).removeClass("surrounding").addClass("centered");
		$(".surrounding").remove();
		$(this).off("click");
		actOnReplyList(parseInt(this.id),function(a){drawReplies(a);leftClick();boxClick();});
	  });
	}
	function leftClick(){
	  $(".left").on("click",function(){
		$(".centered").remove();
		moveCenter($(this));

		$(this).removeClass("left").addClass("centered");

		if (numOfLefts > 1) {
			$(".left1").animate({left: "30%"});
			$(".left1").removeClass("left1").addClass("left");
		}
		if (numOfLefts > 2) {
			for (var i=2;i<numOfLefts;i++) {
				$(".left"+String(i)).animate({left: String(3-(i-1))+"0%"});
				$(".left"+String(i)).removeClass("left"+String(i)).addClass("left"+String(i-1));
			}
		}
		numOfLefts--;
		
		

		$(this).off("click");
		$(".surrounding").remove();
		actOnReplyList(parseInt(this.id),function(a){drawReplies(a);leftClick();boxClick();});
	  });
	}

	actOnReplyList(880654,console.log);
	actOnReplyList(880654,function(a){drawReplies(a);boxClick();});
})

dragElement(document.getElementById(("mydiv")));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }

  forumContract.aliases(web3.eth.accounts[0],function(a,b){
  	if (b=='') {
		var val = prompt('Please choose a username.');
		if (val != null) {
			forumContract.SetAlias(val, {value: 0, gas: 200000}, function(err, result){});
		}
	}
  })
}

