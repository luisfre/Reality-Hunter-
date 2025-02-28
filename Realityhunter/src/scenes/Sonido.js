
// You can write more code here

/* START OF COMPILED CODE */

class Sonido extends Phaser.Scene {

	constructor() {
		super("Sonido");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}
	
	preload() {
		this.load.image('botonhome', 'assets/botonhome.png');
		this.load.image('botonefectoson', 'assets/botonefectoson.png');
		this.load.image('botonefectosoff', 'assets/botonefectosoff.png');
		this.load.audio('hoverSound', 'assets/hover.mp3');
		this.load.audio('clickSound', 'assets/click.mp3');
		this.load.image('fondo', 'assets/fondo.png');
		this.load.image('logo', 'assets/LOGOjuego.png');
		
	
	}
	
	

	/** @returns {void} */
	editorCreate() {
		 // Cargar el sonido que se reproducirá al pasar sobre el botón
        const hoverSound = this.sound.add('hoverSound');
		const clickSound = this.sound.add('clickSound');

		// fondo
		this.add.image(958, 543, 'fondo');
		
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
		
		const musica = this.add.text(850, 500, "", {});
musica.scaleX = 1.3077879388554257;
musica.scaleY = 1.3077879388554257;
musica.text = "Música";
musica.setStyle({ "fontSize": "50px", "fontStyle": "bold" });
		this.tweens.add({
    targets: musica,
    y: 300,
    duration: 1000,
    ease: 'Power2'
});
			const efectos = this.add.text(650, 500, "", {});
efectos.scaleX = 1.3077879388554257;
efectos.scaleY = 1.3077879388554257;
efectos.text = "Efectos de Sonido";
efectos.setStyle({ "fontSize": "50px", "fontStyle": "bold" });
		this.tweens.add({
    targets: efectos,
    y: 500,
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
	let slider = document.getElementById('volumeSlider');
        if (slider) {
            slider.remove(); // Elimina el slider del DOM
        }
    this.scene.start('MenupPrincial'); // Cambia a la escena deseada
});
		
		// ************************botón botonefectoson*********************************************************************************************
		let btnefectoson = this.add.image(440, 160, 'botonefectoson');
		
		btnefectoson.setPosition(1000, 700);

// Hacer el botón validar noticias
btnefectoson.setInteractive();

// Cambiar de color al pasar el mouse por encima
btnefectoson.on('pointerover', function () {
    this.setTint(0x0E7FDD); 
	this.setScale(1.05);
	 this.setAlpha(0.95);
	 hoverSound.play();
});

// Volver al color original cuando el mouse sale
btnefectoson.on('pointerout', function () {
    this.clearTint();
	this.setScale(1);// Elimina el tinte
	 this.setAlpha(1);
});
		btnefectoson.on('pointerdown', () => {
            this.game.config.controleffects = !this.game.config.controleffects;
			console.log(this.game.config.controleffects);			

            // Cambiar la imagen del ícono
            if (this.game.config.controleffects) {
                btnefectoson.setTexture('botonefectoson');
				 clickSound.play();
				// Efectos encendidos
            } else {
                btnefectoson.setTexture('botonefectosoff');  // Efectos apagados
            }
        });

		
		


		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {
		console.log(this.game.global.globalVolume);
		
		

        // Crear el slider de volumen dinámicamente usando JavaScript
        let slider = document.createElement('input');
        slider.type = 'range';
        slider.id = 'volumeSlider';
        slider.min = 0;
        slider.max = 100;
        slider.value = this.game.global.globalVolume * 100; // Valor inicial en 50%
        slider.style.position = 'absolute';
        slider.style.top = '700px';
        slider.style.left = '2020px';
		slider.style.width = '100px';
		; 
		// Aumentar tamaño visual del slider usando transform scale
slider.style.transform = 'scale(7)'; // Aumenta el tamaño en un 50%
slider.style.transformOrigin = 'center'; // Establece el punto de origen del escalado
        slider.style.zIndex = 10; // Asegúrate de que esté encima del canvas del juego

        // Agregar el slider al body del documento
        document.body.appendChild(slider);

        // Escuchar cambios en el slider y ajustar el volumen
        slider.addEventListener('input', (event) => {
            let newVolume = event.target.value / 100; // Convertir valor de 0-100 a 0-1
            
			this.game.global.globalVolume = newVolume; // Actualizar el volumen global
        });

		this.editorCreate();
	}
	

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
