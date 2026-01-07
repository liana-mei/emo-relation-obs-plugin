import {App, PluginSettingTab, Setting} from "obsidian";
import EmoRelation from "./main";

export interface EmoRelationSettings {
	mySetting: string;
	emotionLogQuestion: string;
	notePath: string;
}

export const DEFAULT_SETTINGS: EmoRelationSettings = {
	mySetting: 'default',
	emotionLogQuestion: 'How are you feeling?',
	notePath: 'DailyNote.md'
}	;	


export class EmoRelationSettingsTab extends PluginSettingTab {
	plugin: EmoRelation;

	constructor(app: App, plugin: EmoRelation) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Settings #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Emotion Log Question')
			.setDesc('Title for the Log Emotion modal')
			.addText(text => text
				.setPlaceholder('Emotion Log Question')
				.setValue(this.plugin.settings.emotionLogQuestion)
				.onChange(async (value) => {
					this.plugin.settings.emotionLogQuestion = value;
					await this.plugin.saveSettings();
				}));
		new Setting(containerEl)
			.setName('Note path')
			.setDesc('Path to the daily note file')
			.addText(text => text
				.setPlaceholder('DailyNote.md')
				.setValue(this.plugin.settings.notePath)
				.onChange(async (value) => {
					this.plugin.settings.notePath = value;
					await this.plugin.saveSettings();
				}));
	}
}
