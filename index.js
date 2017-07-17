const electron = require('electron');

const { app, BrowserWindow, Menu } = electron;
const menuTemplate = [{
  label: 'File',
  submenu: [{
    label: 'Add New Todo',
    click: () => console.log('You add new todo from the menu bar!'),
  }, {
    label: 'Quit',
    accelerator: process.platform === 'darwin' ? 'Command + Q' : 'Ctrl + Q',
    click: () => {
      console.log('you quit the application');
      app.quit();
    },
  }],
}];

if (process.platform === 'darwin') {
  // fix the File menu kidnapped by the macOS
  menuTemplate.unshift({});
}

let mainWindow; // for global scoping

app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/main.html`);

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});
