const time_convert_h_min = (num) => {
	var hours = Math.floor(num / 60);
	var minutes = num % 60;
	return ' ' + hours + 'h ' + minutes + 'min';
}

module.exports = {
	time_convert_h_min
}