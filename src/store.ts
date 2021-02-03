import Store from 'electron-store';

import config from './config';

export enum Key {
  SITE = 'site',

  PLAYER_WINDOW_WIDTH = 'player_width',
  PLAYER_WINDOW_HEIGHT = 'player_height',
  PLAYER_DEVTOOLS_OPEN = 'player_devtools_oepn',
}

export default new Store<{
  [Key.SITE]: string;
  [Key.PLAYER_WINDOW_WIDTH]: number;
  [Key.PLAYER_WINDOW_HEIGHT]: number;
  [Key.PLAYER_DEVTOOLS_OPEN]: boolean;
}>({
  defaults: {
    [Key.SITE]: config.site,
    [Key.PLAYER_WINDOW_WIDTH]: 960,
    [Key.PLAYER_WINDOW_HEIGHT]: 650,
    [Key.PLAYER_DEVTOOLS_OPEN]: false,
  },
});
