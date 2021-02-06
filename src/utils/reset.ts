import { app, dialog } from 'electron';

import store from '../platform/store';
import playerWindow from '../modules/player_window';

export default async () =>
  dialog
    .showMessageBox({
      type: 'question',
      message: '确定恢复默认设置?',
      buttons: ['确认', '取消'],
    })
    .then(async ({ response }) => {
      if (response === 1) {
        return;
      }

      store.clear();

      await playerWindow.webContents.session.clearCache();
      await playerWindow.webContents.session.clearStorageData();

      return app.relaunch();
    });
