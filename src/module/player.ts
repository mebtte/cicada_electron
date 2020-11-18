import { BrowserWindow } from 'electron';
import { debounce } from 'lodash';

import settingModule from './setting';
import config from '../config';
import eventemitter, { Type as EventType } from './eventemitter';

let window: BrowserWindow;

function init() {
  const setting = settingModule.get();
  window = new BrowserWindow({
    width: setting.player.width,
    height: setting.player.height,
    minWidth: 900,
    minHeight: 650,
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
  window.loadURL(config.site);
  if (setting.player.devtools) {
    window.webContents.openDevTools();
  }

  window.on('ready-to-show', () => window.show());
  window.on('close', (event) => {
    event.preventDefault();
    return window.hide();
  });
  window.on(
    'resize',
    debounce(() => {
      if (window.isFullScreen()) {
        return;
      }
      const { width, height } = window.getBounds();
      eventemitter.emit(EventType.UPDATE_PLAYER_SETTING, { width, height });
    }, 2000)
  );

  if (process.env.NODE_ENV === 'production') {
    // 禁止跳转到其他域名
    window.webContents.on('will-navigate', (event, url) => {
      const { origin } = new URL(url);
      if (origin !== config.site) {
        event.preventDefault();
      }
    });
  }
  window.webContents.on('devtools-opened', () =>
    eventemitter.emit(EventType.UPDATE_PLAYER_SETTING, { devtools: true })
  );
  window.webContents.on('devtools-closed', () =>
    eventemitter.emit(EventType.UPDATE_PLAYER_SETTING, { devtools: false })
  );
}

function openDevTools() {
  return window.webContents.openDevTools({ mode: 'right', activate: true });
}

export default {
  init,
  show: () => window.show(),
  minimize: () => window.minimize(),
  removeAllListeners: () => window.removeAllListeners(),
  openDevTools,
};
