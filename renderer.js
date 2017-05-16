// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const remote = require('electron').remote;

let axios = require('axios');
const ipc = require('electron').ipcRenderer

ipc.on("showSurprise", (event, data) => {
	if (document.getElementById('secretSection').style.display == "none"){
			document.getElementById('secretSection').style.display = "flex";
	} else {
		document.getElementById('secretSection').style.display = "none";
	}
})

ipc.on("hide", (event) => {
	document.getElementById('secretSection').style.display="none"
})

const apiUrl = (term) => {
	return `http://api.giphy.com/v1/gifs/search?q=${term}&api_key=dc6zaTOxFJmzC`;
};

// getGifURL();

let searchBar = document.getElementById('search');
searchBar.onkeypress = (e) => {
	if (e.keyCode === 13) {
		e.preventDefault();

		if (searchBar.value === "")
			return;

		document.getElementById('img-show')
				.setAttribute('src', 'imgs/loading.gif');

		axios.get(apiUrl(searchBar.value), {})
			.then((res) => {
				document.getElementById('img-show')
						.setAttribute('src', res.data.data[0].images.original.url)
			}).catch((err) => {
				document.getElementById('img-show')
						.setAttribute('src', "imgs/error.png");
				console.log(err);
			});
	}
};


//The following is adapted from: http://stackoverflow.com/questions/31171597/atom-electron-close-the-window-with-javascript

  document.getElementById("min-btn").addEventListener("click", function (e) {
       var win = remote.getCurrentWindow();
       win.minimize();
  });

  document.getElementById("max-btn").addEventListener("click", function (e) {
       var win = remote.getCurrentWindow();
       if (!win.isMaximized()) {
           win.maximize();
       } else {
           win.unmaximize();
       }
  });

  document.getElementById("close-btn").addEventListener("click", function (e) {
       var win = remote.getCurrentWindow();
       win.close();
  });
