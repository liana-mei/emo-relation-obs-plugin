import {App, PluginSettingTab, Setting} from "obsidian";
import EmoRelation from "./main";

export interface EmoRelationSettings {
	emotionLogQuestion: string;
	notePath: string;
}

export const DEFAULT_SETTINGS: EmoRelationSettings = {
	emotionLogQuestion: 'How are you feeling?',
	notePath: 'DailyNote.md'
}


export class EmoRelationSettingsTab extends PluginSettingTab {
	plugin: EmoRelation;

	constructor(app: App, plugin: EmoRelation) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		// Emotion Log Question
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

		// Note Path
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
