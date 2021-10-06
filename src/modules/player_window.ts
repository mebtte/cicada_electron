import { BrowserWindow } from 'electron';
import debounce from 'lodash/debounce';

import store, { Key } from '../platform/store';

const playerWindow = new BrowserWindow({
  width: store.get(Key.PLAYER_WINDOW_WIDTH),
  height: store.get(Key.PLAYER_WINDOW_HEIGHT),
  minWidth: 375,
  minHeight: 720,
  resizable: true,
  frame: false,
  titleBarStyle: 'hidden',
  fullscreenable: true,
  show: false,
  webPreferences: {
    enableRemoteModule: true,
    nodeIntegration: true,
    devTools: true,
  },
});

playerWindow.loadURL(store.get(Key.PWA_ORIGIN));
if (store.get(Key.PLAYER_DEVTOOLS_OPEN)) {
  playerWindow.webContents.openDevTools();
}

playerWindow.on('ready-to-show', () => playerWindow.show());
playerWindow.on('close', (event) => {
  event.preventDefault();
  return playerWindow.hide();
});
playerWindow.on(
  'resize',
  debounce(() => {
    if (playerWindow.isFullScreen()) {
      return;
    }
    const { width, height } = playerWindow.getBounds();
    store.set(Key.PLAYER_WINDOW_WIDTH, width);
    store.set(Key.PLAYER_WINDOW_HEIGHT, height);
  }, 2000)
);

playerWindow.webContents.on('devtools-opened', () =>
  store.set(Key.PLAYER_DEVTOOLS_OPEN, true)
);
playerWindow.webContents.on('devtools-closed', () =>
  store.set(Key.PLAYER_DEVTOOLS_OPEN, false)
);
playerWindow.webContents.on('new-window', (event) => event.preventDefault());
playerWindow.webContents.on('will-navigate', (event, url) => {
  const { origin } = new URL(url);
  if (origin !== store.get(Key.PWA_ORIGIN)) {
    event.preventDefault();
  }
});

export default playerWindow;
