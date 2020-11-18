import Eventemitter from 'eventemitter3';

export enum Type {
  PLAYER_SETTING_CHANGE = 'player_setting_change',
}

export default new Eventemitter();
