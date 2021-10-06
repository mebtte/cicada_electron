import Store from 'electron-store';

import config from '../config';

export enum Key {
  PWA_ORIGIN = 'pwa_origin',

  PLAYER_WINDOW_WIDTH = 'player_width',
  PLAYER_WINDOW_HEIGHT = 'player_height',
  PLAYER_DEVTOOLS_OPEN = 'player_devtools_oepn',
}

export default new Store<{
  [Key.PWA_ORIGIN]: string;
  [Key.PLAYER_WINDOW_WIDTH]: number;
  [Key.PLAYER_WINDOW_HEIGHT]: number;
  [Key.PLAYER_DEVTOOLS_OPEN]: boolean;
}>({
  name: `${
    process.env.NODE_ENV === 'development' ? 'development_setting' : 'setting'
  }_v2`,
  defaults: {
    [Key.PWA_ORIGIN]: config.pwa_origin,
    [Key.PLAYER_WINDOW_WIDTH]: 960,
    [Key.PLAYER_WINDOW_HEIGHT]: 720,
    [Key.PLAYER_DEVTOOLS_OPEN]: false,
  },
});
