// eslint-disable-next-line import/no-extraneous-dependencies
import { app, BrowserWindow } from 'electron';

const isDevelopment = process.env.NODE_ENV !== 'production';
let mainWindow;

const installExtensions = async () => {
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  const installer = require('electron-devtools-installer');
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return Promise
    .all(extensions.map(name => installer.default(installer[name])));
};

const createWindow = () => {
  mainWindow = new BrowserWindow({ width: 550, height: 600 });
  const port = process.env.PORT || 1212;
  const url = isDevelopment
    ? `http://localhost:${port}/`
    : `file://${__dirname}/index.html`;

  if (isDevelopment) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadURL(url);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('devtools-opened', () => {
    mainWindow.focus();
    setImmediate(() => {
      mainWindow.focus();
    });
  });

  return mainWindow;
};

app.on('ready', async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
