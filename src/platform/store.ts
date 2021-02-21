import Store from 'electron-store';

import config from '../config';

export enum Key {
  UI_ORIGIN = 'ui_origin',

  PLAYER_WINDOW_WIDTH = 'player_width',
  PLAYER_WINDOW_HEIGHT = 'player_height',
  PLAYER_DEVTOOLS_OPEN = 'player_devtools_oepn',
}

export default new Store<{
  [Key.UI_ORIGIN]: string;
  [Key.PLAYER_WINDOW_WIDTH]: number;
  [Key.PLAYER_WINDOW_HEIGHT]: number;
  [Key.PLAYER_DEVTOOLS_OPEN]: boolean;
}>({
  name: `${
    process.env.NODE_ENV === 'development' ? 'development_setting' : 'setting'
  }_v1`,
  defaults: {
    [Key.UI_ORIGIN]: config.ui_origin,
    [Key.PLAYER_WINDOW_WIDTH]: 960,
    [Key.PLAYER_WINDOW_HEIGHT]: 650,
    [Key.PLAYER_DEVTOOLS_OPEN]: false,
  },
});
