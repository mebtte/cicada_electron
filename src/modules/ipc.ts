import { ipcMain, app, shell } from 'electron';

import { ORIGIN } from '../constants/regexp';
import store, { Key } from '../platform/store';
import configWindow from './config_window';

enum Channel {
  RELAUNCH = 'relaunch', // 重启 APP
  OPEN_LINK = 'open_link', // 打开链接

  CLOSE_CONFIG_WINDOW = 'close_config_window', // 关闭配置窗口

  GET_UI_ORIGIN = 'get_ui_origin', // 获取 UI 源
  SET_UI_ORIGIN = 'set_ui_origin', // 设置 UI 源
}

ipcMain.handle(Channel.RELAUNCH, () => {
  app.relaunch();
  return app.quit();
});
ipcMain.handle(Channel.OPEN_LINK, (_, { link }: { link: string }) =>
  shell.openExternal(link)
);

ipcMain.handle(Channel.CLOSE_CONFIG_WINDOW, () => configWindow.close());

ipcMain.handle(Channel.GET_UI_ORIGIN, () => store.get(Key.UI_ORIGIN));
ipcMain.handle(
  Channel.SET_UI_ORIGIN,
  (_, { uiOrigin }: { uiOrigin: string }) => {
    if (!ORIGIN.test(uiOrigin)) {
      throw new Error('不正确的 UI Origin');
    }
    return store.set(Key.UI_ORIGIN, uiOrigin);
  }
);
