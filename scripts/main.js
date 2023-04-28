let myImage = document.querySelector('img');
let myButton = document.querySelector('button'); 

myImage.onclick = () => {
	const mySrc = myImage.getAttribute("src");
	if (mySrc === "images/mai-dragon-in-love.gif") {
	    myImage.setAttribute("src", "images/flustered-anime.gif");
	} else {
	    myImage.setAttribute("src", "images/mai-dragon-in-love.gif");
	}
};


function setLoveName() {
	const name = prompt("Você me ama?");
	localStorage.setItem("name", name);

	if (['nao', 'não', 'no', 'not', 'n'].includes(name.toLowerCase())) {
		alert('Poxa ;( tudo acabado');
	} else if (['sim', 'si', 'yes', 's', 'y', 'yep'].includes(name.toLowerCase())) {
		alert('Eu te amo também <3 S2 ❤💕😍😘');
	} else {
		alert('Resposta recusada, digitar novamente')
		setLoveName()
	};
};

myButton.onclick = () => {
	setLoveName();
};
