import Phaser from 'phaser';
import { COLORS, SCENE_KEYS } from '../game/constants.js';
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

const SELECTED_COLOR = 0xf28c28;
const UNSELECTED_COLOR = 0x1f4020;
const HOVER_COLOR = 0x2f5c30;

export class MenuScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.menu);
  }

  create() {
    const width = this.scale.width;

    this.cameras.main.setBackgroundColor(COLORS.menuBackground);
    this.children.removeAll();

    this.languageChangePromise = null;

    this.titleText = this.add.text(width / 2, 150, '', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '56px',
      fontStyle: 'bold',
      color: '#ffffff',
      stroke: '#173d14',
      strokeThickness: 6
    }).setOrigin(0.5);

    this.subtitleText = this.add.text(width / 2, 215, getPhrase(TRANSLATION_KEYS.menu.subtitle), {
      fontFamily: 'Arial, sans-serif',
      fontSize: '22px',
      color: '#e8f5d0'
    }).setOrigin(0.5);

    this.createPlayButton(width / 2, 320);

    this.languageButtons = [];
    this.createLanguageButton(width / 2 - 90, 405, LANGUAGE_OPTIONS[0]);
    this.createLanguageButton(width / 2 + 90, 405, LANGUAGE_OPTIONS[1]);

    this.controlsText = this.add.text(width / 2, 480, getPhrase(TRANSLATION_KEYS.menu.controls), {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      color: '#d8e8c0'
    }).setOrigin(0.5);

    this.refreshTexts();
    this.updateLanguageButtons();
  }

  refreshTexts() {
    this.titleText.setText(getPhrase(TRANSLATION_KEYS.menu.title));
    this.subtitleText.setText(getPhrase(TRANSLATION_KEYS.menu.subtitle));
    this.playButtonText.setText(getPhrase(TRANSLATION_KEYS.menu.play));
    this.controlsText.setText(getPhrase(TRANSLATION_KEYS.menu.controls));
  }

  createPlayButton(x, y) {
    const button = this.add.rectangle(x, y, 220, 64, 0xf28c28)
      .setStrokeStyle(4, 0x7a3e00)
      .setInteractive({ useHandCursor: true });

    this.playButtonText = this.add.text(x, y, '', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '32px',
      fontStyle: 'bold',
      color: '#ffffff'
    }).setOrigin(0.5);

    button.on('pointerover', () => {
      button.setFillStyle(0xffa64d);
    });

    button.on('pointerout', () => {
      button.setFillStyle(0xf28c28);
    });

    button.on('pointerdown', async () => {
      if (this.languageChangePromise) {
        await this.languageChangePromise;
      }

      if (this.sys.isActive()) {
        this.scene.start(SCENE_KEYS.level, { levelId: 'level1' });
      }
    });
  }

  createLanguageButton(x, y, { label, language }) {
    const button = this.add.rectangle(x, y, 150, 44, UNSELECTED_COLOR)
      .setStrokeStyle(3, 0x7a3e00)
      .setInteractive({ useHandCursor: true });

    this.add.text(x, y, label, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#ffffff'
    }).setOrigin(0.5);

    button.on('pointerover', () => {
      if (getCurrentLanguage() !== language) {
        button.setFillStyle(HOVER_COLOR);
      }
    });

    button.on('pointerout', () => {
      if (getCurrentLanguage() !== language) {
        button.setFillStyle(UNSELECTED_COLOR);
      }
    });

    button.on('pointerdown', async () => {
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
    });

    this.languageButtons.push({ button, language });
  }

  updateLanguageButtons() {
    const currentLanguage = getCurrentLanguage();

    for (const { button, language } of this.languageButtons) {
      button.setFillStyle(
        language === currentLanguage ? SELECTED_COLOR : UNSELECTED_COLOR
      );
    }
  }
}
