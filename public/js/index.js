$(document).ready(function(){
	$("a.accordion-toggle").click(function(){
		$(this).find("span").toggleClass("glyphicon-chevron-right");
		$(this).find("span").toggleClass("glyphicon-chevron-down");
	});
});

/*set the tab color*/
$(document).ready(function(){
	$(".nav-tabs li a").click(function(){
		$(".nav-tabs li a").css("color", "rgb(255, 255, 255)");
		$(this).css("color", "rgb(100, 185, 60)");
	});
});

$(document).ready(function(){
	$.get("/getUserInfo", function(data, status){
		console.log(data);
		console.log(data.avatar);
		$(".nav-user-avar").attr("src", data.avatar);
		$(".user-avar").attr("src", data.avatar);
		console.log($("#user-name"));
		$("#user-name").text(data.userName);
	});
});


$(document).ready(function(){
	$("#logout").click(function(){
		$.get("/auth/logout", function(data, status){
			window.location.href = "/";
		});
	});
});
/*
*@brief Add a list
*/
// $(document).ready(function(){
// 	$.get("/getUserInfo", function(data, status){
//
// 	});
// });

/**/
$(document).ready(function(){
	$("#search").click(function(){
		var userName = document.getElementById("searchAFriendUserName").value;
		if(userName.length == 0)
		{
			$("#searchAFriendPanel").css("display", "none");
			return;	//TODO
		}
		$.post("/userSearch", {
			"userName": userName
		}, function(data){
			if(data.user != null){
				$("#searchAFriendAvatar").attr("src", data.user.avatar);
				// $("#searchAFriendGetUserName").text(data.user.userName);
				// var userName = document.getElementById("searchAFriendGetUserName").value;
				// console.log(userName);
				$("#searchAFriendPanel").css("display", "inline");
			}else{
				$("#searchAFriendPanel").css("display", "none");
			}
		});
	})

});

$(document).ready(function(){
	$("#searchAFriendAdd").click(function(){
		var userName = document.getElementById("searchAFriendUserName").value;
		console.log(userName);
		$("#searchModal").modal("hide");
		$("#addAFriendModal").modal("show");
		$("#send").click(function(){
			$.post("/requestAddAFriend", {
			"userName": userName,
			"info":  document.getElementById("sendFriendRequest").value
			}, function(data){

			});
		});
	});
});

$(document).ready(function(){

});























//
