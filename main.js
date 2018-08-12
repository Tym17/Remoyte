const {app, BrowserWindow, Menu} = require('electron');
const config = require('./package.json').config;

let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600,
    resizable: true,
    center: true
  });

  // and load the index.html of the app.
  let botconf = {};
  try {
      botconf = require('./botconf.json');
      mainWindow.loadFile('waiting.html');
      //mainWindow.loadURL('https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=true');

      const player = require('./player');

      player.go(mainWindow);

  } catch (e)
  {
    mainWindow.loadFile('first.html');
    console.log(e);
  }


  let template = [
      {
          label: 'Options',
          submenu: [
              {
                  label:  'Re-configure',
                  click () {
                    mainWindow.loadFile('first.html');
                  }
              }
          ]
      }
  ];

  let menu = Menu.buildFromTemplate(template);
  mainWindow.setMenu(menu);

  if (config.debugmode) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  });
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})