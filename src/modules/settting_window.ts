import { BrowserWindow } from 'electron';

import store, { Key } from '../platform/store';

let settingWindow: BrowserWindow | null = null;

function open() {
  if (settingWindow) {
    return settingWindow.show();
  }
  settingWindow = new BrowserWindow({
    width: 600,
    height: 450,
    resizable: false,
    fullscreenable: false,
    minimizable: false,
    show: false,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      devTools: true,
    },
  });
  settingWindow.setAlwaysOnTop(true);
  settingWindow.loadURL(`${store.get(Key.SITE)}/electron_setting`);
  if (process.env.NODE_ENV === 'development') {
    settingWindow.webContents.openDevTools();
  }

  settingWindow.on('ready-to-show', () => settingWindow.show());
  settingWindow.on('close', () => {
    settingWindow.destroy();
    settingWindow = null;
  });

  settingWindow.webContents.on('new-window', (event) => event.preventDefault());
  settingWindow.webContents.on('will-navigate', (event, url) => {
    const { origin } = new URL(url);
    if (origin !== store.get(Key.SITE)) {
      event.preventDefault();
    }
  });
}

export default {
  open,
};
