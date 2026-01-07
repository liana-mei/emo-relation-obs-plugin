import {App, Editor, MarkdownView, Modal, Notice, Plugin} from 'obsidian';
import { LogEmotionModal } from './ui-log-emotion-modal';
import { DEFAULT_SETTINGS, EmoRelationSettings, EmoRelationSettingsTab } from './settings';


// Remember to rename these classes and interfaces!


export default class EmoRelation extends Plugin {
	settings: EmoRelationSettings;

	async onload() {
		// This creates an icon in the left ribbon.
		this.addRibbonIcon('stars', 'Log Emotion', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new LogEmotionModal(this.app).open();
		});

		// // This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		// const statusBarItemEl = this.addStatusBarItem();
		// statusBarItemEl.setText('Status bar text');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-modal-simple',
			name: 'Log your emotion',
			callback: () => {
				new LogEmotionModal(this.app).open();
			}
		});

		// This adds an editor command that can perform some operation on the current editor instance
		// this.addCommand({
		// 	id: 'replace-selected',
		// 	name: 'Replace selected content',
		// 	editorCallback: (editor: Editor, view: MarkdownView) => {
		// 		editor.replaceSelection('Sample editor command');
		// 	}
		// });

		// Add settings tab for plugin settings
		this.addSettingTab(new EmoRelationSettingsTab(this.app, this));

		// This adds a complex command that can check whether the current state of the app allows execution of the command
		// this.addCommand({
		// 	id: 'open-modal-complex',
		// 	name: 'Open modal (complex)',
		// 	checkCallback: (checking: boolean) => {
		// 		// Conditions to check
		// 		const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
		// 		if (markdownView) {
		// 			// If checking is true, we're simply "checking" if the command can be run.
		// 			// If checking is false, then we want to actually perform the operation.
		// 			if (!checking) {
		// 				new SampleModal(this.app).open();
		// 			}

		// 			// This command will only show up in Command Palette when the check function returns true
		// 			return true;
		// 		}
		// 		return false;
		// 	}
		// });
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<EmoRelationSettings>);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}



// class SampleModal extends Modal {
// 	constructor(app: App) {
// 		super(app);
// 	}

// 	onOpen() {
// 		let {contentEl} = this;
// 		contentEl.setText('Woah!');
// 	}

// 	onClose() {
// 		const {contentEl} = this;
// 		contentEl.empty();
// 	}
// }
