import * as os from 'os';
import * as path from 'path';

import { app, Tray, Menu, shell } from 'electron';

import config from '../config';
import playerWindow from './player_window';
import updater from '../platform/updater';

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
            label: '检查更新',
            click: () => updater.checkUpdate(),
          },
          {
            label: '访问网站',
            click: () => shell.openExternal(config.site),
          },
          {
            label: '开发者工具',
            click: () => playerWindow.webContents.openDevTools(),
          },
        ],
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
