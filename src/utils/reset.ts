import { app, dialog } from 'electron';

import store from '../platform/store';
import playerWindow from '../modules/player_window';

export default async () => {
  const { response } = await dialog.showMessageBox({
    type: 'question',
    message: '确定重置应用?',
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
