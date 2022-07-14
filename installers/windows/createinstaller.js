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
    appDirectory: path.join(outPath, 'hackathon_career_center-win32-ia32/'),
    authors: 'Alexander Berryhill',
    description: "An Email Service besed on Templates",
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'hackathon_career_center.exe',
    setupExe: 'MaadEmailAppInstaller.exe',
    setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'icon.ico')
  })
}