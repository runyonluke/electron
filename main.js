const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");
const sqlite3 = require("sqlite3").verbose();

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.on("fetch-notes", (event) => {
    const db = new sqlite3.Database("db/notes.db");
    db.all("SELECT * FROM notes", function (err, rows) {
      // handle error

      mainWindow.webContents.send("read-notes", rows);
    });
    db.close();
  });

  ipcMain.on("create-note", (event, title, description) => {
    console.log("test");
    const db = new sqlite3.Database("db/notes.db");

    db.serialize(() => {
      db.exec(
        "INSERT INTO notes (title, description) values('" +
          title +
          "', '" +
          description +
          "')"
      );
    });

    db.close();
  });

  mainWindow.loadFile("index.html");
}

function runMigration() {
  const db = new sqlite3.Database("db/notes.db");

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
