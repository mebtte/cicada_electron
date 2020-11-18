import * as os from 'os';

import { Menu } from 'electron';

import player from './player';
import updater from './updater';

function init() {
  const platform = os.platform();
  let menu: Menu = null;
  if (platform === 'darwin') {
    menu = Menu.buildFromTemplate([
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
            label: '检查更新',
            click: () => updater.checkUpdate(),
          },
          {
            type: 'separator',
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
            click: () => player.minimize(),
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
            click: () => player.openDevTools(),
          },
        ],
      },
    ]);
  }
  Menu.setApplicationMenu(menu);
}

export default {
  init,
};
