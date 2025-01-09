const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  createNote: (title, description) =>
    ipcRenderer.send("create-note", title, description),
  updateNote: (id, title, description) =>
    ipcRenderer.send("update-note", id, title, description),
  deleteNote: (id) => ipcRenderer.send("delete-note", id),
  fetchNotes: () => ipcRenderer.send("fetch-notes"),
  readNotes: (callback) =>
    ipcRenderer.on("read-notes", (_event, rows) => callback(rows)),
});
