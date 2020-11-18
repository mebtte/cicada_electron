import { app, dialog, shell } from 'electron';

import player from './module/player';
import menu from './module/menu';
import tray from './module/tray';
import updater from './module/updater';
import config from './config';

const lock = app.requestSingleInstanceLock();
if (!lock) {
  app.quit();
} else {
  app.on('second-instance', () => player.show());
}

app
  .whenReady()
  .then(() => {
    player.init();
    menu.init();
    tray.init();
    if (process.env.NODE_ENV !== 'development') {
      updater.checkUpdate(true);
    }
  })
  .catch((error) =>
    dialog
      .showMessageBox({
        type: 'error',
        title: '启动发生错误',
        message: `如尝试多次仍无法正常启动, 请下载最新版本. 错误信息: ${error.message}`,
        buttons: ['重新启动', '下载最新版本', '取消'],
      })
      .then(async ({ response }) => {
        if (response === 0) {
          app.relaunch();
        } else if (response === 1) {
          await shell.openExternal(`${config.repository}/releases`);
        }
        return app.exit(0);
      })
  );

app.on('window-all-closed', () => app.quit());
app.on('activate', () => player.show());
app.on('before-quit', () => player.removeAllListeners());
