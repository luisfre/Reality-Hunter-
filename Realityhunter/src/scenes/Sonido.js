class Sonido extends Phaser.Scene {
    constructor() {
        super("Sonido");
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

    create() {
        // Crear sonidos
        const hoverSound = this.sound.add('hoverSound');
        const clickSound = this.sound.add('clickSound');

        // Fondo
        this.add.image(958, 543, 'fondo');

        // Logo
        const LOGOjuego = this.add.image(950, 150, 'logo');

        // Añadir movimiento al LOGO
        const onAwakeScriptLOGO = new OnAwakeScript(LOGOjuego);
        const moveInSceneActionScriptLOGO = new MoveInSceneActionScript(onAwakeScriptLOGO);
        moveInSceneActionScriptLOGO.from = "TOP";
        const moveInSceneActionScriptDurationConfigCompLOGO = new DurationConfigComp(moveInSceneActionScriptLOGO);
        moveInSceneActionScriptDurationConfigCompLOGO.duration = 1000;

        // Textos
        const musica = this.add.text(850, 500, "Música", { fontSize: "50px", fontStyle: "bold" });
        musica.setScale(1.31);
        this.tweens.add({ targets: musica, y: 300, duration: 1000, ease: 'Power2' });

        const efectos = this.add.text(650, 500, "Efectos de Sonido", { fontSize: "50px", fontStyle: "bold" });
        efectos.setScale(1.31);
        this.tweens.add({ targets: efectos, y: 500, duration: 1000, ease: 'Power2' });

        // Botón home
        const btnhome = this.add.image(1790, 100, 'botonhome').setInteractive();
        btnhome.on('pointerover', function () {
            this.setTint(0x0E7FDD);
            this.setScale(1.05);
            this.setAlpha(0.95);
            hoverSound.play();
        });
        btnhome.on('pointerout', function () {
            this.clearTint();
            this.setScale(1);
            this.setAlpha(1);
        });
        btnhome.on('pointerdown', () => {
            clickSound.play();
            let slider = document.getElementById('volumeSlider');
            if (slider) {
                slider.remove();
            }
            this.scene.start('MenupPrincial');
        });

      // Botón efectos de sonido
let btnefectoson = this.add.image(1000, 700, 'botonefectoson').setInteractive();

btnefectoson.on('pointerover', function () {
    this.setTint(0x0E7FDD);
    this.setScale(1.05);
    this.setAlpha(0.95);
    hoverSound.play();
});

btnefectoson.on('pointerout', function () {
    this.clearTint();
    this.setScale(1);
    this.setAlpha(1);
});

btnefectoson.on('pointerdown', () => {
    // Cambiar el estado de los efectos de sonido
    this.game.config.controleffects = !this.game.config.controleffects;
    console.log('Efectos activados:', this.game.config.controleffects);

    // Cambiar la textura del botón según el estado de los efectos de sonido
    if (this.game.config.controleffects) {
        btnefectoson.setTexture('botonefectoson');
        clickSound.play();
        this.sound.volume = this.game.global.globalVolume; // Restablecer volumen de efectos
    } else {
        btnefectoson.setTexture('botonefectosoff');
        this.sound.volume = 0; // Silenciar efectos de sonido
    }
});

        // Crear slider de volumen
        let slider = document.createElement('input');
        slider.type = 'range';
        slider.id = 'volumeSlider';
        slider.min = 0;
        slider.max = 100;
        slider.value = this.game.global.globalVolume * 100;
        slider.style.position = 'absolute';
        slider.style.top = '350px';
        slider.style.left = '600px';
        slider.style.width = '100px';
        slider.style.transform = 'scale(3)';
        slider.style.zIndex = 10;
        document.body.appendChild(slider);

		slider.addEventListener('input', (event) => {
			let newVolume = event.target.value / 100;
			this.game.global.globalVolume = newVolume;
		
			// Actualizar volumen de la música de fondo
			let music = this.sound.get('backgroundMusic');
			if (music) {
				music.setVolume(this.game.global.globalVolume);
			}
		
			// Si los efectos de sonido están habilitados, actualiza también su volumen
			if (this.game.config.controleffects) {
				this.sound.volume = this.game.global.globalVolume; // Ajustar el volumen de los efectos globalmente
			}
		});

        this.events.emit("scene-awake");
    }
}
