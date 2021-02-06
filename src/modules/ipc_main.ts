import { ipcMain } from 'electron';

import store, { Key } from '../platform/store';
import { Channel } from '../constants/ipc';

ipcMain.handle(Channel.SITE_GET, () => store.get(Key.SITE));
ipcMain.handle(Channel.SITE_SET, (_, data) => {
  const { site } = data;
  return store.set(Key.SITE, site);
});
