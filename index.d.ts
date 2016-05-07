declare namespace createCaptcha {
	export function randomText(size: number): string;
}

declare function createCaptcha(text: string): string;

declare module "createCaptcha" {
	export = createCaptcha;
}