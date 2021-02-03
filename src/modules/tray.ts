// import * as os from 'os';
// import { join } from 'path';

// import { app, Tray, Menu, shell } from 'electron';

// import config from '../config';
// import player from './player';
// import updater from './updater';

// const { VERSION } = process.env;

// let tray: Tray;

// function init() {
//   const platform = os.platform();
//   if (platform === 'darwin') {
//     tray = new Tray(join(__dirname, '../../../static/tray_mac.png'));
//     tray.on('click', () => player.show());
//   } else if (platform === 'win32') {
//     tray = new Tray(join(__dirname, '../../../static/icon_windows.ico'));
//     const menu = Menu.buildFromTemplate([
//       {
//         label: '知了',
//         click: () => player.show(),
//       },
//       {
//         label: '关于',
//         submenu: [
//           {
//             label: `版本 ${VERSION}`,
//             enabled: false,
//           },
//           {
//             label: '检查更新',
//             click: () => updater.checkUpdate(),
//           },
//           {
//             label: '访问网站',
//             click: () => shell.openExternal(config.site),
//           },
//           {
//             label: '开发者工具',
//             click: () => player.openDevTools(),
//           },
//         ],
//       },
//       {
//         label: '退出',
//         click: () => app.quit(),
//       },
//     ]);
//     tray.setContextMenu(menu);
//     tray.on('click', () => player.show());
//   }
// }

// export default {
//   init,
// };
