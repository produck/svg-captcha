const random = require('../lib/random');

test('Generate random int', () => {
	for (let i = 0; i < 10; i++) {
		const num = random.int(0, 10);
		expect(num).toBeGreaterThanOrEqual(0);
		expect(num).toBeLessThanOrEqual(10);
	}
});

test('Generate grey color', () => {
	expect(random.greyColor()).toBeTruthy();
	expect(random.greyColor(3, 4)).toBeTruthy();
});

test('Generate color', () => {
	expect(random.color('#333')).toBeTruthy();
	expect(random.color('#ccc')).toBeTruthy();
});

test('Generate math expression', () => {
	for (let i = 0; i < 10; i++) {
		const expr = random.mathExpr();
		expect(expr.text).toMatch(/^\d+$/);
		expect(expr.equation).toMatch(/^\d+[+\-*/]\d+$/);
	}
});
