import { expect } from '@playwright/test';
import { Logger } from './Logger.js';

export class ActionWrapper {
	/**
	 * @param {import('@playwright/test').Page} page
	 */
	constructor(page) {
		this.page = page;
	}

	async click(selector, options = {}) {
		Logger.log(`Clicking on element: ${selector}`);
		await this.page.click(selector, options);
	}

	async doubleClick(selector, options = {}) {
		await this.page.dblclick(selector, options);
	}

	async rightClick(selector, options = {}) {
		await this.page.click(selector, { ...options, button: 'right' });
	}

	async hover(selector, options = {}) {
		await this.page.hover(selector, options);
	}

	async type(selector, text, options = {}) {
		await this.page.type(selector, text, options);
	}

	async clear(selector) {
		await this.page.fill(selector, '');
	}

	async press(selector, key, options = {}) {
		await this.page.press(selector, key, options);
	}

	async uploadFile(selector, filePath) {
		const input = await this.page.$(selector);
		await input.setInputFiles(filePath);
	}

	async getText(selector) {
		return await this.page.textContent(selector);
	}

	async getAttribute(selector, attribute) {
		return await this.page.getAttribute(selector, attribute);
	}

	async isVisible(selector) {
		return await this.page.isVisible(selector);
	}

	async isEnabled(selector) {
		return await this.page.isEnabled(selector);
	}

	async isChecked(selector) {
		return await this.page.isChecked(selector);
	}

	async check(selector) {
		await this.page.check(selector);
	}

	async uncheck(selector) {
		await this.page.uncheck(selector);
	}

	async focus(selector) {
		await this.page.focus(selector);
	}

	async blur(selector) {
		await this.page.$eval(selector, el => el.blur());
	}

	async reload() {
		await this.page.reload();
	}

	async goBack() {
		await this.page.goBack();
	}

	async goForward() {
		await this.page.goForward();
	}

	async takeScreenshot(path, options = {}) {
		await this.page.screenshot({ path, ...options });
	}

	async setViewportSize(width, height) {
		await this.page.setViewportSize({ width, height });
	}

	async dragAndDrop(source, target, options = {}) {
		await this.page.dragAndDrop(source, target, options);
	}

	async waitForNavigation(options = {}) {
		await this.page.waitForNavigation(options);
	}

	async waitForLoadState(state = 'load') {
		await this.page.waitForLoadState(state);
	}

	async fill(selector, value) {
		Logger.log(`Filling element: ${selector} with value: ${value}`);
		await this.page.fill(selector, value);
	}

	async selectDropdown(selector, option) {
		Logger.log(`Selecting option: ${option} in dropdown: ${selector}`);
		await this.page.selectOption(selector, option);
	}

	async handlePopup(action = 'accept', promptText = '') {
		Logger.log(`Handling popup: ${action} with promptText: ${promptText}`);
		this.page.once('dialog', async dialog => {
			if (action === 'accept') {
				await dialog.accept(promptText);
			} else {
				await dialog.dismiss();
			}
		});
	}

	async scrollDown(pixels = 500) {
		await this.page.evaluate(y => window.scrollBy(0, y), pixels);
	}

	async waitForSelector(selector, options = {}) {
		await this.page.waitForSelector(selector, options);
	}

	async waitForTimeout(timeout) {
		await this.page.waitForTimeout(timeout);
	}
}
