const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  createNote: (title, description) =>
    ipcRenderer.send("create-note", title, description),
  fetchNotes: () => ipcRenderer.send("fetch-notes"),
  readNotes: (callback) =>
    ipcRenderer.on("read-notes", (_event, rows) => callback(rows)),
});
