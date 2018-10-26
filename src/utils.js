function randomIntegerByMod(start, mod) {
	return Math.round(Math.random() * mod) + start;
}

exports.randomIntegerByMod = randomIntegerByMod;
exports.randomIntegerByRange = function randomIntegerByRange(from, to) {
	return randomIntegerByMod(from, to - from);
};
