$(document).ready(function(){
	function makeBox(boxes){
		for (var i=0;i<boxes;i++){
			var box = document.createElement('div');
			$(box).addClass('box');
			$(box).css('top',String(
				50+30*Math.sin(6.28318530718*i*2/boxes)
			)+'%');
			$(box).css('right',String(
				50+30*Math.cos(6.28318530718*i*2/boxes)
			)+'%');
			box.innerHTML = 'w0w';
			document.getElementsByTagName('body')[0].appendChild(box);
		}
	}
	$("#centered").click(function(){
		$(this).animate({left: "50px",width: "50px", height: "50px"});
	});
	makeBox(5);
})
