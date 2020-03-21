'use strict';
const assert = require('assert');

function rndPathCmd(cmd) {
	const r = (Math.random() * 0.2) - 0.1;

	switch (cmd.type) {
		case 'M':
		case 'L':
			cmd.x += r;
			cmd.y += r;
			break;
		case 'Q':
		case 'C':
			cmd.x += r;
			cmd.y += r;
			cmd.x1 += r;
			cmd.y1 += r;
			break;
		default:
			// Close path cmd
			break;
	}

	return cmd;
}

//https://riptutorial.com/zh-CN/html5-canvas/example/19077/%E5%9C%A8%E4%BD%8D%E7%BD%AE%E6%8B%86%E5%88%86%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF
function splitQuadraticBezier(position, x1, y1, x2, y2, x3, y3) {
	let v1, v2, v3, retPoints, i, c;

	if (position <= 0 || position >= 1) {
		throw RangeError("spliteCurveAt requires position > 0 && position < 1");
	}

	retPoints = []; // array of coordinates
	i = 0;
	v1 = {};
	v2 = {};
	v3 = {};
	v1.x = x1;
	v1.y = y1;
	v2.x = x2;
	v2.y = y2;
	v3.x = x3;
	v3.y = y3;

	c = position;
	retPoints[i++] = v1.x;  // start point
	retPoints[i++] = v1.y;
	retPoints[i++] = (v1.x += (v2.x - v1.x) * c);  // new control point for first curve
	retPoints[i++] = (v1.y += (v2.y - v1.y) * c);
	v2.x += (v3.x - v2.x) * c;
	v2.y += (v3.y - v2.y) * c;
	retPoints[i++] = v1.x + (v2.x - v1.x) * c;  // new end and start of first and second curves
	retPoints[i++] = v1.y + (v2.y - v1.y) * c;
	retPoints[i++] = v2.x;  // new control point for second curve
	retPoints[i++] = v2.y;
	retPoints[i++] = v3.x;  // new endpoint of second curve
	retPoints[i++] = v3.y;
	return retPoints;
}

function randomRange(min, max) {
	return Math.random() * (max - min) + min;
}

function randomizePathNodes(commands, opts) {
	// 随机化路径节点
	// 规则：
	// 如果当前节点是 L(Line)，下一个节点也是 Line，那么随机插入一个中间点
	// 如果当前节点是 Q，且前节点为 L 或 M，那么拆分这个曲线
	const result = [];
	for (let i = 0; i < commands.length - 1; i++) {
		const command = commands[i];
		if (command.type === "L") {
			const next = commands[i + 1];
			if (next.type === "L" && Math.random() > opts.truncateLineProbability) {
				const r = randomRange(-0.1, 0.1);
				result.push(command);
				result.push({
					type: "L",
					x: (command.x + next.x) / 2 + r,
					y: (command.y + next.y) / 2 + r,
				});
			} else {
				result.push(command);
			}
		} else if (command.type === "Q" && i >= 1) {
			const prev = commands[i - 1];
			if ((prev.type === "L" || prev.type === "M") && Math.random() > opts.truncateCurveProbability) {
				const p0_x = prev.x;
				const p0_y = prev.y;
				const r = randomRange(-0.1, 0.1);
				const cp_x = command.x1 + r;
				const cp_y = command.y1 + r;
				const p1_x = command.x + r;
				const p1_y = command.y + r;
				const newCurve = splitQuadraticBezier(randomRange(opts.truncateCurvePositionMin, opts.truncateCurvePositionMax), p0_x, p0_y, cp_x, cp_y, p1_x, p1_y);

				const q1 = {
					type: "Q",
					x1: newCurve[2],
					y1: newCurve[3],
					x: newCurve[4],
					y: newCurve[5],
				};
				const l1 = {
					type: "L",
					x: newCurve[4],
					y: newCurve[5],
				};
				const q2 = {
					type: "Q",
					x1: newCurve[6],
					y1: newCurve[7],
					x: newCurve[8],
					y: newCurve[9],
				};
				const l2 = {
					type: "L",
					x: newCurve[8],
					y: newCurve[9],
				};
				result.push(q1);
				// 插入一个 L 是因为貌似原本的 Path 里不会存在连续的 QQ
				result.push(l1);
				result.push(q2);
				result.push(l2);
			}

		} else {
			result.push(command)
		}
	}
	return result;
}

module.exports = function (text, opts) {
	const ch = text[0];
	assert(ch, 'expect a string');

	const fontSize = opts.fontSize;
	const fontScale = fontSize / opts.font.unitsPerEm;

	const glyph = opts.font.charToGlyph(ch);
	const width = glyph.advanceWidth ? glyph.advanceWidth * fontScale : 0;
	const left = opts.x - (width / 2);

	const height = (opts.ascender + opts.descender) * fontScale;
	const top = opts.y + (height / 2);
	const path = glyph.getPath(left, top, fontSize);
	// Randomize path commands
	path.commands.forEach(rndPathCmd);
	path.commands = randomizePathNodes(path.commands, opts);

	const pathData = path.toPathData();

	return pathData;
};
