// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let axios = require('axios');
let storedGIFs = [];

const apiUrl = (term) => {
	return `http://api.giphy.com/v1/gifs/search?q=${term}&api_key=dc6zaTOxFJmzC`;
};

const getGifURL = () =>{
	storedGIFs.push(document.getElementById('img-show')
	.getattribute('src'));
	console.log("in gifurl")
}

let searchBar = document.getElementById('search');
searchBar.onkeypress = (e) => {
	if (e.keyCode === 13) {
		e.preventDefault();

		if (searchBar.value === "")
			return;

		// loading
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