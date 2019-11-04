
var showText = function()
{
	$("#make").hide();
	$("#text").show();
	$("#buttonMake").removeClass("button-hover");
	$("#buttonText").addClass("button-hover");
}


var showMake = function()
{
	window.scrollTo(0, 0);
	$("#text").hide();
	$("#make").show();
	$("#buttonText").removeClass("button-hover");
	$("#buttonMake").addClass("button-hover");
}



