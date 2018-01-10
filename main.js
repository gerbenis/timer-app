// eslint-disable-next-line
import { app, BrowserWindow } from 'electron';

const isDevelopment = process.env.NODE_ENV !== 'production';
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({ width: 550, height: 600 });
  const url = isDevelopment
    ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
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

app.on('ready', createWindow);

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
