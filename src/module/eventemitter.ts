import Eventemitter from 'eventemitter3';

export enum Type {
  UPDATE_PLAYER_SETTING = 'update_player_setting', // 设置发生更新

  UPDATE_CHECKING = 'update_checking', // 正在检查更新
  UPDATE_CHECKED = 'update_checked', // 检查更新完毕
}

export default new Eventemitter();
