import Phaser from 'phaser';
import { SCENE_KEYS, TEXTURE_KEYS } from '../game/constants.js';
import { createScreenBackdrop, createScreenButton } from '../game/screenLayout.js';
import { TRANSLATION_KEYS } from '../services/translationKeys.js';
import {
  LANGUAGES,
  getCurrentLanguage,
  getPhrase,
  setLanguage
} from '../services/translations.js';

const LANGUAGE_OPTIONS = [
  { label: 'Español', language: LANGUAGES.spanish },
  { label: 'English', language: LANGUAGES.english }
];

export class MenuScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.menu);
  }

  create() {
    const width = this.scale.width;

    this.languageChangePromise = null;
    createScreenBackdrop(this, 'menu');

    this.add.image(width / 2, 100, TEXTURE_KEYS.tangerine).setScale(1.6);
    this.titleText = this.add.text(width / 2, 156, '', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '48px',
      fontStyle: 'bold',
      color: '#23472d',
      align: 'center',
      wordWrap: { width: 600 }
    }).setOrigin(0.5);

    this.subtitleText = this.add.text(width / 2, 216, '', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '22px',
      color: '#50634b',
      align: 'center',
      wordWrap: { width: 580 }
    }).setOrigin(0.5);

    const play = createScreenButton(this, width / 2, 306, '', async () => {
      if (this.languageChangePromise) {
        await this.languageChangePromise;
      }

      if (this.sys.isActive()) {
        this.scene.start(SCENE_KEYS.level, { levelId: 'level1' });
      }
    }, { width: 300, height: 68, fontSize: 32 });
    this.playButtonText = play.text;

    this.languageButtons = [];
    this.createLanguageButton(width / 2 - 88, 402, LANGUAGE_OPTIONS[0]);
    this.createLanguageButton(width / 2 + 88, 402, LANGUAGE_OPTIONS[1]);

    this.controlsText = this.add.text(width / 2, 480, '', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '17px',
      color: '#50634b',
      align: 'center',
      wordWrap: { width: 590 }
    }).setOrigin(0.5);

    this.refreshTexts();
    this.updateLanguageButtons();
    this.cameras.main.fadeIn(280);
  }

  refreshTexts() {
    this.titleText.setText(getPhrase(TRANSLATION_KEYS.menu.title));
    this.subtitleText.setText(getPhrase(TRANSLATION_KEYS.menu.subtitle));
    this.playButtonText.setText(getPhrase(TRANSLATION_KEYS.menu.play));
    this.controlsText.setText(getPhrase(TRANSLATION_KEYS.menu.controls));
  }

  createLanguageButton(x, y, { label, language }) {
    const control = createScreenButton(this, x, y, label, async () => {
      if (getCurrentLanguage() === language || this.languageChangePromise) {
        return;
      }

      this.languageChangePromise = setLanguage(language);
      await this.languageChangePromise;
      this.languageChangePromise = null;

      if (!this.sys.isActive()) {
        return;
      }

      this.refreshTexts();
      this.updateLanguageButtons();
    }, { width: 156, height: 44, fontSize: 18, secondary: true });

    this.languageButtons.push({ ...control, language });
  }

  updateLanguageButtons() {
    const currentLanguage = getCurrentLanguage();

    for (const { setSelected, language } of this.languageButtons) {
      setSelected(language === currentLanguage);
    }
  }
}
