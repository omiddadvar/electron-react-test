const { BrowserWindow, app } = require('electron')
require('@electron/remote/main').initialize();

function createWindow()
{
    const win = new BrowserWindow({
        width : 800,
        height : 600,
        webPreferences : {
            enableRemoteModule : true,
            nodeIntegration : true
        }
    })

    win.loadURL('http://localhost:3000');
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    // if(process.app !== 'darwin')
    if(process.app !== 'linux')
        app.quit();
})

app.on('activate', () => {
    if(BrowserWindow.getAllWindows() === 0)
        createWindow();
})