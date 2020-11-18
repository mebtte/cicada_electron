import * as os from 'os';

import { Menu } from 'electron';

import player from './player';
import updater from './updater';
import eventemitter, { Type } from './eventemitter';

let template = [
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
        id: 'check-update',
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
];

let menu: Menu = null;

function update() {
  const platform = os.platform();
  if (platform === 'darwin') {
    // @ts-ignore
    menu = Menu.buildFromTemplate(template);
  }
  Menu.setApplicationMenu(menu);
}

function updateTemplate(id: string, replacement: { [key: string]: any }) {
  const innerUpdate = (t) => {
    const newT = [];
    for (let item of t) {
      if (item.id && item.id === id) {
        item = {
          ...item,
          ...replacement,
        };
      }
      if (item.submenu) {
        item.submenu = innerUpdate(item.submenu);
      }
      newT.push(item);
    }
    return newT;
  };
  template = innerUpdate(template);
  update();
}

eventemitter.on(Type.UPDATE_CHECKING, () =>
  updateTemplate('check-update', {
    label: '正在检查更新...',
    enabled: false,
  })
);
eventemitter.on(Type.UPDATE_CHECKED, () =>
  updateTemplate('check-update', {
    label: '检查更新',
    enabled: true,
  })
);

export default {
  update,
};
