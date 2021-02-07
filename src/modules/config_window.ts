import { BrowserWindow } from 'electron';

import store, { Key } from '../platform/store';

let configWindow: BrowserWindow | null = null;

function close() {
  if (!configWindow) {
    return;
  }
  configWindow.destroy();
  configWindow = null;
}

function open() {
  if (configWindow) {
    return configWindow.show();
  }
  configWindow = new BrowserWindow({
    width: process.env.NODE_ENV === 'development' ? 900 : 540,
    height: 450,
    resizable: false,
    fullscreenable: false,
    minimizable: false,
    show: false,
    frame: false,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      devTools: true,
    },
  });
  configWindow.loadURL(`${store.get(Key.UI_ORIGIN)}/desktop_configure`);
  if (process.env.NODE_ENV === 'development') {
    configWindow.webContents.openDevTools();
  }

  configWindow.on('ready-to-show', () => configWindow.show());
  configWindow.on('close', close);

  configWindow.webContents.on('new-window', (event) => event.preventDefault());
  configWindow.webContents.on('will-navigate', (event, url) => {
    const { origin } = new URL(url);
    if (origin !== store.get(Key.UI_ORIGIN)) {
      event.preventDefault();
    }
  });
}

export default {
  open,
  close,
};
