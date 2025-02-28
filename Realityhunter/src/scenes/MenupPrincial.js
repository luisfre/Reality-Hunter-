
// You can write more code here

/* START OF COMPILED CODE */

class MenupPrincial extends Phaser.Scene {

	constructor() {
		super("MenupPrincial");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}
	preload() {
		this.load.image('botonjugar', 'assets/botonjugar.png');
		this.load.image('botonvalidar', 'assets/botonvalidar.png');
		this.load.image('botonsonido', 'assets/botonsonido.png');
		this.load.image('botoncreditos', 'assets/botoncreditos.png');
		this.load.image('botonsalir', 'assets/botonsalir.png');
		this.load.image('logo', 'assets/LOGOjuego.png');
		this.load.image('fondo', 'assets/fondo.png');
		this.load.audio('hoverSound', 'assets/hover.mp3');
		this.load.audio('clickSound', 'assets/click.mp3');
		
        this.load.audio('backgroundMusic', 'assets/backgroundmusic.mp3');
	
	}

	/** @returns {void} */
	editorCreate() {
 // Cargar el sonido que se reproducirá al pasar sobre el botón
 if (!this.sound.get('backgroundMusic')) {
	let music = this.sound.add('backgroundMusic', {
		loop: true,
		volume: 0.5 // Ajusta el volumen si es necesario
	});
	music.play();
}
        const hoverSound = this.sound.add('hoverSound');
		const clickSound = this.sound.add('clickSound');
		// fondo
		this.add.image(957, 539, 'fondo');

		const LOGOjuego = this.add.image(1056, 153, 'logo');
		LOGOjuego.setPosition(950, 150);

// Aplicar el script OnAwake al LOGO
const onAwakeScriptLOGO = new OnAwakeScript(LOGOjuego);

// Aplicar el script de movimiento desde la parte superior al LOGO
const moveInSceneActionScriptLOGO = new MoveInSceneActionScript(onAwakeScriptLOGO);
moveInSceneActionScriptLOGO.from = "TOP"; // El LOGO se moverá desde la parte superior

// Configurar la duración del movimiento (1 segundo, como el dino)
const moveInSceneActionScriptDurationConfigCompLOGO = new DurationConfigComp(moveInSceneActionScriptLOGO);
moveInSceneActionScriptDurationConfigCompLOGO.duration = 1000; // Duración de 1 segundo
		
		
// ************************boton jugar*********************************************************************************************
		const btnjugar = this.add.image(640, 360, 'botonjugar');
		
		btnjugar.setPosition(950, 350);

// Hacer el botón interactivo
btnjugar.setInteractive();

btnjugar.on('pointerover', function () {
    btnjugar.setTint(0x0E7FDD);  // Cambiar el tinte del botón
    btnjugar.setScale(1.05);
    btnjugar.setAlpha(0.95);
    
    //console.log(this.game.config.controleffects); // Contexto de la escena sigue correcto
    hoverSound.play();
}, this);
		



// Volver al color original cuando el mouse sale
btnjugar.on('pointerout', function () {
    btnjugar.clearTint();  // Elimina el tinte
    btnjugar.setScale(1); // Volver al tamaño original
    btnjugar.setAlpha(1); // Volver a la transparencia original
}, this);
		

// Acción cuando se hace clic en el botón
btnjugar.on('pointerdown', () => {
	  clickSound.play();
    this.scene.start('InstructivoNivel1'); // Cambia a la escena deseada
});
		
				
// ************************botón validar noticias*********************************************************************************************
		const btnvalidar = this.add.image(640, 360, 'botonvalidar');
		
		btnvalidar.setPosition(950, 470);

// Hacer el botón validar noticias
btnvalidar.setInteractive();

// Cambiar de color al pasar el mouse por encima
btnvalidar.on('pointerover', function () {
    this.setTint(0x0E7FDD); 
	this.setScale(1.05);
	 this.setAlpha(0.95);
	hoverSound.play();
});

// Volver al color original cuando el mouse sale
btnvalidar.on('pointerout', function () {
    this.clearTint();
	this.setScale(1);// Elimina el tinte
	 this.setAlpha(1);
});
		

// Acción cuando se hace clic en el botón
btnvalidar.on('pointerdown', () => {
	 clickSound.play();
    this.scene.start('InstructivoNivel3'); // Cambia a la escena deseada
});
// ************************botón sonido*********************************************************************************************
		const btnsonido = this.add.image(640, 360, 'botonsonido');
		
		btnsonido.setPosition(950, 590);

// Hacer el botón validar noticias
btnsonido.setInteractive();

// Cambiar de color al pasar el mouse por encima
btnsonido.on('pointerover', function () {
    this.setTint(0x0E7FDD); 
	this.setScale(1.05);
	 this.setAlpha(0.95);
	hoverSound.play();
});

// Volver al color original cuando el mouse sale
btnsonido.on('pointerout', function () {
    this.clearTint();
	this.setScale(1);// Elimina el tinte
	 this.setAlpha(1);
});
		

// Acción cuando se hace clic en el botón
btnsonido.on('pointerdown', () => {
	 clickSound.play();
    this.scene.start('Sonido'); // Cambia a la escena deseada
});
// ************************botón creditos*********************************************************************************************
		const btncreditos = this.add.image(640, 360, 'botoncreditos');
		
		btncreditos.setPosition(950, 710);

// Hacer el botón validar noticias
btncreditos.setInteractive();

// Cambiar de color al pasar el mouse por encima
btncreditos.on('pointerover', function () {
    this.setTint(0x0E7FDD); 
	this.setScale(1.05);
	 this.setAlpha(0.95);
	hoverSound.play();
});

// Volver al color original cuando el mouse sale
btncreditos.on('pointerout', function () {
    this.clearTint();
	this.setScale(1);// Elimina el tinte
	 this.setAlpha(1);
});
		

// Acción cuando se hace clic en el botón
btncreditos.on('pointerdown', () => {
	 clickSound.play();
    this.scene.start('Creditos'); // Cambia a la escena deseada
});

// ************************botón salir*********************************************************************************************
		const btnsalir = this.add.image(640, 360, 'botonsalir');
		
		btnsalir.setPosition(950, 830);

// Hacer el botón validar noticias
btnsalir.setInteractive();

// Cambiar de color al pasar el mouse por encima
btnsalir.on('pointerover', function () {
    this.setTint(0x0E7FDD); 
	this.setScale(1.05);
	 this.setAlpha(0.95);
	hoverSound.play();
});

// Volver al color original cuando el mouse sale
btnsalir.on('pointerout', function () {
    this.clearTint();
	this.setScale(1);// Elimina el tinte
	 this.setAlpha(1);
});
		

// Acción cuando se hace clic en el botón
btnsalir.on('pointerdown', () => {
	 clickSound.play();
   window.close(); // Cambia a la escena deseada
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
