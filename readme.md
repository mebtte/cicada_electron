当前项目已合并到 [https://github.com/mebtte/cicada](https://github.com/mebtte/cicada)

# [知了](https://cicada.mebtte.com)

知了 Electron 客户端, 支持 macOS/Windows.

## 下载

[Github Releases](https://github.com/mebtte/cicada_electron/releases)

## 关联项目

- cicada_server: 知了服务端, 即将开源
- [cicada_pwa](https://github.com/mebtte/cicada_pwa): 知了 PWA 客户端, 支持 Web 浏览器
- [cicada_expo](https://github.com/mebtte/cicada_expo): 知了 Expo 客户端, 支持 Android/iOS/Web 浏览器

## 开发/构建

开发/构建之前需要进行配置, 在项目根目录创建配置文件 `config.json`, 支持的配置项请查看 [schema](./webpack/config_schema.js).

### 开发

```bash
npm run webpack:watch # webpack 监听
```

```bash
npm run electron:start # 启动 electron
```

### 构建

```bash
npm run webpack:build # webpack 构建
npm run electron:build:macos # 构建 macOS 客户端
npm run electron:build:windows # 构建 Windows 客户端
```

## 开源协议

[GPL](./license)
