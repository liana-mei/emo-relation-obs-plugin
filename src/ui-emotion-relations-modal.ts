import { App, Modal } from 'obsidian';

export class EmotionRelationsModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.createEl('h2', { text: 'Emotion Relations' });
		// Add your modal content here
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
