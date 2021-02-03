import { app, dialog, shell } from 'electron';

import config from './config';

// 单例模式
const lock = app.requestSingleInstanceLock();
if (!lock) {
  app.quit();
} else {
  app.on('second-instance', () =>
    import('./modules/player_window').then(({ default: playerWindow }) =>
      playerWindow.show()
    )
  );
}

try {
  await app.whenReady();

  const { default: playerWindow } = await import('./modules/player_window');

  app.on('activate', () => playerWindow.show());
  app.on('before-quit', () => playerWindow.removeAllListeners());
} catch (error) {
  const { response } = await dialog.showMessageBox({
    type: 'error',
    title: '启动发生错误',
    message: `如尝试多次仍无法正常启动, 请下载最新版本. 错误信息: ${error.message}`,
    buttons: ['重新启动', '下载最新版本', '取消'],
  });
  if (response === 0) {
    app.relaunch();
  } else if (response === 1) {
    await shell.openExternal(`${config.repository}/releases`);
  }
  app.exit(0);
}

app.on('window-all-closed', () => app.quit());

// player.init();
// menu.update();
// tray.init();
if (process.env.NODE_ENV !== 'development') {
  // updater.checkUpdate(true);
}
