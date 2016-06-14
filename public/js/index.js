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

function getListName(listName, userName){
	var len = userName.length;
	return listName.substr(len);
}
$(document).ready(function(){
	$.get("/getAllList", function(data, status){
		var list = data.results;
		for(var i=0;i<list.length;i++)
		{
			var $listDiv = $("<div class=\"accordion-heading\">"
				+ "<a class=\"accordion-toggle list-name\" data-toggle=\"collapse\" data-parent=\"#accordion2\" href=\"#" + list[i].listName + "List\">"
				+ "<span class=\"glyphicon glyphicon-chevron-right\"></span>"
				+ list[i].listName
				+ "</a>"
				+ "</div>"
				+ "<div id=\"" + list[i].listName + "List\" class=\"accordion-body collapse\" style=\"height: 0px; \">"
				+	"<div class=\"accordion-inner\">"
				+		"<table class=\"table table-hover\">"
				+		  "<tbody>"
				+		  "</tbody>"
				+		"</table>"
				+	"</div>"
				+ "</div>");
			$("#contacts-list-group").append($listDiv);
		}
		$.get("/getFriendInfo", function(data, status){
			console.log(data);
			var list = data.results;
			for(var i=0;i<list.length;i++)
			{
				var src = list[i].avatar;
				var userName = list[i].friendName1;
				var listName = getListName(list[i].friendList2, userName);
				var $newRow = "<tr><td><img class=\"img-circle chat-avar\", src=\"" + src + "\" width=\"100%\"></td>"
							+ "<td><p>" + userName + "</p></td></tr></td>";
				$("#" + listName + "List div table tbody").append($newRow);
				// $("#friendList div table tr:last").after(newRow);
			}
			$("a.accordion-toggle").click(function(){
				$(this).find("span").toggleClass("glyphicon-chevron-right");
				$(this).find("span").toggleClass("glyphicon-chevron-down");
			});
		});
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

	});
});

$(document).ready(function(){
	$("#send").click(function(){
		var userName = document.getElementById("searchAFriendUserName").value;
		$.post("/requestAddAFriend", {
		"userName": userName,
		"info":  document.getElementById("sendFriendRequest").value
		}, function(data){
			//add the friend into the list
			// var src = $("#searchAFriendAvatar").attr("src");
			// var newRow = "<td><img class=\"img-circle chat-avar\", src=\"" + src + "\" width=\"100%\"></td>"
			// 			+ "<td><p>" + userName + "</p></td></tr>";
			// $("#friendList div table tr:last").after(newRow);
		});
	});
});























//
