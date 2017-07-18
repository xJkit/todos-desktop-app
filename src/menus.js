const { BrowserWindow } = require('electron');

class Menu {
  constructor(app) {
    this.app = app;
    this.addWindow = null;
    this.menuTemplate = [{
      label: 'File',
      submenu: [{
        label: 'Add New Todo',
        click: this.createAddWindow,
      }, {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command + Q' : 'Ctrl + Q',
        click: () => app.quit(),
      }],
    }];
    // different OS menu fix
    switch (process.platform) {
      case 'darwin':
        this.menuTemplate.unshift({});
        break;
      default:
        break;
    }

    // devTools for dev mode
    if (process.env.NODE_ENV !== 'production') {
      this.menuTemplate.push({
        label: 'View',
        submenu: [{
          label: 'Show Developer Tools',
          click: (item, focusedWindow) => focusedWindow.toggleDevTools(),
        }],
      });
    }
  }
  createAddWindow() {
    this.addWindow = new BrowserWindow({ width: 300, height: 200, title: 'Add New Todo' });
    this.addWindow.loadURL(`file://${__dirname}/views/add.html`);
  }
}

module.exrpots = Menu;

