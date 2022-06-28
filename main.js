const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const nodemailer = require("nodemailer");
const { sendIt } = require("./js/outlookSendIt");

sendIt();

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

  // and load the index.html of the app.
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
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

function SendIt() {
  var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: "mymail@outlook.com",
      pass: "myPassword",
    },
  });

  const mailOptions = {
    from: '"Our Code World " <mymail@outlook.com>', // sender address (who sends)
    to: "mymail@mail.com, mymail2@mail.com", // list of receivers (who receives)
    subject: "Hello ", // Subject line
    text: "Hello world ", // plaintext body
    html: "<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js", // html body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}

ipcMain.on("SendIt", (event, args) => {
  console.log("ipcMain: Executing SendIt");
  SendIt();
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
