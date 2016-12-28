/**
 * This main exported function takes a string as input
 * and returns a svg image
 */
export function createCaptcha(text: string): string;
export namespace createCaptcha {
	/**
	 * generate random text of length 4
	 */
	export function randomText(size: number): string;
	/**
	 * This method returns a object that has two props:
	 * data: svg image
	 * text: captcha text
	 */
	export function create(options: Object): Object;
	/**
	 * This method returns a object that has two props:
	 * data: svg image
	 * text: captcha text
	 * note that this method generate a math expression
	 * this means that text is the result of the math expression
	 */
	export function createMathExpr(options: Object): Object;
}
export default createCaptcha;
