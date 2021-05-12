import { ipcMain, app, shell } from 'electron';

import { ORIGIN } from '../constants/regexp';
import store, { Key } from '../platform/store';
import configWindow from './config_window';
import playerWindow from './player_window';

enum Channel {
  RELAUNCH = 'relaunch', // 重启 APP
  OPEN_LINK = 'open_link', // 打开链接

  MINIMIZE_PLAYER_WINDOW = 'minimize_player_window', // 最小化播放器窗口
  HIDE_PLAYER_WINDOW = 'hide_player_window', // 隐藏播放器窗口

  CLOSE_CONFIG_WINDOW = 'close_config_window', // 关闭配置窗口

  GET_PWA_ORIGIN = 'get_pwa_origin', // 获取 pwa 源
  SET_PWA_ORIGIN = 'set_pwa_origin', // 设置 pwa 源
}

ipcMain.handle(Channel.RELAUNCH, () => {
  app.relaunch();
  return app.quit();
});
ipcMain.handle(Channel.OPEN_LINK, (_, { link }: { link: string }) =>
  shell.openExternal(link)
);

ipcMain.handle(Channel.MINIMIZE_PLAYER_WINDOW, () => playerWindow.minimize());
ipcMain.handle(Channel.HIDE_PLAYER_WINDOW, () => playerWindow.hide());

ipcMain.handle(Channel.CLOSE_CONFIG_WINDOW, () => configWindow.close());

ipcMain.handle(Channel.GET_PWA_ORIGIN, () => store.get(Key.PWA_ORIGIN));
ipcMain.handle(
  Channel.SET_PWA_ORIGIN,
  (_, { pwaOrigin }: { pwaOrigin: string }) => {
    if (!ORIGIN.test(pwaOrigin)) {
      throw new Error('不正确的 PWA Origin');
    }
    return store.set(Key.PWA_ORIGIN, pwaOrigin);
  }
);
