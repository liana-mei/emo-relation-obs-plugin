
import { App, Modal } from 'obsidian';

export class LogEmotionModal extends Modal {
	private onEmotionLogged: (emotion: string) => void;

	constructor(app: App, onEmotionLogged?: (emotion: string) => void) {
		super(app);
		this.onEmotionLogged = onEmotionLogged || (() => {});
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();



		// Remove horizontal padding, keep only vertical if needed
		contentEl.style.paddingLeft = '0';
		contentEl.style.paddingRight = '0';
		contentEl.style.paddingTop = '0px';
		contentEl.style.paddingBottom = '0px';
		// contentEl.style.minWidth = '80vw';
		contentEl.style.maxWidth = '500px';

		contentEl.createEl('h2', { text: 'Log Emotion' });


		// Text field and log button container
		const inputRow = contentEl.createDiv();
		inputRow.style.display = 'flex';
		inputRow.style.alignItems = 'center';
		inputRow.style.marginBottom = '0.5em';

		const textInput = inputRow.createEl('input', { type: 'text', placeholder: 'How are you feeling?' });
		textInput.style.flex = '1';
		textInput.style.marginRight = '0.5em';

		const logBtn = inputRow.createEl('button', { text: 'Save' });
        logBtn.onclick = async () => {
            if (textInput.value.trim()) {
                const emotion = textInput.value.trim();
                this.onEmotionLogged(emotion);

                // Get today's date in YYYY-MM-DD format
                const today = new Date();
                const yyyy = today.getFullYear();
                const mm = String(today.getMonth() + 1).padStart(2, '0');
                const dd = String(today.getDate()).padStart(2, '0');
                const dateStr = `${yyyy}-${mm}-${dd}`;

                const filePath = `2026/${dateStr}.md`;
                const timeStr = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                const entry = `- ${timeStr} — Mood: ${emotion}\n`;

                try {
                    // Try to read the file, append, or create if missing
                    let file;
                    try {
                        file = await this.app.vault.adapter.read(filePath);
                        await this.app.vault.adapter.append(filePath, entry);
                    } catch {
                        // File doesn't exist, create it
                        await this.app.vault.adapter.write(filePath, `# ${dateStr}\n${entry}`);
                    }
                } catch (err) {
                    console.error('Failed to log emotion:', err);
                }

                this.close();
            }
        };


		// 6x6 grid of emotions (hardcoded)
		const emotions = [
			{x:0,y:0,label:'Furious',bg_color:'#FF0000',text_color:'#FFFFFF',quadrant:'High/Unpleasant'},
			{x:1,y:0,label:'Resentful',bg_color:'#FF4500',text_color:'#FFFFFF',quadrant:'High/Unpleasant'},
			{x:2,y:0,label:'Annoyed',bg_color:'#FFA500',text_color:'#000000',quadrant:'High/Unpleasant'},
			{x:3,y:0,label:'Excited',bg_color:'#FFFF00',text_color:'#000000',quadrant:'High/Pleasant'},
			{x:4,y:0,label:'Elated',bg_color:'#CCFF00',text_color:'#000000',quadrant:'High/Pleasant'},
			{x:5,y:0,label:'Euphoric',bg_color:'#99FF00',text_color:'#000000',quadrant:'High/Pleasant'},
			{x:0,y:1,label:'Terrified',bg_color:'#D32F2F',text_color:'#FFFFFF',quadrant:'High/Unpleasant'},
			{x:1,y:1,label:'Anxious',bg_color:'#E64A19',text_color:'#FFFFFF',quadrant:'High/Unpleasant'},
			{x:2,y:1,label:'Frustrated',bg_color:'#F57C00',text_color:'#000000',quadrant:'High/Unpleasant'},
			{x:3,y:1,label:'Playful',bg_color:'#FBC02D',text_color:'#000000',quadrant:'High/Pleasant'},
			{x:4,y:1,label:'Radiant',bg_color:'#AFB42B',text_color:'#000000',quadrant:'High/Pleasant'},
			{x:5,y:1,label:'Inspired',bg_color:'#689F38',text_color:'#FFFFFF',quadrant:'High/Pleasant'},
			{x:0,y:2,label:'Insecure',bg_color:'#7B1FA2',text_color:'#FFFFFF',quadrant:'Neutral/Unpleasant'},
			{x:1,y:2,label:'Worried',bg_color:'#512DA8',text_color:'#FFFFFF',quadrant:'Neutral/Unpleasant'},
			{x:2,y:2,label:'Nervous',bg_color:'#303F9F',text_color:'#FFFFFF',quadrant:'Neutral/Unpleasant'},
			{x:3,y:2,label:'Hopeful',bg_color:'#00796B',text_color:'#FFFFFF',quadrant:'Neutral/Pleasant'},
			{x:4,y:2,label:'Proud',bg_color:'#388E3C',text_color:'#FFFFFF',quadrant:'Neutral/Pleasant'},
			{x:5,y:2,label:'Confident',bg_color:'#2E7D32',text_color:'#FFFFFF',quadrant:'Neutral/Pleasant'},
			{x:0,y:3,label:'Overwhelmed',bg_color:'#4A148C',text_color:'#FFFFFF',quadrant:'Neutral/Unpleasant'},
			{x:1,y:3,label:'Gloomy',bg_color:'#311B92',text_color:'#FFFFFF',quadrant:'Neutral/Unpleasant'},
			{x:2,y:3,label:'Pensive',bg_color:'#1A237E',text_color:'#FFFFFF',quadrant:'Neutral/Unpleasant'},
			{x:3,y:3,label:'Relaxed',bg_color:'#004D40',text_color:'#FFFFFF',quadrant:'Neutral/Pleasant'},
			{x:4,y:3,label:'Grateful',bg_color:'#1B5E20',text_color:'#FFFFFF',quadrant:'Neutral/Pleasant'},
			{x:5,y:3,label:'Content',bg_color:'#0D5302',text_color:'#FFFFFF',quadrant:'Neutral/Pleasant'},
			{x:0,y:4,label:'Heartbroken',bg_color:'#1976D2',text_color:'#FFFFFF',quadrant:'Low/Unpleasant'},
			{x:1,y:4,label:'Blue',bg_color:'#0288D1',text_color:'#FFFFFF',quadrant:'Low/Unpleasant'},
			{x:2,y:4,label:'Lonely',bg_color:'#0097A7',text_color:'#FFFFFF',quadrant:'Low/Unpleasant'},
			{x:3,y:4,label:'Secure',bg_color:'#009688',text_color:'#FFFFFF',quadrant:'Low/Pleasant'},
			{x:4,y:4,label:'Zen',bg_color:'#43A047',text_color:'#FFFFFF',quadrant:'Low/Pleasant'},
			{x:5,y:4,label:'Serene',bg_color:'#66BB6A',text_color:'#000000',quadrant:'Low/Pleasant'},
			{x:0,y:5,label:'Devastated',bg_color:'#0D47A1',text_color:'#FFFFFF',quadrant:'Low/Unpleasant'},
			{x:1,y:5,label:'Despondent',bg_color:'#01579B',text_color:'#FFFFFF',quadrant:'Low/Unpleasant'},
			{x:2,y:5,label:'Sad',bg_color:'#006064',text_color:'#FFFFFF',quadrant:'Low/Unpleasant'},
			{x:3,y:5,label:'Peaceful',bg_color:'#004D40',text_color:'#FFFFFF',quadrant:'Low/Pleasant'},
			{x:4,y:5,label:'Calm',bg_color:'#1B5E20',text_color:'#FFFFFF',quadrant:'Low/Pleasant'},
			{x:5,y:5,label:'Tranquil',bg_color:'#33691E',text_color:'#FFFFFF',quadrant:'Low/Pleasant'}
		];
		// Sort by y then x
		emotions.sort((a, b) => a.y === b.y ? a.x - b.x : a.y - b.y);

		const grid = contentEl.createDiv();
		grid.style.display = 'grid';
		grid.style.gridTemplateColumns = 'repeat(6, 1fr)';
		grid.style.gap = '0.5em';
		grid.style.marginBottom = '0.1em';
		grid.style.marginRight = '0.1em';
		grid.style.padding = '0.1em';

		emotions.forEach((emotion) => {
			const btn = grid.createEl('button', { text: emotion.label });
			btn.style.backgroundColor = emotion.bg_color;
			btn.style.color = emotion.text_color;
			btn.title = emotion.quadrant;
			btn.style.padding = '2px 4px';
			btn.onclick = () => {
				textInput.value = emotion.label;
				textInput.focus();
			};
		});

	}

	onClose() {
		this.contentEl.empty();
	}
}
