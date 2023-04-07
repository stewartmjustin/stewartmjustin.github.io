/* Justin Stewart Calendar Project 01/01/23 */

/*date global variables*/
let y;
let m;
let d;

let fY;
let fM;
let fD;


function mainFunc() {
	const date = new Date();
	y = date.getFullYear();
	m = date.getMonth();
	d = date.getDate();

	fY = y;
	fM = m;
	fD = d;
	
	console.log(fY);
	console.log(fM);
	console.log(fD);

	getTitle();
	invalidButtonCheck();

	calenderCreate();
}

function getTitle() {
	document.getElementById("Title").innerHTML = monthName() + " " + fY;
}

function calenderCreate() {
	var inner = craftInnerCal();
	document.getElementById("calDiv").innerHTML = inner;
}

function craftInnerCal() {
	var string = "<table><tr><td>Sunday</td><td>Monday</td><td>Tuesdasy</td><td>Wednesday</td><td>Thursday</td><td>Friday</td><td>Saturday</td></tr>";
	var day;

	var j = 0, i = 0;

	offset = 0;
	for (i = 2023; i < fY; i++) {
		if (i % 4 == 0)
			offset += (fY - 2023) * 366;
		else
			offset += (fY - 2023) * 365;
	}

	if (fM > 0)
		offset += 31;
	if (fM > 1)
		if ((fY % 4) == 0)
			offset += 29;
		else
			offset += 28;
	if (fM > 2)
		offset += 31;
	if (fM > 3)
		offset += 30;
	if (fM > 4)
		offset += 31;
	if (fM > 5)
		offset += 30;
	if (fM > 6)
		offset += 31;
	if (fM > 7)
		offset += 31;
	if (fM > 8)
		offset += 30;
	if (fM > 9)
		offset += 31;
	if (fM > 10)
		offset += 30;

	offset = offset % 7;
	console.log(offset);

	var weeks = (maxDay() + offset) / 7;
	weeks = Math.ceil(weeks);


	for(i = 0; i < weeks; i++){
		string += "<tr>";
		if (i == 0) {
			for (j = 0; j < offset; j++)
				string += "<td class=\"fakeDay\"></td>"
		}
		for (j = 0; j < 7; j++) {
			if (i == 0 && j == 0)
				j += offset;

			day = j + (i*7) + 1 - offset;

			string += "<td";

			if (day == d && fM == m && fY == y)
				string += " id=\"today\"";

			if (day <= maxDay())
				string += " class=\"realDay\">" + day.toString();
			else
				string += " class=\"fakeDay\">"

			string += "</td>";
		}
		string += "</tr>";
	}

	string += "</table>"

	console.log(string);

	return string;
}

function dayClick(setDay, setMonth, setYear) {
	console.log(setDay.toString() + ", " + setMonth.toString() + ", " + setYear.toString());
}

function monthName() {
	var str = "";

	switch(fM) {
		case 0:
			str = "January";
			break;
		case 1:
			str = "Febuary";
			break;
		case 2:
			str = "March";
			break;
		case 3:
			str = "April";
			break;
		case 4:
			str = "May";
			break;
		case 5:
			str = "June";
			break;
		case 6:
			str = "July";
			break;
		case 7:
			str = "August";
			break;
		case 8:
			str = "September";
			break;
		case 9:
			str = "October";
			break;
		case 10:
			str = "Novermber";
			break;
		default:
			str = "December";
			break;
	}

	return str;
}

function maxDay() {
	if (fM == 1) {
		if ((fY % 4) == 0)
			return 29;
		else
			return 28;
	}
	else {
		switch(fM) {
			case 0:
			case 2:
				return 31;
				break;
			case 3:
				return 30;
				break;
			case 4:
				return 31;
				break;
			case 5:
				return 30;
				break;
			case 6:
			case 7:
				return 31;
				break;
			case 8:
				return 30;
				break;
			case 9:
				return 31;
				break;
			case 10:
				return 30;
				break;
			default:
				return 31;
				break;

		}
	}
}

function backM() {
	if (fM == 0) {
		fM = 11;
		fY -= 1;
	}
	else {
		fM -= 1;
	}
	calenderCreate();
	invalidButtonCheck();
	getTitle();
}

function frontM() {
	if (fM == 11) {
		fM = 0;
		fY += 1;
	}
	else {
		fM += 1;
	}
	calenderCreate();
	invalidButtonCheck();
	getTitle();
}

function invalidButtonCheck() {
	if (fM == 0 && fY == 2023)
		document.getElementById("buttons").innerHTML = "<button type=\"button\" id=\"badLeftButton\" class=\"calChange\" onclick=\"backM()\" disabled><</button><button type=\"button\" id=\"rightButton\" class=\"calChange\" onclick=\"frontM()\">></button>"
	else
		document.getElementById("buttons").innerHTML = "<button type=\"button\" id=\"leftButton\" class=\"calChange\" onclick=\"backM()\"><</button><button type=\"button\" id=\"rightButton\" class=\"calChange\" onclick=\"frontM()\">></button>"
}