const electron = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow; // for global scoping
let addWindow;

const createAddWindow = () => {
  addWindow = new BrowserWindow({ width: 300, height: 200, title: 'Add New Todo' });
  addWindow.loadURL(`file://${__dirname}/views/add.html`);
};

const menuTemplate = [{
  label: 'File',
  submenu: [{
    label: 'Add New Todo',
    click: createAddWindow,
  }, {
    label: 'Quit',
    accelerator: process.platform === 'darwin' ? 'Command + Q' : 'Ctrl + Q',
    click: () => app.quit(),
  }],
}];

// different OS menu fix
switch (process.platform) {
  case 'darwin':
    menuTemplate.unshift({});
    break;
  default:
    break;
}

// devTools for dev mode
if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'View',
    submenu: [{
      label: 'Show Developer Tools',
      accelerator: process.platform === 'darwin' ? 'Command + Alt + I' : 'Ctrl + Alt + I',
      click: (item, focusedWindow) => focusedWindow.toggleDevTools(),
    }],
  });
}

app.on('ready', () => {
  mainWindow = new BrowserWindow({ title: 'This is the main window' });
  mainWindow.loadURL(`file://${__dirname}/views/main.html`);
  mainWindow.on('closed', () => app.quit());
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

ipcMain.on('todo:add', (evt, todoTitle) => {
  mainWindow.webContents.send('todo:add', todoTitle);
});
