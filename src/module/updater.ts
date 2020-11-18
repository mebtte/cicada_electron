import { dialog, shell } from 'electron';
import axios from 'axios';

import * as pkg from '../../package.json';

/**
 * 检查更新
 * @author mebtte<hi@mebtte.com>
 * @param silence 是否静默检查版本升级, 只弹出新版本弹窗
 */
async function checkUpdate(silence = false) {
  console.log(silence);
}

export default {
  checkUpdate,
};
