// @gokuviunoth
// to create a trip checklist based on start and end dates

// sample  startDate = new Date('28/Sep/2018 15:00');
// sample endDate = new Date('01/Oct/2018 20:00');

// Libraray function below for various utility purposes
// Function to handle title case returns propercase String
toTitleCase = str => {
	return str.replace(/\w\S*/g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

// double digit calcaulation function returns single numbers as double digits
calcPreffix = iputVal => {
	iputVal = iputVal.toString();
	if (iputVal.length < 2) {
		iputVal = '0' + iputVal;
	} else {
		iputVal = iputVal;
	}
	return iputVal;
};

// full month name calculation returns month equivalent for its number
calcMonth = month => {
	const monArray = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	return monArray[month];
};

// calculate week of the day
calcDay = day => {
	const weekDays = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];
	return weekDays[day];
};

// calculate day of  start time
calcStartDayTime = Time => {
	if (Time >= 0 && Time <= 20) {
		return 1;
	} else {
		return 0;
	}
};

// calculate night of end time
calcEndNitTime = Time => {
	if (Time >= 20) {
		return 1;
	} else {
		return 0;
	}
};

// all the trip items are break down in to different objects for easy manipulation
// Data for the Trip objects involved
let dayObj = {};
let otherObj = {};
let nightObj = {};

// clothes data as a object
let clothes = {
	outerWear: ['shirts', 'pants', 'shorts'],
	innerWear: ['undies', 'Baniyan', 'socks'],
	nightWear: ['NightTop', 'nightshorts']
};

// toiletries as an object
let toileteries = {
	Bath: ['soap', 'Shampoo'],
	groom: ['perfume', 'trimmer', 'cosmetic', 'sunscreen', 'lipbalm']
};

// accessories as an object
let accessories = {
	eyeWear: ['glasses', 'sunnies'],
	cameras: ['actionCam', 'DSLR', 'MemoryCard'],
	footWear: ['sandal', 'shoes']
};

//mandatory stuff as an object
let mandatoryStuff = {
	walletCheck: ['driving Lisence', 'Cash', 'phone Charger']
};

// onclick of the button call this function
document.getElementById('Calculate').addEventListener('click', function() {
	// clearing previous object values
	dayObj = {};
	nightObj = {};
	document.getElementById('demo').innerHTML = '';

	// get the input as an new date objects
	let startDate = new Date(document.getElementById('startDate').value);
	let endDate = new Date(document.getElementById('endDate').value);
	let chkDayClothes = document.getElementById('chkDayClothes').checked;
	let chkNitClothes = document.getElementById('chkNitClothes').checked;
	let chkGroom = document.getElementById('chkGroom').checked;
	let chkFootWear = document.getElementById('chkFootWear').checked;
	let chkCameras = document.getElementById('chkCameras').checked;
	let chkEyeWear = document.getElementById('chkEyeWear').checked;
	let chkBath = document.getElementById('chkBath').checked;
	let chkAll = document.getElementById('chkAll').checked;

	console.log(chkAll);

	// day clothes from clothes object compiled in to one object
	if (chkDayClothes || chkAll) {
		dayObj = {
			dayClothes: [clothes.outerWear, clothes.innerWear]
		};
	}

	// night clothes from clothes object compiled in to one object
	if (chkNitClothes || chkAll) {
		nightObj = {
			nightClothes: [clothes.nightWear]
		};
	}
	let otherObjectsArray = [];
	otherObjectsArray.push(mandatoryStuff.walletCheck);

	if (chkGroom || chkAll) {
		otherObjectsArray.push(toileteries.groom);
	}
	if (chkFootWear || chkAll) {
		otherObjectsArray.push(accessories.footWear);
	}
	if (chkCameras || chkAll) {
		otherObjectsArray.push(accessories.cameras);
	}
	if (chkEyeWear || chkAll) {
		otherObjectsArray.push(accessories.eyeWear);
	}
	if (chkBath || chkAll) {
		otherObjectsArray.push(toileteries.Bath);
	}

	// others objects compiled in to one object -just fancy
	otherObj = {
		otherObjs: otherObjectsArray
	};

	// final out msg as a variable
	let finalMsg = '';
	// variable with start date as input and start time as 00:00 for whole date

	//format start and end date for output
	let formattedStartDate = `${calcPreffix(startDate.getDate())}/${calcMonth(
		startDate.getMonth()
	)}/${startDate.getFullYear()}`;

	let formattedEndDate = `${calcPreffix(endDate.getDate())}/${calcMonth(
		endDate.getMonth()
	)}/${endDate.getFullYear()}`;

	// formatted next date to End date for calculation
	let formattedNextEndDate = `${calcPreffix(endDate.getDate() + 1)}/${calcMonth(
		endDate.getMonth()
	)}/${endDate.getFullYear()}`;
	let startDateStr = formattedStartDate + ' 00:00';
	let endDateStr = formattedNextEndDate + ' 00:00';

	// convert the variables in to date objects for calculation
	let wholeStartDate = new Date(startDateStr);
	// variable with End date + 1 day as input and End time as 00:00 for whole date
	let wholeEndDate = new Date(endDateStr);
	let totatDays = 0;

	// calculate the difference and divide by 1000*60*60*24 because the difference is milliseconds
	totatDays = Math.floor(
		(wholeEndDate - wholeStartDate) / (1000 * 60 * 60 * 24)
	);

	// iniallize the total days and nights as totaldays -1
	let dayTimeCount = totatDays - 1;
	let nightTimeCount = totatDays - 1;

	// call day night calculations
	dayTimeCount += calcStartDayTime(startDate.getHours());
	nightTimeCount += calcEndNitTime(endDate.getHours());

	// iniatilze a new total object list
	let totalObjList = {};
	// console.log(dayObj.keys, dayObj.length, !!dayObj.length);
	// console.log(nightObj.keys, nightObj.length, !!nightObj.length);
	// console.log(dayObj.dayClothes.length, !!dayObj.dayClothes.length);
	// console.log(nightObj.nightClothes.length, !!nightObj.nightClothes.length);
	if (chkDayClothes || chkAll) {
		// logic to add day objects in to total objects based on total day time count
		for (let i = 0; i < dayTimeCount && i < 7; i++) {
			for (let j = 0; j < dayObj.dayClothes.length; j++) {
				for (let k = 0; k < dayObj.dayClothes[j].length; k++) {
					if (totalObjList[dayObj.dayClothes[j][k]]) {
						totalObjList[dayObj.dayClothes[j][k]] += 1;
					} else {
						totalObjList[dayObj.dayClothes[j][k]] = 1;
					}
				}
			}
		}
	}

	// logic to add Night objects in to total objects based on total Night time count
	if (chkNitClothes || chkAll) {
		for (let i = 0; i < nightTimeCount && i < 7; i++) {
			for (let j = 0; j < nightObj.nightClothes.length; j++) {
				for (let k = 0; k < nightObj.nightClothes[j].length; k++) {
					if (totalObjList[nightObj.nightClothes[j][k]]) {
						totalObjList[nightObj.nightClothes[j][k]] += 1;
					} else {
						totalObjList[nightObj.nightClothes[j][k]] = 1;
					}
				}
			}
		}
	}

	// final logic to other objects in to total objects
	for (let i = 0; i < 1; i++) {
		for (let j = 0; j < otherObj.otherObjs.length; j++) {
			for (let k = 0; k < otherObj.otherObjs[j].length; k++) {
				if (totalObjList[otherObj.otherObjs[j][k]]) {
					totalObjList[otherObj.otherObjs[j][k]] += 1;
				} else {
					totalObjList[otherObj.otherObjs[j][k]] = 1;
				}
			}
		}
	}

	// create one whole string as a final string and embed in to HTML
	finalMsg = `${finalMsg} <br> Trip details between ${formattedStartDate} and ${formattedEndDate} <br>`;
	finalMsg = `${finalMsg} Your Trip start's on a ${calcDay(
		startDate.getDay()
	)} and end's on ${calcDay(endDate.getDay())}. <br>`;
	finalMsg = `${finalMsg}Total trip days are :${totatDays} <br>`;
	finalMsg = `${finalMsg}You gonna spend  ${dayTimeCount} days and ${nightTimeCount} nights. <br>`;

	// use Stringify and manipulate the object string
	let tempstr = JSON.stringify(totalObjList);
	// remove the {} and " from the string
	tempstr = tempstr.replace(/{/g, '');
	tempstr = tempstr.replace(/}/g, '');
	tempstr = tempstr.replace(/"/g, '');

	// create a array from string using split
	let temparray = tempstr.split(/,/);
	let arraylist = '';

	// add <li> elements to the array elements
	for (let i = 0; i < temparray.length; i++) {
		arraylist = `${arraylist}<li>${toTitleCase(temparray[i])} </li>`;
	}

	// add the objects to the final message
	finalMsg = `${finalMsg}Things you need to pack are below <br><ul>${arraylist} </ul>`;

	// notify for laundry incase if the trip is more than 7 days
	if (nightTimeCount > 7 || nightTimeCount > 7) {
		finalMsg = `${finalMsg}<br> Note : Laundry is required for this trip.`;
	}

	// set the final message to the HTML element
	document.getElementById('demo').innerHTML = finalMsg;
});
