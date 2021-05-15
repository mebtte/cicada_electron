import * as os from 'os';

import { app, dialog, shell, Menu } from 'electron';

import config from './config';

// 单例模式
if (!app.requestSingleInstanceLock()) {
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

  const platform = os.platform();
  const { default: playerWindow } = await import('./modules/player_window');
  await import('./modules/tray');
  await import('./modules/ipc');
  if (platform === 'darwin') {
    const { default: menu } = await import('./modules/macos_menu');
    Menu.setApplicationMenu(menu);
  }

  app.on('activate', () => playerWindow.show());
  app.on('before-quit', () => playerWindow.removeAllListeners());
  app.on('window-all-closed', () => app.quit());

  // 检查更新
  if (process.env.NODE_ENV !== 'development') {
    const { default: updater } = await import('./platform/updater');
    updater.checkUpdate(true);
  }
} catch (error) {
  const { response } = await dialog.showMessageBox({
    type: 'error',
    title: '启动发生错误',
    message: `如尝试多次仍无法正常启动, 请重置应用或者下载最新版本. 错误信息: ${error.message}`,
    buttons: ['重新启动', '重置应用', '下载最新版本', '取消'],
  });
  if (response === 0) {
    app.relaunch();
  } else if (response === 1) {
    const { default: reset } = await import('./utils/reset');
    await reset();
  } else if (response === 2) {
    await shell.openExternal(`${config.github_repository}/releases`);
    app.quit();
  }
  app.quit();
}
