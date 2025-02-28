
// You can write more code here

/* START OF COMPILED CODE */

class Creditos extends Phaser.Scene {

	constructor() {
		super("Creditos");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}
	preload() {
		this.load.image('botonhome', 'assets/botonhome.png');
		this.load.audio('hoverSound', 'assets/hover.mp3');
		this.load.audio('clickSound', 'assets/click.mp3');
		this.load.image('sello', 'assets/sello_400 (1).png');
		this.load.image('logo', 'assets/LOGOjuego.png');
	
	}
	

	/** @returns {void} */
	editorCreate() {
		 // Cargar el sonido que se reproducirá al pasar sobre el botón
        const hoverSound = this.sound.add('hoverSound');
		const clickSound = this.sound.add('clickSound');

		// fondo
		this.add.image(957, 542, "fondo");

		// LOGOjuego - baja desde la parte superior
const lOGOjuego = this.add.image(972, -100, 'logo'); // Inicia fuera de la pantalla
lOGOjuego.scaleX = 0.5314361913470916;
lOGOjuego.scaleY = 0.5314361913470916;

// Animación para que el logo baje
this.tweens.add({
    targets: lOGOjuego,
    y: 112, // La posición final en Y
    duration: 1000, // Duración de la animación (1 segundo)
    ease: 'Power2'
});

// UNIVERSIDAD CENTRAL DEL ECUADOR - sube desde abajo
const uNIVERSIDAD_CENTRAL_DEL_ECUADOR = this.add.text(329, 900, "", {}); // Empieza fuera de la pantalla
uNIVERSIDAD_CENTRAL_DEL_ECUADOR.scaleX = 1.3052523153875244;
uNIVERSIDAD_CENTRAL_DEL_ECUADOR.scaleY = 1.3052523153875244;
uNIVERSIDAD_CENTRAL_DEL_ECUADOR.text = "UNIVERSIDAD CENTRAL DEL ECUADOR";
uNIVERSIDAD_CENTRAL_DEL_ECUADOR.setStyle({ "fontSize": "50px", "fontStyle": "bold" });

// Animación para que el texto suba
this.tweens.add({
    targets: uNIVERSIDAD_CENTRAL_DEL_ECUADOR,
    y: 235, // La posición final en Y
    duration: 1000,
    ease: 'Power2'
});

// Repite la misma estructura para cada elemento que quieras animar hacia arriba

// Sello_400__1_ - sube
const sello_400__1_ = this.add.image(964, 900, 'sello');
sello_400__1_.scaleX = 0.363681411331222;
sello_400__1_.scaleY = 0.363681411331222;

this.tweens.add({
    targets: sello_400__1_,
    y: 453,
    duration: 1000,
    ease: 'Power2'
});

// UNIVERSIDAD CENTRAL DEL ECUADOR_1 - sube
const uNIVERSIDAD_CENTRAL_DEL_ECUADOR_1 = this.add.text(886, 1000, "", {});
uNIVERSIDAD_CENTRAL_DEL_ECUADOR_1.scaleX = 1.3077879388554257;
uNIVERSIDAD_CENTRAL_DEL_ECUADOR_1.scaleY = 1.3077879388554257;
uNIVERSIDAD_CENTRAL_DEL_ECUADOR_1.text = "TUTOR";
uNIVERSIDAD_CENTRAL_DEL_ECUADOR_1.setStyle({ "fontSize": "50px", "fontStyle": "bold" });

this.tweens.add({
    targets: uNIVERSIDAD_CENTRAL_DEL_ECUADOR_1,
    y: 686,
    duration: 1000,
    ease: 'Power2'
});

// UNIVERSIDAD CENTRAL DEL ECUADOR_2 - sube
const uNIVERSIDAD_CENTRAL_DEL_ECUADOR_2 = this.add.text(789, 1100, "", {});
uNIVERSIDAD_CENTRAL_DEL_ECUADOR_2.scaleX = 0.6621533629691342;
uNIVERSIDAD_CENTRAL_DEL_ECUADOR_2.scaleY = 0.6621533629691342;
uNIVERSIDAD_CENTRAL_DEL_ECUADOR_2.text = "LUIS FELIPE BORJA";
uNIVERSIDAD_CENTRAL_DEL_ECUADOR_2.setStyle({ "fontSize": "60px" });

this.tweens.add({
    targets: uNIVERSIDAD_CENTRAL_DEL_ECUADOR_2,
    y: 760,
    duration: 1000,
    ease: 'Power2'
});

// UNIVERSIDAD CENTRAL DEL ECUADOR_3 - sube
const uNIVERSIDAD_CENTRAL_DEL_ECUADOR_3 = this.add.text(757, 1200, "", {});
uNIVERSIDAD_CENTRAL_DEL_ECUADOR_3.scaleX = 0.9372926702446784;
uNIVERSIDAD_CENTRAL_DEL_ECUADOR_3.scaleY = 0.9372926702446784;
uNIVERSIDAD_CENTRAL_DEL_ECUADOR_3.text = "DESARROLLADOR";
uNIVERSIDAD_CENTRAL_DEL_ECUADOR_3.setStyle({ "fontSize": "60px", "fontStyle": "bold" });

this.tweens.add({
    targets: uNIVERSIDAD_CENTRAL_DEL_ECUADOR_3,
    y: 842,
    duration: 1000,
    ease: 'Power2'
});

// UNIVERSIDAD CENTRAL DEL ECUADOR_4 - sube
const uNIVERSIDAD_CENTRAL_DEL_ECUADOR_4 = this.add.text(646, 1300, "", {});
uNIVERSIDAD_CENTRAL_DEL_ECUADOR_4.scaleX = 0.6083033880210709;
uNIVERSIDAD_CENTRAL_DEL_ECUADOR_4.scaleY = 0.6083033880210709;
uNIVERSIDAD_CENTRAL_DEL_ECUADOR_4.text = "LUIS FELIPE RODRIGUEZ ESPITIA";
uNIVERSIDAD_CENTRAL_DEL_ECUADOR_4.setStyle({ "fontSize": "60px" });

this.tweens.add({
    targets: uNIVERSIDAD_CENTRAL_DEL_ECUADOR_4,
    y: 921,
    duration: 1000,
    ease: 'Power2'
});
		
		// ************************botón home*********************************************************************************************
		const btnhome = this.add.image(440, 160, 'botonhome');
		
		btnhome.setPosition(1790, 100);

// Hacer el botón validar noticias
btnhome.setInteractive();

// Cambiar de color al pasar el mouse por encima
btnhome.on('pointerover', function () {
    this.setTint(0x0E7FDD); 
	this.setScale(1.05);
	 this.setAlpha(0.95);
	 hoverSound.play();
});

// Volver al color original cuando el mouse sale
btnhome.on('pointerout', function () {
    this.clearTint();
	this.setScale(1);// Elimina el tinte
	 this.setAlpha(1);
});
		

// Acción cuando se hace clic en el botón
btnhome.on('pointerdown', () => {
	 clickSound.play();
    this.scene.start('MenupPrincial'); // Cambia a la escena deseada
});

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
