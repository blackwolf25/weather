(function($, document, window){
	
	$(document).ready(function(){

		// Cloning main navigation for mobile menu
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		// Mobile menu toggle 
		$(".menu-toggle").click(function(){
			$(".mobile-navigation").slideToggle();
		});

		var map = $(".map");
		var latitude = map.data("latitude");
		var longitude = map.data("longitude");
		if( map.length ){
			
			map.gmap3({
				map:{
					options:{
						center: [latitude,longitude],
						zoom: 15,
						scrollwheel: false
					}
				},
				marker:{
					latLng: [latitude,longitude],
				}
			});
			
		}
	});

	const APP_ID = "439d4b804bc8187953eb36d2a8c26a02";
    
    	function getLocation () 
		{		
			if ("geolocation" in navigator){ 
				navigator.geolocation.getCurrentPosition(function(position){ 
					var latCurrent = parseFloat(position.coords.latitude);
					var lonCurrent = parseFloat(position.coords.longitude);
					$.getJSON("https://raw.githubusercontent.com/blackwolf25/location-city-vietnam/master/locaton-city", function(result){
				  		$.each(result, function(i, field){
				    		var latCity = parseFloat(field.coord.lat);
				    		var lonCity = parseFloat(field.coord.lon);

				    		if((Math.abs(latCity - latCurrent)) < 0.05 && (Math.abs(lonCity - lonCurrent)) < 0.05) {

				    			$.ajax({
					                url : "https://openweathermap.org/data/2.5/weather?id="+field.id+"&units=metric&appid="+APP_ID,
					                type : "get", 
					                dateType:"json", 
					               
					                success : function (result){
					                    // Sau khi gửi và kết quả trả về thành công thì gán nội dung trả về
					                    // đó vào thẻ div có id = result
					                    $('#temper').html(result.main.temp);
					                    $('#city').html(result.name);
					                }
					            });

				    		}
				  		});

					});
			
				});
			} 
		}	
   		
$.LoadingOverlay("show");

	$(window).load(function(){
			setTimeout(function(){
				$.LoadingOverlay("hide");
			}, 3000);
			getLocation();
	});

})(jQuery, document, window);