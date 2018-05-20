$(document).ready(function(){
	boxes=5;
	function makeBox(posts){
		for (var i=1;i<boxes+1;i++){
			var box = document.createElement('div');
			$(box).addClass('box');
			$(box).attr('id', 'b' + i);
			$(box).css('top',String(
				50+30*Math.sin(6.28318530718*i/(boxes+1))
			)+'%');
			$(box).css('right',String(
				50+30*Math.cos(6.28318530718*i/(boxes+1))
			)+'%');
			box.innerHTML = posts[i-1][1];
			document.getElementsByTagName('body')[0].appendChild(box);
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
	function moveCenter(x){
		x.animate({
			top:"50%",
			left:"50%",
			width: "10px"
		});
	}
	makeBox([['','a'],['','b'],['','c'],['','d'],['','e']]);
	$(".box").click(function(){		
		moveLeft($(".centered"));
		moveCenter($(this));
		$(this).attr('class', 'centered');
		$(".box").remove();
	});
})
