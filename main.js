// Dependencies
const { app, BrowserWindow, ipcMain } = require("electron");
const electronInstaller = require('electron-winstaller');
const path = require("path");
const url = require("url");
const setupEvents = require('./installers/setupEvents');

// We will need to access this in other files across the application
data_path = app.getPath("userData");

// Handle squirrel event
if (setupEvents.handleSquirrelEvent()) {
  // Squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

//to download exe
//npx electron-packager . maadEmail --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=MAAD --version-string.FileDescription=EmailTemplate --version-string.ProductName="MAAD E-mail"

// Keep a global reference of the window object, if you don't, the window will be closed automatically when the JavaScript object is garbage collected.
let win;

// Function called when a new window is created
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

  // Hide the default electron menu in the main window
  // win.setMenu(null);

  // Load the apps oauth page
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "oauth.html"),
      protocol: "file:",
      slashes: true,
      query: {
        data_path: data_path
      }
    })
  );

  // Emitted when the window is closed.
  win.on("closed", () => {

    // Dereferencing the window object
    win = null;
  });
}

// Call createWindow when electron is ready to open windows
app.on("ready", createWindow);

// Quit the application when all windows are closed.
app.on("window-all-closed", () => {

  // If the application is not mac
  if (process.platform !== "darwin") {
    
    // Close the application
    app.quit();
  }
});

// When the app is activated
app.on("activate", () => {

  // If there is no active window, create one
  if (win === null) {
    createWindow();
  }
});


