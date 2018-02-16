$(document).ready(function(){
	//LOAD FUNCITON CALLS
	$("#fullpage").fullpage();
	startTime();
	
	
	//Global Variables
	var bgColors = ["#ff71ce", "#01cdfe", "#05ffa1", "#b967ff", "#fffb96"];
	
	//BG Color Change
	var changeBgColor = function(){
		setInterval(function(){
			var randomColor = Math.ceil(Math.random() * bgColors.length),
            newColor = bgColors[randomColor];
			$(".section.active").css("background-color", newColor);
		}, 8000);
	}();
	
	//GET USER LOCATION
	var getWeather = function(){
		var lat, longit, url, weatherIcon, temp;
		var apiKey = "eb416ee9b7f845d9f017f0b930ed2053";
		
		$.getJSON("https://galvanize-cors-proxy.herokuapp.com/http://freegeoip.net/json/", function(location){
			lat = location.latitude;
			longit = location.longitude;
			url = "https://galvanize-cors-proxy.herokuapp.com/https://api.darksky.net/forecast/" + apiKey + "/" + lat + "," + longit;
			$.getJSON(url, function(data){
				weatherIcon = data.currently.icon;
				temp = data.currently.temperature;
				var skycons = new Skycons();
				skycons.add(icon1, weatherIcon);
				skycons.play();
				skycons.color = "white";
				
			});
		});
	}();
		
}); 



//FUNCTIONS
	
	var dateChecked = false,
		months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	//CLOCK/TIME
	function startTime(){
		var today = new Date(),
			hr = today.getHours(),
			min = today.getMinutes(),
			day = today.getDate(),
			month = months[today.getMonth()];
			year = today.getFullYear();
		if(!dateChecked){
			$("#today-date").html(month + " " + day + ", " + year);
			dateChecked = true;
		}
		ap = (hr < 12) ? "<span>AM</span>" : "<span>PM</span>";
		hr = (hr == 0) ? 12 : hr;
		hr = (hr > 12) ? hr - 12 : hr;
		//Add a zero in front of numbers < 10
		min = checkTime(min);
		$("#clock").html(hr + " : " + min + " " + ap);
		var time = setTimeout(function(){ startTime() }, 500);	
	}
	function checkTime(i){
		if(i < 10) {
			i = "0" + i;
		}
		return i;
	}