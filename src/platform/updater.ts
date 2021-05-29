import { dialog, shell } from 'electron';
import axios from 'axios';
import cheerio from 'cheerio';

import { CICADA_ELECTRON_GITHUB_REPOSITORY } from '../constants';
import config from '../config';

const versionMax = (a: string, b: string) => {
  if (a === b) {
    return a;
  }

  const [a1, a2, a3] = a.split('.').map((p) => +p);
  const [b1, b2, b3] = b.split('.').map((p) => +p);

  if (a1 > b1) {
    return a;
  } else if (b1 > a1) {
    return b;
  }

  if (a2 > b2) {
    return a;
  } else if (b2 > a2) {
    return b;
  }

  if (a3 > b3) {
    return a;
  }
  return b;
};

/**
 * 检查更新
 * @author mebtte<hi@mebtte.com>
 * @param silence 是否静默检查版本升级, 只弹出新版本弹窗
 */
async function checkUpdate(silence = false) {
  try {
    const { status, statusText, data: html } = await axios.request({
      url: `${CICADA_ELECTRON_GITHUB_REPOSITORY}/tags`,
      timeout: 1000 * 60,
    });
    if (status !== 200) {
      throw new Error(`${statusText}(#${status})`);
    }
    const $ = cheerio.load(html);
    const latestVersion = $('.commit h4 a').first().text().trim();
    if (
      config.version !== latestVersion &&
      versionMax(config.version, latestVersion) === latestVersion
    ) {
      const { response } = await dialog.showMessageBox({
        type: 'info',
        buttons: ['前往下载', '取消'],
        message: `发现新的版本: ${latestVersion}`,
      });
      if (response === 0) {
        shell.openExternal(`${CICADA_ELECTRON_GITHUB_REPOSITORY}/releases`);
      }
    } else if (!silence) {
      dialog.showMessageBox({
        type: 'info',
        message: '当前已是最新版本',
      });
    }
  } catch (error) {
    console.error(error);
    if (!silence) {
      const { response } = await dialog.showMessageBox({
        type: 'error',
        buttons: ['寻求帮助', '取消'],
        message: `检查更新失败: ${error.message}`,
      });
      if (response === 0) {
        shell.openExternal(`${CICADA_ELECTRON_GITHUB_REPOSITORY}/issues`);
      }
    }
  }
}

export default {
  checkUpdate,
};
