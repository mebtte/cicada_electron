import * as os from 'os';
import * as path from 'path';

import { app, dialog, Tray, Menu, shell } from 'electron';

import config from '../config';
import playerWindow from './player_window';
import configWindow from './config_window';
import updater from '../platform/updater';
import reset from '../utils/reset';

const { VERSION } = process.env;

let tray: Tray;

if (os.platform() === 'darwin') {
  tray = new Tray(path.join(__dirname, '../static/tray_mac.png'));
} else {
  tray = new Tray(path.join(__dirname, '../static/icon_windows.ico'));
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: '知了',
        click: () => playerWindow.show(),
      },
      {
        label: '关于',
        submenu: [
          {
            label: `版本 ${VERSION}`,
            enabled: false,
          },
          {
            type: 'separator',
          },
          {
            label: '检查更新',
            click: () => updater.checkUpdate(),
          },
          {
            label: '访问网站',
            click: () => shell.openExternal(config.pwa_origin),
          },
          {
            label: '开发者工具',
            click: () => playerWindow.webContents.openDevTools(),
          },
        ],
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
        click: () => app.quit(),
      },
    ])
  );
}

tray.on('click', () => playerWindow.show());

export default tray;
