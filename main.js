const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");
const sqlite3 = require("sqlite3").verbose();

const isPackaged = app.isPackaged;
const appPath = isPackaged ? path.dirname(app.getAppPath()) : app.getAppPath();
const dbFile = path.join(appPath, "db", "notes.db");

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.on("fetch-notes", (_event) => {
    const db = new sqlite3.Database(dbFile);
    db.all("SELECT * FROM notes", function (err, rows) {
      // handle error

      mainWindow.webContents.send("read-notes", rows);
    });
    db.close();
  });

  ipcMain.on("create-note", (_event, title, description) => {
    const db = new sqlite3.Database(dbFile);

    db.serialize(() => {
      db.exec(
        `INSERT INTO notes (title, description) values('${title}', '${description}')`
      );
    });

    db.close();
  });

  ipcMain.on("update-note", (_event, id, title, description) => {
    const db = new sqlite3.Database(dbFile);

    db.serialize(() => {
      db.exec(
        `UPDATE notes SET title='${title}',description='${description}' WHERE id="${id}"`
      );
    });

    db.close();
  });

  ipcMain.on("delete-note", (_event, id) => {
    const db = new sqlite3.Database(dbFile);

    db.serialize(() => {
      db.exec(`DELETE FROM notes WHERE id="${id}"`);
    });

    db.close();
  });

  mainWindow.loadFile("index.html");
}

function runMigration() {
  const db = new sqlite3.Database(dbFile);

  db.serialize(() => {
    db.run(
      "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title text, description text)"
    );
  });

  db.close();
}

app.whenReady().then(() => {
  runMigration();
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
