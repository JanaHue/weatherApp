	$(function(){
		var grabWeather = function(city){
			var hotPocket = encodeURI(city);

			var url = "http://api.wunderground.com/api/63dae8bbfe95a2b8/conditions/q/"+ hotPocket +".json"

			$.ajax(url,{
				type  :  "GET",
				dataType  :  "jsonp",
				success  :  function(data){
					if(!data.current_observation) {
						$("p.error").addClass("show");
						$("p.error").text('Please be super specific, ie. "Toronto, Canada"');
						$("h1").text("");
						$("h2").text("");
						$("h3").text("");

						return false;
					}
					console.log(data);
					var w = data.current_observation;
					var wind = w.wind_kph;
					var temp = w.temp_c;
					var uv = w.UV;
					var precip = w.precip_today_metric;
					var mainText;
					var subText;
					var subSubText;


					if (temp < 0 && (precip == 0 || precip == "--")) {
						console.log('2');
						mainText = "Looks like a dry winter day."
						subText = "a scarf, mittens, a toque and a parka."
						subSubText = "Boots are optional."
					};

					if (temp < -25) {
						console.log('1');
						mainText = "Yikes! It's a cold one..."
						subText = "everything warm that you own"
						subSubText = "Just don't bother"
					};

					
					if (temp < 0 && precip > 0) {
						console.log('3');
						mainText = "Damn, that snow is really coming down"
						subText = "Sorels and a parka!"
						subSubText = "Mitts, scarf and a toque. Duh."
					};

					if (precip > 0 && temp < 3 && temp >= -2) {
						console.log('4');
						mainText = "Eww, it's slushy and gross..."
						subText = "your wellies, mittens and a toque"
						subSubText = "an umbrella may help you out"
					};
					
					if (precip > 0 && temp >= 3) {
						console.log('5');
						mainText = "It's rainy out there";
						subText = "galoshes";
						subSubText = "Don't forget an umbrella!"
					};

					if (wind > 40 && temp > 3 && temp <= 18 && (precip == 0 || precip == "--")) {
						console.log('6');
						mainText = "AHHH!! It's a WINDSTORM!"
						subText = " a windbreaker and sneakers today"
						subSubText = "It's not actually a windstorm"
					};

					if (wind < 40 && temp > 3 && temp <= 18 && (precip == 0 || precip == "--")) {
						console.log('6.5');
						mainText = "It's moderate today"
						subText = "sneakers and a light coat"
						subSubText = "Today is going to be a very good day"
					};

					if (temp > 18 && temp <= 30 && precip == 0 && wind < 40) {
						console.log('7');
						mainText ="What a beautiful day!"
						subText = "sandals"
						subSubText = "But you might want pants too..."
					};

					if (temp > 30) {
						console.log('8');
						mainText = "It's a beautiful day!"
						subText = "nothing"
						subSubText = "Public nudity is illegal"
					};

					if (uv > 2) {
						console.log(uv);
						sunscreen = "Yikes! That UV index is extreme. Don't forget your sunscreen!";
						$(".overlay").fadeIn(100);

					};

					var $closeIt = function(){
						$(".overlay").fadeOut();
					}
					
					$("body").on("click", function(e){
						if($(e.target).hasClass("close")) {
							$closeIt();
						}
					});

					$(document).on("keydown", function(e){
						if (e.which == 27) {
							$closeIt();
						}
					});

					$("h1").text(mainText);
					$("h2").text("You should wear " + subText);
					$("h3").text("Wisdom says: " + subSubText);
				} // end success function within object
			});//end ajax 
		}; //end grab weather
			$("form.city").on("submit", function(e){
				e.preventDefault();
				var city = $("input[type=text]").val();
				grabWeather(city);
				$("form").addClass("result");
				$("h1").addClass("show");
				$("h2").addClass("show");
				$("h3").addClass("show");
				$("p.error").removeClass("show");
			});
	
	}); // end doc ready
