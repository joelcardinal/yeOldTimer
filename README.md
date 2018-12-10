yeOldTimer
==============

```
	    _--_
	     OO
	   / \ \	[0]:[0]:[0]:[0]
	/M   /  \
	|   \ | M
	|    \|
	    = =
```

This is a simple jQuery plugin that creates a countdown timer.

Licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php)

Requirements
--------------
* jQuery 1.7 (but can probably use lower version)

Usage Example
--------------

Requires some options to be set, such as end time's year, month, day.  See js for default options and demo.html for clear demonstration.

```
$(function() {
	
	// SET OPTIONS:
	var options = {};
	/*
	*	utcOffset = UTC offset of the timezone the countdown should end in
	*	Denver MDT -6 hours behind UTC, Denver MST -7 hours behind UTC
	*	https://en.wikipedia.org/wiki/List_of_UTC_time_offsets
	*
	*	Setting date times in JavaScript options below:
	*	(this link should help explain what time options to set -- for example, why month setting doesn't follow convention)
	*	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
	*
	*/
	options.utcOffset	= -7; // or comment out this line if countdown should end in users timezone
	options.year		= 2016; // must be four digit year
	options.month		= 11; // 0-11; where 0 = January
	options.day			= 17; // 1-31
	options.hour		= 0;
	options.min			= 0;
	options.second		= 0;
	options.milsec		= 0;
	options.$tmrWrapper	= $('.tmr_wrapper');
	options.$daysWrapElem	= $('.tmr_days_wrapper');
	options.$daysElem	= $('.tmr_days');
	options.$hrsElem	= $('.tmr_hours');
	options.$minElem	= $('.tmr_minutes');
	options.$secElem	= $('.tmr_seconds');
	options.showDays	= true;
	// init yeOldTimer countdown jQuery plugin with custom options
	$.yeOldTimer(options);
	
});

```
