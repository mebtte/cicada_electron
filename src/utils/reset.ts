import { app, dialog } from 'electron';

import store from '../platform/store';
import playerWindow from '../modules/player_window';

export default async () => {
  const { response } = await dialog.showMessageBox({
    type: 'question',
    message:
      '重置能解决应用大部分的异常问题, 但同时也会清除本地数据, 例如登录状态, 快捷键配置等等... 确定重置应用吗?',
    buttons: ['确认', '取消'],
  });

  if (response === 1) {
    return;
  }

  store.clear();

  await playerWindow.webContents.session.clearCache();
  await playerWindow.webContents.session.clearStorageData();

  app.relaunch();
  return app.quit();
};
