let myImage = document.querySelector('img');
//let myButton = document.querySelector('button'); 

/*
myImage.onclick = () => {
	changeImage()
};
*/
/*
myButton.onclick = () => {
	setLoveName();
};

setInterval(changeImage, 1000)
*/
const images = ["images/mai-dragon-in-love.gif", "images/flustered-anime.gif", "images/anime-love.gif"];
let actualImage = 0;
let imagesLength = images.length -1;

function changeImage() {
	const mySrc = myImage.getAttribute("src");
	if (actualImage < imagesLength){
		actualImage++;
	} else {
		actualImage = 0;
	};
	myImage.setAttribute('src', images[actualImage]);

};


function setLoveName() {
	const name = prompt("Você tomou água hoje?");
	localStorage.setItem("name", name);

	if (['nao', 'não', 'no', 'not', 'n', 'nope'].includes(name.toLowerCase())) {
		alert('Tome vergonha na cara e vá tomar.');
		//setLoveName();
	} else if (['sim', 'si', 'yes', 's', 'y', 'yep'].includes(name.toLowerCase())) {
		alert('Muito bem, continue bebendo bastante água.');
	} else {
		alert('Entendi não, digite de novo...')
		setLoveName();
	};
};

