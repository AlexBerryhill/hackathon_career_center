const { app, BrowserWindow, ipcMain } = require("electron");
const electronInstaller = require('electron-winstaller');
const path = require("path");
const url = require("url");
const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

//const nodemailer = require("nodemailer");
// const { sendIt } = require("./js/outlookSendIt");

// sendIt();

//to download exe
//npx electron-packager . hackathon_career_center --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=MAAD --version-string.FileDescription=EmailTemplate --version-string.ProductName="MAAD E-mail"

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  //win.setMenu(null);

  // and load the index.html of the app.
  win.loadURL(
    url.format({
      //pathname: path.join(__dirname, "index.html"),
      pathname: path.join(__dirname, "oauth.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

resultPromise = electronInstaller.createWindowsInstaller({
  appDirectory: './release-builds',
  outputDirectory: '~/tmp',
  authors: 'My App Inc.',
  exe: 'maademail.exe'
});

resultPromise.then(
  () => console.log("It worked!"), 
  (e) => console.log(`No dice: ${e.message}`)
);


