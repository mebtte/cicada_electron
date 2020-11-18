import { homedir } from 'os';
import { existsSync, readFileSync, writeFileSync } from 'fs';

import { app } from 'electron';
import deepmerge from 'deepmerge';

import eventemitter, { Type as EventType } from './eventemitter';

const SETTING_FILE_PATH = `${homedir()}/.cicada_setting_v2${
  process.env.NODE_ENV === 'producation' ? '' : '_development'
}.json`;

interface Setting {
  player: {
    width: number;
    height: number;
    devtools: boolean;
  };
}

let setting: Setting = {
  player: {
    width: 960,
    height: 650,
    devtools: false,
  },
};
if (existsSync(SETTING_FILE_PATH)) {
  try {
    const localSetting = JSON.parse(readFileSync(SETTING_FILE_PATH).toString());
    setting = deepmerge(setting, localSetting);
  } catch (error) {
    console.error(error);
  }
}

function get() {
  return setting;
}

function updateAndSave() {
  try {
    writeFileSync(SETTING_FILE_PATH, JSON.stringify(setting));
  } catch (error) {
    console.error(error);
  }
}

app.on('will-quit', updateAndSave);
eventemitter.on(EventType.PLAYER_SETTING_CHANGE, (playerSettingPart) => {
  setting = {
    ...setting,
    player: deepmerge(setting.player, playerSettingPart),
  };
});

export default {
  get,
  updateAndSave,
};
