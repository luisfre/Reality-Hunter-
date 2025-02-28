
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}
	preload() {
	
		this.load.image('logo', 'assets/LOGOjuego.png');
		this.load.image('fondo', 'assets/fondo.png');
		this.load.image('eugenio', 'assets/personajeintro.png');
		this.load.audio('hoverSound', 'assets/hover.mp3');
		this.load.audio('clickSound', 'assets/click.mp3');
		
        this.load.audio('backgroundMusic', 'assets/backgroundmusic.mp3');
	
	}

	/** @returns {void} */
	editorCreate() {
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
				

		

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();

		const introText = "¡Saludos, joven cazador de la verdad!\n" +
		"Soy Eugenio Espejo, el padre del periodismo ecuatoriano. " +
		"Te acompañaré en esta travesía para identificar noticias falsas, " +
		"aquellas que, como los rumores malintencionados en mi época, " +
		"desinforman a la sociedad.\n\n" +
		"En 'Reality Hunter', tu misión es navegar entre hechos y mentiras, " +
		"desarrollando el ojo crítico que te permitirá discernir " +
		"la verdad en este océano de información.\n\n" +
		"Presta atención, observa cuidadosamente, y recuerda: la verdad " +
		"siempre prevalecerá si la buscamos con convicción y sabiduría.";

// Añadir el texto de la introducción
this.introMessage = this.add.text(560, 530, introText, {
fontSize: '28px',
fill: '#ffffff',
fontFamily: 'Roboto',
align: 'center',
wordWrap: { width: 800 }
});
this.introMessage.setOrigin(0.5);
// Inicializar con opacidad 0 (invisible)
this.introMessage.alpha = 0;

// Crear la animación de entrada con opacidad
this.tweens.add({
    targets: this.introMessage,  // El objeto a animar
    alpha: 1,  // Cambia la opacidad de 0 a 1
    duration: 3000,  // Duración de 2 segundos
    ease: 'Power2',  // Tipo de easing para una animación suave
    onComplete: () => {
        console.log("Animación de entrada completada");
    }
});

// perdistepersonaje
		
const personaje = this.add.image(333, 687, 'eugenio');
personaje.setPosition(1433, 900);

// Usar un tween para moverlo hacia arriba (a la posición final)
this.tweens.add({
    targets: personaje,
    y: 787, // Posición final en el eje Y
    duration: 1000, // Duración del movimiento (1 segundo)
    ease: 'Power2', // Efecto de suavizado
    onComplete: () => {
        console.log("Movimiento completado");
    }
});

// Instrucción para continuar
const continueText = "Haz clic o presiona una tecla para continuar.";
this.continueMessage = this.add.text(560, 850, continueText, {
fontSize: '24px',
fill: '#ffcc00',
fontFamily: 'Roboto',
align: 'center'
});
this.continueMessage.setOrigin(0.5);

// Animación de zoom in y zoom out
this.tweens.add({
    targets: this.continueMessage,
    scaleX: 1.02,  // Aumentar escala en el eje X (zoom in)
    scaleY: 1.02,  // Aumentar escala en el eje Y (zoom in)
    duration: 500,  // Duración de la animación (medio segundo)
    yoyo: true,  // La animación volverá al tamaño original (zoom out)
    repeat: -1,  // Repetir indefinidamente
    ease: 'Sine.easeInOut'  // Tipo de easing suave para hacer que la animación fluya bien
});

// Detectar clic o tecla para avanzar
this.input.once('pointerdown', () => {
this.scene.start('MenupPrincial');
});

this.input.keyboard.once('keydown', () => {
this.scene.start('MenupPrincial');
});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
