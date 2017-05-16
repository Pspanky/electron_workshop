// const gif = require('electron').remote.require('./gifHandler')
// var remote = require('electron').remote;
// const mapNumbers = require('electron').remote.require('./mapNumbers')
const {app, electron, globalShortcut, BrowserWindow} = require('electron')
// Module to control application life.
// const app = electron.app
// Module to create native browser window.
// const BrowserWindow = electron.BrowserWindow

// const globalShortcut = require('electron')

const path = require('path')
const url = require('url')

global.sPressed = false;
global.ret2;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow (framing, transparency) {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, frame: framing, transparent: transparency})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow(true, false)
  }
})


app.on('ready', () => {
  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register('CommandOrControl+Q', () => {
    console.log('CommandOrControl+Q is pressed')
    app.quit()
    // gif.getGifURL();
  })
  const ret2 = globalShortcut.register('CommandOrControl+H', () => {
    console.log('CommandOrControl+H is pressed')
    app.hide()
  })

  const ret3 = globalShortcut.register('CommandOrControl+S', () => {
    console.log('CommandOrControl+S is pressed')
    app.show()
  })

  const ret4 = globalShortcut.register('CommandOrControl+N', () => {
    console.log('CommandOrControl+N is pressed')
    createWindow(true, false)
  })

  const ret5 = globalShortcut.register('CommandOrControl+T', () => {
    console.log('CommandOrControl+T is pressed')
    createWindow(true, true)
  })

  const ret6 = globalShortcut.register('CommandOrControl+F', () => {
    console.log('CommandOrControl+F is pressed')
    createWindow(false, false)
  })

  if (!ret) {
    console.log('registration failed')
  }

  // if (!ret2) {
  //   console.log('registration failed')
  // }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('CommandOrControl+Q'))
  console.log(globalShortcut.isRegistered('CommandOrControl+H'))
  console.log(globalShortcut.isRegistered('CommandOrControl+S'))
  console.log(globalShortcut.isRegistered('CommandOrControl+N'))
  console.log(globalShortcut.isRegistered('CommandOrControl+T'))
  console.log(globalShortcut.isRegistered('CommandOrControl+F'))

})

app.on('will-quit', () => {
  // Unregister a shortcut.
  // globalShortcut.unregister('CommandOrControl+B')

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})


// electron.remote.app.on("open-url", function(event, url) {
//   console.log("Open URL: " + url);
// });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
