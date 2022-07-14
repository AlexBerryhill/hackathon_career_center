const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'maadEmail-win32-ia32/'),
    authors: 'Alexander Berryhill',
    description: "An Email Service besed on Templates",
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'maadEmail.exe',
    setupExe: 'MaadEmailAppInstaller.exe',
    setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'icon.ico')
  })
}