const setButton = document.getElementById("btn");
const titleInput = document.getElementById("title");
setButton.addEventListener("click", () => {
  const title = titleInput.value;
  window.electronAPI.setTitle(title);
});

const callAPIButton = document.getElementById("call-api-btn");
callAPIButton.addEventListener("click", async () => {
  const response = await window.electronAPI.callAPI();
  document.getElementById("api-response").innerText = response;
});
