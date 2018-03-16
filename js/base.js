$(window).ready(function(){
	//小屏下点击出现和隐藏菜单栏
	$(".btn-mobile").click(function(){
		$(".nav-mobile").slideToggle();
	});
	//屏幕大小改变隐藏菜单栏
	$(window).resize(function(){
		$(".nav-mobile").hide();
	});
	//刷新后判断返回顶部按钮是否出现
	if($(window).scrollTop()>200){
		$("#gotop").css("display","block");
	};
	//滚动出现返回顶部按钮
	$(window).scroll(function(){
		if($(window).scrollTop()>200){
			$("#gotop").fadeIn();
		}else{
			$("#gotop").fadeOut();
		}
	});
	//点击滚回顶部
	$("#gotop").click(function(){
		$("html,body").animate({scrollTop:0}, 500);
	});	
})