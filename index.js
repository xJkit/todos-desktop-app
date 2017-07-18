const electron = require('electron');

const { app, BrowserWindow, Menu } = electron;

let mainWindow; // for global scoping
let addWindow; // new todo window

const createAddWindow = () => {
  addWindow = new BrowserWindow({ width: 300, height: 200, title: 'Add New Todo' });
  addWindow.loadURL(`file://${__dirname}/add.html`);
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

if (process.platform === 'darwin') {
  // fix the File menu kidnapped by the macOS
  menuTemplate.unshift({});
}

app.on('ready', () => {
  mainWindow = new BrowserWindow({ title: 'This is the main window' });
  mainWindow.loadURL(`file://${__dirname}/main.html`);
  mainWindow.on('closed', () => app.quit());
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});
