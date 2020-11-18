import { dialog, shell } from 'electron';
import axios from 'axios';
import cheerio from 'cheerio';

import * as pkg from '../../package.json';
import config from '../config';
import eventemitter, { Type } from './eventemitter';

/**
 * 检查更新
 * @author mebtte<hi@mebtte.com>
 * @param silence 是否静默检查版本升级, 只弹出新版本弹窗
 */
async function checkUpdate(silence = false) {
  eventemitter.emit(Type.UPDATE_CHECKING);
  try {
    const { status, statusText, data: html } = await axios.request({
      url: `${config.repository}/tags`,
      timeout: 1000 * 60,
    });
    if (status !== 200) {
      throw new Error(`${statusText}(#${status})`);
    }
    const $ = cheerio.load(html);
    const latestVersion = $('.commit h4 a').first().text().trim();
    if (pkg.version !== latestVersion) {
      dialog
        .showMessageBox({
          type: 'info',
          buttons: ['前往下载', '取消'],
          message: `发现新的版本: ${latestVersion}`,
        })
        .then(({ response }) => {
          if (response === 0) {
            shell.openExternal(`${config.repository}/releases`);
          }
        });
    } else if (!silence) {
      dialog.showMessageBox({
        type: 'info',
        message: `当前已是最新版本: ${pkg.version}`,
      });
    }
  } catch (error) {
    console.error(error);
    if (!silence) {
      dialog
        .showMessageBox({
          type: 'error',
          buttons: ['前往下载页', '取消'],
          message: `检查更新失败: ${error.message}`,
        })
        .then(({ response }) => {
          if (response === 0) {
            shell.openExternal(`${config.repository}/releases`);
          }
        });
    }
  }
  eventemitter.emit(Type.UPDATE_CHECKED);
}

export default {
  checkUpdate,
};
