import {App, Editor, MarkdownView, Modal, Notice, Plugin} from 'obsidian';
import { LogEmotionModal } from './ui-log-emotion-modal';
import { EmotionRelationsModal } from './ui-emotion-relations-modal';
import { DEFAULT_SETTINGS, EmoRelationSettings, EmoRelationSettingsTab } from './settings';


// Remember to rename these classes and interfaces!


export default class EmoRelation extends Plugin {
	settings: EmoRelationSettings;

	async onload() {
		await this.loadSettings();
		
		this.addRibbonIcon('sparkle', 'Log Emotion', (evt: MouseEvent) => {
			new LogEmotionModal(this.app).open();
		});

		this.addRibbonIcon('sparkles', 'Emotion Data', (evt: MouseEvent) => {
            new EmotionRelationsModal(this.app).open();
		});

		this.addCommand({
			id: 'open-modal-simple',
			name: 'Log your emotion',
			callback: () => {
				new LogEmotionModal(this.app).open();
			}
		});

		this.addSettingTab(new EmoRelationSettingsTab(this.app, this));
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
