
// You can write more code here

/* START OF COMPILED CODE */

class InstructivoNivel2 extends Phaser.Scene {

	constructor() {
		super("InstructivoNivel2");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}
	preload() {
	
		this.load.image('logo', 'assets/LOGOjuego.png');
		this.load.image('fondo', 'assets/fondo.png');
		this.load.image('eugenio', 'assets/personajenivel2.png');
		this.load.audio('hoverSound', 'assets/hover.mp3');
		this.load.audio('clickSound', 'assets/click.mp3');
		
      
	
	}

	/** @returns {void} */
	editorCreate() {
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

	// Write your code here

	create() {

		this.editorCreate();
		const introText = "¡Felicidades! Has recolectado noticias. Ahora, tu tarea es determinar cuáles de ellas son verdaderas y cuáles son falsas.\n\n" +
    "Analiza cada noticia: Lee cuidadosamente el título, el contenido y la fuente de cada noticia que has recolectado.\n\n" +
    "Dale clic en la Tablet y selecciona si la noticia es VERDADERA o FALSA.\n\n" +
    "Recibe retroalimentación: Después de hacer tu selección, recibirás una retroalimentación que te indicará si acertaste o no.\n\n" +
    "¡Buena suerte! La precisión y el análisis son tus mejores aliados.";

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
    duration: 3000,  // Duración de 3 segundos
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
    y: 650, // Posición final en el eje Y
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
this.scene.start('Nivel2');
});

this.input.keyboard.once('keydown', () => {
this.scene.start('Nivel2');
});


	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
