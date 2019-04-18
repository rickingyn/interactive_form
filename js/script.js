// assign 'Other' input to a variable and hide 
const otherTitle = $('#other-title').hide();

// select name text field and set focus 
$('#name').focus();

let $total = $('<p></p>');
$('.activities').append($total);
$total.hide();

// create function to show design color based on design option selected
// change value shown in the select element to be the first option in the updated list
const showDesignColor = (design) => {
	$('#colors-js-puns option').eq(0).hide();
	$('#colors-js-puns option').eq(1).hide();
	$('#colors-js-puns option').eq(2).hide();
	$('#colors-js-puns option').eq(3).hide();
	$('#colors-js-puns option').eq(4).hide();
	$('#colors-js-puns option').eq(5).hide();

	if(design === 'js puns') {
		$('#colors-js-puns option').eq(0).show();
		$('#colors-js-puns option').eq(1).show();
		$('#colors-js-puns option').eq(2).show();
		$('#color').val($('#colors-js-puns option').eq(0).val())
	} else if(design === 'heart js') {
		$('#colors-js-puns option').eq(3).show();
		$('#colors-js-puns option').eq(4).show();
		$('#colors-js-puns option').eq(5).show();
		$('#color').val($('#colors-js-puns option').eq(3).val())
	} else {
		$('#colors-js-puns option').eq(0).show();
		$('#colors-js-puns option').eq(1).show();
		$('#colors-js-puns option').eq(2).show();
		$('#colors-js-puns option').eq(3).show();
		$('#colors-js-puns option').eq(4).show();
		$('#colors-js-puns option').eq(5).show();
		$('#color').val($('#colors-js-puns option').eq(0).val())
	}
};

// add event listener on change in dropdown menu; 
	// if 'other' option is selected, show 'other title' text field
$('#title').on('change', () => {
	if($('#title option:selected').text() === 'Other') {
		otherTitle.show();
	}
});

// add event listener on the 'Design' select element
// call the showDesignColor function;
	// set the 'Color' select element to show options based on selected 	
$('#design').on('change', () => {
	let selectedDesign = $('#design option:selected').val();
	showDesignColor(selectedDesign);
});

// create function to check day and time of the activity
// returns a regex for the activity;
	// to be used to match the list of activities
const getRegex = (activity) => {
	// create regex to check for days and times
	const regexTues = /Tuesday/;
	const regexWed = /Wednesday/;
	const regexMorning = /9am-12pm/;
	const regexAfternoon = /1pm-4pm/;

	// check activity with each day and time available
	const tues = regexTues.test(activity);
	const wed = regexWed.test(activity);
	const morning = regexMorning.test(activity);
	const afternoon = regexAfternoon.test(activity);

	// conditional statement check if activity is on Tuesday or Wednesday
	// then checks if the activity is in the morning or afternoon
	// returns a regex based on the activity
	if(tues) {
		if(morning) {
			return /Tuesday 9am-12pm/;
		} else if(afternoon) {
			return /Tuesday 1pm-4pm/;
		}
	} else if (wed) {
		if(morning) {
			return /Wednesday 9am-12pm/;
		} else if(afternoon) {
			return /Wednesday 1pm-4pm/;
		}
	}
};
	// create variable to calculate total cost
	let total = 0;

// add event listner on activitie's checkbox
$('.activities input[type="checkbox"]').on('change', function() {
	// select activity list and assign to variable
	const activitiesList = $('.activities label');
	// select text from the checkbox's label and assign to variable
	const selectedText = $(this).parent().text();

	// check if checkbox is checked
	if($(this).is(':checked')) {
		// call function to add to total
		addTotal(selectedText);

		// create variable to call getRegex function to get regex for selected activity;
		const regexActivity = getRegex(selectedText);

		// loop through the activity list collection
		activitiesList.each(function() {
			// add disable attribute to list item that matches day and time (excluding the selected)
			if(selectedText !== $(this).text()) {
				if(regexActivity && regexActivity.test($(this).text())) {
					$(this).children().attr('disabled', true);
					$(this).css('color', 'gray');
				}
			} 
		});
	} else if(!($(this).is(':checked'))) {
		// call function to subtract from total
		subtractTotal(selectedText);

		// remove attribute from activity list if unchecked
		activitiesList.each(function() {
			$(this).children().removeAttr('disabled');
			$(this).css('color', 'black');
		});
	}

	displayTotal(total);
});

function addTotal(text) {
	// conditional statement to add to total price;
		// 'Main Conference' price is $200
		// All other activity's price is $100
	if(text.includes('Main')) {
		total += 200;
	} else {
		total += 100;
	}
		return total;
}

function subtractTotal(text) {
	// conditional statement to add to total price;
		// 'Main Conference' price is $200
		// All other activity's price is $100
	if(text.includes('Main')) {
		total -= 200;
	} else {
		total -= 100;
	}
		return total;
}

function displayTotal(total) {
	// display total if activity is selected
	if(total > 0) {
		$total.show();
		$total.text(`Total: $${total}`);
	} else {
		// hide total if no activity is selected
		$total.hide();
	}
}