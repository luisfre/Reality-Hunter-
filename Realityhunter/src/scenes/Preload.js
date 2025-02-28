
// You can write more code here

/* START OF COMPILED CODE */

class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	/** @returns {void} */
	editorCreate() {

		// fondo
		this.add.image(962, 538, "fondo");

		// progressBar
		const progressBar = this.add.rectangle(701, 823, 256, 20);
		progressBar.scaleX = 2.2150944945351188;
		progressBar.scaleY = 2.2497462235961416;
		progressBar.setOrigin(0, 0);
		progressBar.isFilled = true;
		progressBar.fillColor = 14737632;

		// preloadUpdater
		new PreloadBarUpdaterScript(progressBar);

		// progressBarBg
		const progressBarBg = this.add.rectangle(701, 823, 256, 20);
		progressBarBg.scaleX = 2.208041098283537;
		progressBarBg.scaleY = 2.208041098283537;
		progressBarBg.setOrigin(0, 0);
		progressBarBg.fillColor = 14737632;
		progressBarBg.isStroked = true;

		// loadingText
		const loadingText = this.add.text(733, 646, "", {});
		loadingText.scaleX = 0.9369559121383544;
		loadingText.scaleY = 0.9369559121383544;
		loadingText.text = "Cargando...";
		loadingText.setStyle({ "color": "#e0e0e0", "fontFamily": "arial", "fontSize": "100px" });

		// lOGOjuego
		const lOGOjuego = this.add.image(967, 268, "LOGOjuego");
		lOGOjuego.scaleX = 1.5403109390427923;
		lOGOjuego.scaleY = 1.5403109390427923;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.editorPreload();

		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("MenupPrincial"));
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
