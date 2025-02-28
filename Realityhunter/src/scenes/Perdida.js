
// You can write more code here

/* START OF COMPILED CODE */

class Perdida extends Phaser.Scene {

	constructor() {
		super("Perdida");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}
	preload() {
		this.load.image('botonhome', 'assets/botonhome.png');
		this.load.image('botonrecargar', 'assets/botonrecargar.png');
		this.load.audio('hoverSound', 'assets/hover.mp3');
		this.load.audio('clickSound', 'assets/click.mp3');
		this.load.image('perdiste', 'assets/perdiste.png');
		this.load.image('perdistepersonaje', 'assets/perdistepersonaje.png');
		this.load.image('fondo', 'assets/fondo.png');

	
	}

	/** @returns {void} */
	editorCreate() {
		
		 // Cargar el sonido que se reproducirá al pasar sobre el botón
        const hoverSound = this.sound.add('hoverSound');
		const clickSound = this.sound.add('clickSound');


		// fondo
		this.add.image(963, 543, 'fondo');

		// perdiste
		
		const perdisteimg = this.add.image(1056, 153, 'perdiste');
		perdisteimg.setPosition(950, 150);

// Aplicar el script OnAwake al LOGO
const onAwakeScriptLOGO = new OnAwakeScript(perdisteimg);

// Aplicar el script de movimiento desde la parte superior al LOGO
const moveInSceneActionScriptLOGO = new MoveInSceneActionScript(onAwakeScriptLOGO);
moveInSceneActionScriptLOGO.from = "TOP"; // El LOGO se moverá desde la parte superior

// Configurar la duración del movimiento (1 segundo, como el dino)
const moveInSceneActionScriptDurationConfigCompLOGO = new DurationConfigComp(moveInSceneActionScriptLOGO);
moveInSceneActionScriptDurationConfigCompLOGO.duration = 1000; // Duración de 1 segundo

		// perdistepersonaje
		
		const perdistepersonaje = this.add.image(333, 687, 'perdistepersonaje');
		perdistepersonaje.setPosition(333, 687);
		
		// Aplicar el script OnAwake al LOGO
const onAwakeScriptpersonaje = new OnAwakeScript(perdistepersonaje);

// Aplicar el script de movimiento desde la parte superior al LOGO
const moveInSceneActionScriptpersonaje = new MoveInSceneActionScript(onAwakeScriptpersonaje);
moveInSceneActionScriptpersonaje.from = "BOTTOM"; // El LOGO se moverá desde la parte superior

// Configurar la duración del movimiento (1 segundo, como el dino)
const moveInSceneActionScriptDurationConfigComppersonaje = new DurationConfigComp(moveInSceneActionScriptpersonaje);
moveInSceneActionScriptDurationConfigComppersonaje.duration = 1000; // Duración de 1 segundo
		

		
	// ************************botón home*********************************************************************************************
		const btnhome = this.add.image(840, 160, 'botonhome');
		
		btnhome.setPosition(1200, 500);
		btnhome.setScale(1.5);

// Hacer el botón validar noticias
btnhome.setInteractive();

// Cambiar de color al pasar el mouse por encima
btnhome.on('pointerover', function () {
    this.setTint(0x0E7FDD); 
	this.setScale(1.55);
	 this.setAlpha(0.95);
	 hoverSound.play();
});

// Volver al color original cuando el mouse sale
btnhome.on('pointerout', function () {
    this.clearTint();
	this.setScale(1.5);// Elimina el tinte
	 this.setAlpha(1);
});
		

// Acción cuando se hace clic en el botón
btnhome.on('pointerdown', () => {
	 clickSound.play();
	 window.location.href = window.location.origin + window.location.pathname + '?scene=MenupPrincial&nocache=' + new Date().getTime();
});
		
			// ************************botón recargar*********************************************************************************************
		const btnrecargar = this.add.image(840, 160, 'botonrecargar');
		
		btnrecargar.setPosition(900, 500);
		btnrecargar.setScale(1.5);

// Hacer el botón validar noticias
btnrecargar.setInteractive();

// Cambiar de color al pasar el mouse por encima
btnrecargar.on('pointerover', function () {
    this.setTint(0x0E7FDD); 
	this.setScale(1.55);
	 this.setAlpha(0.95);
	 hoverSound.play();
});

// Volver al color original cuando el mouse sale
btnrecargar.on('pointerout', function () {
    this.clearTint();
	this.setScale(1.5);// Elimina el tinte
	 this.setAlpha(1);
});
		

// Acción cuando se hace clic en el botón
btnrecargar.on('pointerdown', () => {
	 clickSound.play();
	 window.location.href = window.location.origin + window.location.pathname + '?scene=Nivel1&nocache=' + new Date().getTime();
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
