import { app, dialog, Menu } from 'electron';

import playerWindow from './player_window';
import configWindow from './config_window';
import updater from '../platform/updater';
import reset from '../utils/reset';

const menu = Menu.buildFromTemplate([
  {
    label: '知了',
    submenu: [
      {
        label: '关于',
        role: 'about',
      },
      {
        type: 'separator',
      },
      {
        label: '配置',
        click: () => configWindow.open(),
      },
      {
        label: '重置应用',
        click: reset,
      },
      {
        type: 'separator',
      },
      {
        label: '检查更新',
        click: () => updater.checkUpdate(),
      },
      {
        type: 'separator',
      },
      {
        label: '重启应用',
        click: () =>
          dialog
            .showMessageBox({
              type: 'question',
              message: '确定重启应用吗?',
              buttons: ['确认', '取消'],
            })
            .then(({ response }) => {
              if (response === 1) {
                return;
              }
              app.relaunch();
              return app.quit();
            }),
      },
      {
        label: '退出',
        role: 'quit',
      },
    ],
  },
  {
    label: '编辑',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'selectAll' },
    ],
  },
  {
    label: '窗口',
    submenu: [
      {
        label: '关闭',
        accelerator: 'Command+W',
        click: () => playerWindow.minimize(),
      },
      { role: 'minimize' },
    ],
  },
  {
    label: '帮助',
    submenu: [
      {
        label: '开发者工具',
        accelerator: 'Command+Option+I',
        click: () => playerWindow.webContents.openDevTools(),
      },
    ],
  },
]);

export default menu;
