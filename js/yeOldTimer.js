/*
*
*	yeOldTimer.js
*	https://github.com/joelcardinal/yeOldTimer
*	jQuery +1.7 plugin
*
*	    _--_
*	     OO
*	   / \ \	[0]:[0]:[0]:[0]
*	/M   /  \
*	|   \ | M
*	|    \|
*	    = =
*
* 	Copyright 2015 Joel Cardinal
*	joelcardinal.com
*	Released under the MIT license
*	https://opensource.org/licenses/MIT
*
*/

(function($) {
 
    $.yeOldTimer = function( options ) {
 
        var settings = $.extend({
			/*
            *	These are the default settings.
			*
			*	utcOffset: Denver MDT -6 hours behind UTC, Denver MST -7 hours behind UTC
			*	https://en.wikipedia.org/wiki/List_of_UTC_time_offsets
			*/
			utcOffset	: -(new Date().getTimezoneOffset() / 60), // will result in users timezone
			year		: 2015, // must be four digit year
			month		: 11, // 0-11; 0 = January
			day			: 15, // 1-31
			hour		: 0,
			min			: 0,
			second		: 0,
			milsec		: 0,
			$tmrWrapper	: $('.tmr_wrapper'),
			$daysElem	: $('.tmr_days'),
			$hrsElem	: $('.tmr_hours'),
			$minElem	: $('.tmr_minutes'),
			$secElem	: $('.tmr_seconds'),
			showDays	: true
        }, options );

		function startTimer(duration,settings) {
			
			if(!settings.showDays){
				settings.$daysElem.hide();
			}
			
			var showTimer = true,
				timer = duration,
				interval = setInterval(intervalCallback, 1000),
				days,
				daysAfter,
				hours,
				hoursAfter,
				minutes,
				seconds;
	
			function setTime(timer){
				if(!settings.showDays || (settings.showDays && parseInt(timer / 3600, 10) < 24)){
		        	hours = parseInt(timer / 3600, 10);
		        	hoursAfter = (timer - (hours * 3600));
				}else{
					days =  parseInt(timer / 86400, 10);
					daysAfter = (timer - (days * 86400));
		        	hours = parseInt(daysAfter / 3600, 10);
		        	hoursAfter = (daysAfter - (hours * 3600));					
				}
				
		        minutes = parseInt(hoursAfter / 60, 10);
		        seconds = parseInt(timer % 60, 10);

		        hours = hours < 10 ? "0" + hours : hours;
		        minutes = minutes < 10 ? "0" + minutes : minutes;
		        seconds = seconds < 10 ? "0" + seconds : seconds;

				if(settings.showDays){
					days = days || '0';
					settings.$daysElem.text(days);
				}
						
				settings.$hrsElem.text(hours);
				settings.$minElem.text(minutes);
				settings.$secElem.text(seconds);
			};
	
			function intervalCallback () {
				if(timer <= 0){
					settings.$tmrWrapper.hide();
					clearInterval(interval);
				}else{
					setTime(timer);
					if (showTimer){
						settings.$tmrWrapper.show();
						showTimer = false;
					}
					timer = timer - 1;
				}
			}
		}
 
		function getTimeDiffSec(){
			var currentDate = new Date(),
				endDate = new Date(settings.year, settings.month, settings.day, settings.hour, settings.min, settings.second, settings.milsec),
				currentOffset = -(currentDate.getTimezoneOffset() / 60),
				utcOffsetDiff = settings.utcOffset - currentOffset,
				timeDiffMil,
				endDateAdjMil = endDate.getTime(),
				timeDiffSec;
	
			function getEndDateAdjMil(utcOffsetDiff){
				var adjMil = endDate.getTime() + (utcOffsetDiff  * 3600);
				return adjMil;
			}
	
			if (utcOffsetDiff > 0){
				endDateAdjMil = getEndDateAdjMil(Math.abs(utcOffsetDiff));
			} else if (utcOffsetDiff < 0){
				endDateAdjMil = getEndDateAdjMil(utcOffsetDiff);
			}

			timeDiffMil = endDateAdjMil - currentDate.getTime();
	
			timeDiffSec = timeDiffMil/1000;
			
			return timeDiffSec;
		}

		var timeDiffSec = getTimeDiffSec();
		
		if(timeDiffSec > 0){
			startTimer(timeDiffSec,settings);
		}
		
    };
 
}(jQuery));