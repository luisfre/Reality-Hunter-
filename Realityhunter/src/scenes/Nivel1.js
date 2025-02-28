class Nivel1 extends Phaser.Scene {

	constructor() {
		super("Nivel1");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {
		this.events.emit("scene-awake");
	}
	
	preload() {
		// Cargar elementos 2D
		this.load.image('logojuego', 'assets/LOGOjuego.png');
		this.load.image('plataforma', 'assets/Nivel1/plataforma.webp');
		this.load.spritesheet('player', 'assets/Nivel1/personaje1.png', { frameWidth: 57, frameHeight: 62 });
		this.load.image("news", "assets/Nivel1/news.png");
		
		// Cargar modelos 3D
		this.load.obj('ambientecompleto', 'assets/Nivel1/3d/ambiente/ambientecompleto.obj');
		this.load.obj('hand', 'assets/Nivel1/3d/mano/Hand4.obj');
		this.load.obj('silla', 'assets/Nivel1/3d/silla/silla.obj');
		this.load.obj('peligro', 'assets/Nivel1/3d/peligro/peligro.obj');
		this.load.obj('basurero', 'assets/Nivel1/3d/basurero/basurero.obj');
		this.load.obj('periodico', 'assets/Nivel1/3d/periodico/periodico.obj');
	}

	create() {
		// Set up Phaser physics
		this.physics.world.setBounds(0, 0, 1920, 1080);
	
		
		// Configurar Three.js
		this.setupThreeJS();
		this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		
		

		// Manejar el redimensionamiento de la ventana
		window.addEventListener('resize', this.onWindowResize.bind(this));
		
		// Llamar a la función de redimensionamiento al iniciar la escena
		this.onWindowResize();

				
		
		
		// Configurar teclas y otros elementos
		this.cursors = this.input.keyboard.createCursorKeys();
	

		// Variables globales
		this.newsItems = [];
		this.obstaculos2d = [];
		this.obstaculo = 0;
		this.peligro = null;
		this.basurero = null;
		this.silla = null;
		this.boundie = true;
		this.contadoractivo = true;
		this.primerobst=true;
		this.obstopc=0;
		

		// Estado del juego
		this.isGameOver = false;
		// Cargar los elementos 3D y luego los elementos 2D
		this.cargarElementos3D().then(() => {
			this.cargarElementos2D();
		}).catch(error => {
			console.error("Error al cargar elementos 3D:", error);
		});

		this.siguientenoticia2d();
		this.obstaculo = Phaser.Math.RND.pick([1, 2, 3]);
		this.cargarobstaculo3d(this.obstaculo);
		this.ispause = false;

		this.editorCreate();
	}
	
	setupThreeJS() {
		// Crear la escena 3D
		this.scene3D = new THREE.Scene();
	
		// Crear la cámara 3D
		this.camera3D = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	
		// Crear el renderizador 3D
		this.renderer3D = new THREE.WebGLRenderer();
		this.renderer3D.setSize(window.innerWidth, window.innerHeight);
	
		// Añadir el canvas de Three.js al contenedor de Phaser
		const container = document.getElementById('game-container');
		container.appendChild(this.renderer3D.domElement);
		this.renderer3D.domElement.classList.add('threejs-canvas');
		
		this.container2D = new THREE.Group();
		this.scene3D.add(this.container2D);
	
		// Añadir luces
		const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
		this.scene3D.add(hemisphereLight);
	
		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight.position.set(5, 10, 7.5);
		this.scene3D.add(directionalLight);
	
		const pointLight = new THREE.PointLight(0xffffff, 1);
		pointLight.position.set(0, 2, 2);
		this.scene3D.add(pointLight);
	
		// Configurar la posición inicial de la cámara
		this.camera3D.position.set(5, 5, 3);
		this.camera3D.rotation.x = -1;
		
		
	}

	pausar(){
			this.ispause = true; // Set the flag to true
   
	
	   
	   
	}


	cargarElementos3D() {
		return new Promise((resolve, reject) => {

        	// Contador para los elementos cargados
			let elementsLoaded = 0;
			const totalElements = 2;
	
			const checkAllElementsLoaded = () => {
				elementsLoaded++;
				if (elementsLoaded === totalElements) {
					resolve();
				}
			};
	
			const handleLoadError = (error) => {
				console.error(error);
				reject(error);
			};

//********************** Cargar ambiente 3D ***********************************************
			const mtlLoader2 = new THREE.MTLLoader();
			mtlLoader2.load('assets/Nivel1/3d/ambiente/ambientecompleto.mtl', (materials) => {
				materials.preload();
				const objLoader2 = new THREE.OBJLoader();
				objLoader2.setMaterials(materials);
				objLoader2.load('assets/Nivel1/3d/ambiente/ambientecompleto.obj', (object) => {
					this.ambiente = object;
					this.scene3D.add(this.ambiente);
					this.ambiente.scale.set(1.4, 1.4, 1.4);
					this.ambiente.position.set(0, -2, -10);
					checkAllElementsLoaded();
				}, undefined, handleLoadError);
			}, undefined, handleLoadError);

//***************** Cargar mano con celular *****************************/
const mtlLoader = new THREE.MTLLoader();
mtlLoader.load('assets/Nivel1/3d/mano/Hand4.mtl', (materials) => {
	materials.preload();
	const objLoader = new THREE.OBJLoader();
	objLoader.setMaterials(materials);
	objLoader.load('assets/Nivel1/3d/mano/Hand4.obj', (object) => {
		this.mano = object;
		this.scene3D.add(this.mano);
		this.mano.scale.set(0.0035, 0.0035, 0.0035);
		this.mano.rotation.set(-0.3, -1.6, 0);
		this.mano.position.set(5, 1.8, 5.1);

	 // Crear el bounding box para la mano
	 this.manoBoundingBox = new THREE.Box3().setFromObject(this.mano);

	 // Scale el bounding box 
	 let mano_scaleX= 0.65; // Scale factor for the X-axis
	 let mano_scaleY = 0.4; // Scale factor for the Y-axis
	 let mano_scaleZ = 0.2; // Scale factor for the Z-axis

	 this.mano_center = this.manoBoundingBox.getCenter(new THREE.Vector3());
	 this.mano_size = this.manoBoundingBox.getSize(new THREE.Vector3());

	 // Ajustar limites del bounding box
	 this.manoBoundingBox.min.x = this.mano_center.x - (this.mano_size.x * mano_scaleX/ 2);
	 this.manoBoundingBox.max.x = this.mano_center.x + (this.mano_size.x * mano_scaleX/ 2);

	 this.manoBoundingBox.min.y = this.mano_center.y - (this.mano_size.y * mano_scaleY / 2);
	 this.manoBoundingBox.max.y = this.mano_center.y + (this.mano_size.y * mano_scaleY / 2);

	 this.manoBoundingBox.min.z = this.mano_center.z - (this.mano_size.z * mano_scaleZ / 2);
	 this.manoBoundingBox.max.z = this.mano_center.z + (this.mano_size.z * mano_scaleZ / 2);
	 // Visualizar el bounding box (opcional para debug)
	 this.manoHelper = new THREE.Box3Helper(this.manoBoundingBox, 0xff0000);
	 this.scene3D.add(this.manoHelper);

	checkAllElementsLoaded();
	}, undefined, handleLoadError);
}, undefined, handleLoadError);



		});


	}
	
	cargarElementos2D() {

// Crear la máscara solo una vez
const maskGeometry = new THREE.PlaneGeometry(4.44, 2.8);
const maskMaterial = new THREE.MeshBasicMaterial({
    colorWrite: false,
    color: 0xff0000, // Establecer el color a rojo o cualquier otro color que prefieras
    depthWrite: false,
    stencilWrite: true,
    stencilRef: 1,
    stencilFunc: THREE.AlwaysStencilFunc,
    stencilFail: THREE.ReplaceStencilOp,
    stencilZFail: THREE.ReplaceStencilOp,
    stencilZPass: THREE.ReplaceStencilOp
});

this.mask = new THREE.Mesh(maskGeometry, maskMaterial);
this.mask.position.set(4.7, 2, 1.6); // Posiciona la máscara
this.mask.rotation.set(-1.305, 0, 0.009);
this.container2D.add(this.mask);

// Cargar la textura para fondo 1
const textureLoader = new THREE.TextureLoader();
textureLoader.load('assets/Nivel1/fond1.webp', (texture1) => {
    // Crear un material para el fondo 1
    const clippedMaterial1 = new THREE.MeshBasicMaterial({
        map: texture1,
        transparent: true,
        stencilWrite: true,
        stencilRef: 1,
        stencilFunc: THREE.EqualStencilFunc
    });

    // Crear un plano para el fondo 1
    const planeGeometry1 = new THREE.PlaneGeometry(4.8, 2.37);
    this.fondocel1 = new THREE.Mesh(planeGeometry1, clippedMaterial1);
    this.fondocel1.position.set(4.7, 1.88, 1.82);
    this.fondocel1.rotation.set(-1.305, 0, 0.009);

    // Agregar el fondo 1 al contenedor
    this.container2D.add(this.fondocel1);
});
// Cargar la textura para fondo 1
const textureLogoLoader = new THREE.TextureLoader();
textureLogoLoader.load('assets/LOGOjuego.png', (texture1) => {
    // Crear un material para el fondo sin stencil
    const materialLogo = new THREE.MeshBasicMaterial({
        map: texture1,
        transparent: true // Mantén la transparencia si es necesario
    });

    // Crear un plano para el fondo
    const planeGeometryLogo = new THREE.PlaneGeometry(4.8, 2.37);
    this.LOGO = new THREE.Mesh(planeGeometryLogo, materialLogo); // Usa el geometry y material correctos
    this.LOGO.position.set(4.7, 1.6, -4);
    this.LOGO.rotation.set(-0.5, 0, 0.009);

    // Agregar el fondo al contenedor
    this.scene3D.add(this.LOGO);
});
// Cargar la textura para fondo 1
const texturenotiLoader = new THREE.TextureLoader();
texturenotiLoader.load('assets/Nivel1/news.png', (texture1) => {
    // Crear un material para el fondo sin stencil
    const materialnoti = new THREE.MeshBasicMaterial({
        map: texture1,
        transparent: true // Mantén la transparencia si es necesario
    });

    // Crear un plano para el fondo
    const planeGeometrynoti = new THREE.PlaneGeometry(0.7, 0.7);
    this.notimg = new THREE.Mesh(planeGeometrynoti, materialnoti); // Usa el geometry y material correctos
    this.notimg.position.set(-5.2, 2, -4);
    this.notimg.rotation.set(-0.5, 0, 0.009);

    // Agregar el fondo al contenedor
    this.scene3D.add(this.notimg);
});

// Cargar la textura para obstaculo1
const textureLoaderObs1 = new THREE.TextureLoader();
textureLoaderObs1.load('assets/Nivel1/basura2d.webp', (texture2) => {
    // Crear un material para el fondo 2
    const clippedMaterial3 = new THREE.MeshBasicMaterial({
        map: texture2,
        transparent: true,
        stencilWrite: true,
        stencilRef: 1,
        stencilFunc: THREE.EqualStencilFunc
    });

	const planeGeometry3 = new THREE.PlaneGeometry(0.3, 0.35);

	// Fondo 1
	this.obstaculo_1 = new THREE.Mesh(planeGeometry3, clippedMaterial3);
	this.obstaculo_1.position.set(8, 2, 2.5);
	//this.obstaculo_1.scale.set(0.7, 0.7, 0.7);
	this.obstaculo_1.rotation.set(-1.305, 0, 0.009);
	this.container2D.add(this.obstaculo_1);
	

   
});

// Cargar la textura para obstaculo2
const textureLoaderObs2 = new THREE.TextureLoader();
textureLoaderObs2.load('assets/Nivel1/drenante2d.webp', (texture2) => {
    // Crear un material para el fondo 2
    const clippedMaterial4 = new THREE.MeshBasicMaterial({
        map: texture2,
        transparent: true,
        stencilWrite: true,
        stencilRef: 1,
        stencilFunc: THREE.EqualStencilFunc
    });

	const planeGeometry4 = new THREE.PlaneGeometry(0.3, 0.35);

	// Fondo 1
	this.obstaculo_2 = new THREE.Mesh(planeGeometry4, clippedMaterial4);
	this.obstaculo_2.position.set(7.5, 2.1, 2.52);
	//this.obstaculo_2.scale.set(0.7, 0.7, 0.7);
	this.obstaculo_2.rotation.set(-1.305, 0, 0.009);
	this.container2D.add(this.obstaculo_2);
	

   
});


   

// Cargar la textura para fondo 2
const textureLoader2 = new THREE.TextureLoader();
textureLoader2.load('assets/Nivel1/fond2.webp', (texture2) => {
    // Crear un material para el fondo 2
    const clippedMaterial2 = new THREE.MeshBasicMaterial({
        map: texture2,
        transparent: true,
        stencilWrite: true,
        stencilRef: 1,
        stencilFunc: THREE.EqualStencilFunc
    });

	const planeGeometry2 = new THREE.PlaneGeometry(12.5, 1.8);

	// Fondo 1
	this.fondo2_1 = new THREE.Mesh(planeGeometry2, clippedMaterial2);
	this.fondo2_1.position.set(8.86, 2, 1.8);
	this.fondo2_1.rotation.set(-1.305, 0, 0.009);
	this.container2D.add(this.fondo2_1);
	
	// Fondo 2 (duplicado)
	this.fondo2_2 = new THREE.Mesh(planeGeometry2, clippedMaterial2);
	this.fondo2_2.position.set(8.86 + 12.5, 2, 1.8);  // Posiciona justo después del fondo 1
	this.fondo2_2.rotation.set(-1.305, 0, 0.009);
	this.container2D.add(this.fondo2_2);
   
});


// Cargar la textura para fondo 2
const textureLoader3 = new THREE.TextureLoader();
textureLoader3.load('assets/Nivel1/plataforma.webp', (texture2) => {
    // Crear un material para el fondo 2
    const clippedMaterial3 = new THREE.MeshBasicMaterial({
        map: texture2,
        transparent: true,
        stencilWrite: true,
        stencilRef: 1,
        stencilFunc: THREE.EqualStencilFunc
    });

	const planeGeometry3 = new THREE.PlaneGeometry(12.5, 0.8);

	// Fondo 1
	this.suelo_1 = new THREE.Mesh(planeGeometry3, clippedMaterial3);
	this.suelo_1.position.set(8.86, 1.75, 2.8);
	this.suelo_1.rotation.set(-1.305, 0, 0.009);
	this.container2D.add(this.suelo_1);
	
    // Renderizar la escena
    this.renderer3D.render(this.scene3D, this.camera3D);
});

	// Cargar el spritesheet como textura
	const loader = new THREE.TextureLoader();
	loader.load('assets/Nivel1/personaje1.png', (texture) => {
		// Definir las dimensiones de cada cuadro en el spritesheet
		const frameWidth = 57;
		const frameHeight = 62;
		const numFramesX = Math.floor(texture.image.width / frameWidth);
		const numFramesY = Math.floor(texture.image.height / frameHeight);

		// Crear un plano para la animación
		const geometry = new THREE.PlaneGeometry(frameWidth, frameHeight);
		const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
		this.jugador = new THREE.Mesh(geometry, material);
		this.jugador.rotation.set(-1.305, 0, 0.009);
		this.jugador.scale.set(0.008, 0.008, 0.008);
		this.jugador.position.set(3.6, 2.1, 2.5);

		// Añadir el plano al contenedor 2D
		this.container2D.add(this.jugador);

		// Propiedades de salto
		this.jugador.isJumping = false;
		this.jugador.velocityZ = 0;
		this.jugador.jumpVelocity = 0.085;
		this.jugador.gravity = 0.005;

		// Animación
		const frameRate = 10; // Frames por segundo
		const totalFrames = 6;
		let currentFrame = 0;
		const updateFrame = () => {
		const frameX = currentFrame % numFramesX;
		const frameY = Math.floor(currentFrame / numFramesX);
		const offsetX = frameX / numFramesX;
		const offsetY = 1 - (frameY + 1) / numFramesY;
		this.jugador.material.map.offset.set(offsetX, offsetY);
		this.jugador.material.map.repeat.set(1 / numFramesX, 1 / numFramesY);

		currentFrame = (currentFrame + 1) % totalFrames;
};

		// Actualizar la animación a intervalos regulares
		setInterval(updateFrame, 1000 / frameRate);



		// Crear la geometría de la máscara
		const maskGeometry = new THREE.PlaneGeometry(4.44, 1);

		// Crear el grupo de máscara de recorte
		const stencilGroup = new THREE.Group();
		const stencilMaterial = new THREE.MeshBasicMaterial({
			color: 0x000000,
			depthWrite: false,
			depthTest: false,
			transparent: true,
			opacity: 0,
			stencilWrite: true,
			stencilRef: 1,
			stencilFunc: THREE.AlwaysStencilFunc,
			stencilZPass: THREE.ReplaceStencilOp
		});

		const stencilMask = new THREE.Mesh(maskGeometry, stencilMaterial);
		stencilMask.position.set(4.72, 2.1, 0);
		stencilMask.rotation.set(-1.305, 0, 0.009);

		stencilGroup.add(stencilMask);
		this.container2D.add(stencilGroup);

		const clipMaterial = material.clone();
		clipMaterial.stencilWrite = true;
		clipMaterial.stencilRef = 1;
		clipMaterial.stencilFunc = THREE.EqualStencilFunc;
		clipMaterial.stencilFail = THREE.KeepStencilOp;
		clipMaterial.stencilZFail = THREE.KeepStencilOp;
		clipMaterial.stencilZPass = THREE.KeepStencilOp;

		this.jugador.material = clipMaterial;
});
// Crear el texto del contador de noticias
const loadertxt = new THREE.FontLoader();
loadertxt.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
	this.font = font; // Guardar la fuente cargada para su uso posterior
	this.textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
	this.contadnoticias();
});


	}
	siguientenoticia2d() {
		const timeToNextNews = Math.random() * 8000 + 7500; // Tiempo aleatorio entre 2 y 10 segundos (2000ms a 10000ms)
		setTimeout(() => {
		  this.crearnoticia();
		  this.siguientenoticia2d(); // Programar la próxima noticia
		}, timeToNextNews);
	  }
	  crearnoticia() {
		// Crear la geometría y el material para la máscara
   const maskGeometry = new THREE.PlaneGeometry(4.44, 3);
   const maskMaterial = new THREE.MeshBasicMaterial({
		   colorWrite: false,
		   color: 0xff0000, // Puedes cambiar el color si es necesario
		   depthWrite: false,
		   stencilWrite: true,
		   stencilRef: 1,
		   stencilFunc: THREE.AlwaysStencilFunc,
		   stencilFail: THREE.ReplaceStencilOp,
		   stencilZFail: THREE.ReplaceStencilOp,
		   stencilZPass: THREE.ReplaceStencilOp
	   });
   this.mask = new THREE.Mesh(maskGeometry, maskMaterial);

	   const loader = new THREE.TextureLoader();
	   loader.load('assets/Nivel1/news.png', (texture) => {
		   const newsGeometry = new THREE.PlaneGeometry(0.25, 0.3);
		   const newsMaterial = new THREE.MeshBasicMaterial({
	   map: texture,
	   transparent: true,
	   stencilWrite: true,
	   stencilRef: 1,
	   stencilFunc: THREE.EqualStencilFunc
   });
		   const noticia = new THREE.Mesh(newsGeometry, newsMaterial);
		   this.mask.position.set(4.72, 2, 1.6);
		   this.mask.rotation.set(-1.305, 0, 0.009);
		   noticia.scale.set(0.7, 1, 0.5);
		   noticia.position.set(12, 2.1, 2.1);
		   noticia.rotation.set(-0.5, 0, 0);
		   
		   //noticia.rotation.set(-1.305, 0, 0.009);
			// Asegurarse de actualizar la matriz del mundo
			noticia.updateMatrixWorld(true);
		   this.container2D.add(this.mask);
		   this.container2D.add(noticia);
		   this.newsItems.push(noticia);
		   
	   });
		 
   
}

cargarobstaculo3d(opcion){
	if(opcion==1){
	
		const sillamtlLoader = new THREE.MTLLoader();
		sillamtlLoader.load('assets/Nivel1/3d/silla/silla.mtl', (materials) => {
			materials.preload();
			const sillaLoader = new THREE.OBJLoader();
			sillaLoader.setMaterials(materials);
			sillaLoader.load('assets/Nivel1/3d/silla/silla.obj', (object) => {
				this.silla= object;
				this.scene3D.add(this.silla);
				this.silla.scale.set(1.2, 1.2, 1.2);
				this.silla.position.set(1, -3, -30);
				// Create bounding box for peligro
				this.sillaBoundingBox = new THREE.Box3().setFromObject(this.silla);
				
				// Scale the bounding box along a specific axis
				let silla_scaleX= 0.2; // Scale factor for the X-axis
				let silla_scaleY = 0.3; // Scale factor for the Y-axis
				let silla_scaleZ = 0.1; // Scale factor for the Z-axis

				let silla_center = this.sillaBoundingBox.getCenter(new THREE.Vector3());
				let silla_size = this.sillaBoundingBox.getSize(new THREE.Vector3());

				// Adjust the min and max points for each axis
				this.sillaBoundingBox.min.x = silla_center.x - (silla_size.x * silla_scaleX/ 2);
				this.sillaBoundingBox.max.x = silla_center.x + (silla_size.x * silla_scaleX/ 2);

				this.sillaBoundingBox.min.y = silla_center.y - (silla_size.y * silla_scaleY / 2);
				this.sillaBoundingBox.max.y = silla_center.y + (silla_size.y * silla_scaleY / 2);

				this.sillaBoundingBox.min.z = silla_center.z - (silla_size.z * silla_scaleZ / 2);
				this.sillaBoundingBox.max.z = silla_center.z + (silla_size.z * silla_scaleZ / 2);
				// Visualizar el bounding box (opcional para debug)
				//this.sillaHelper = new THREE.Box3Helper(this.sillaBoundingBox, 0xff0000);
				//this.scene3D.add(this.sillaHelper);
				
				
				
			});
		});


	}else if(opcion==2){
		
		const peligromtlLoader = new THREE.MTLLoader();
		peligromtlLoader.load('assets/Nivel1/3d/peligro/peligro.mtl', (materials) => {
			materials.preload();
			const peligroLoader = new THREE.OBJLoader();
			peligroLoader.setMaterials(materials);
			peligroLoader.load('assets/Nivel1/3d/peligro/peligro.obj', (object) => {
				this.peligro = object;
				this.scene3D.add(this.peligro);
				this.peligro.scale.set(1, 1, 0.9);
				this.peligro.position.set(7, -2, -25);
				this.peligro.rotation.set(0, 1.58, 0);

				// Create bounding box for peligro
				this.peligroBoundingBox = new THREE.Box3().setFromObject(this.peligro);
				
				// Scale the bounding box along a specific axis
				let Peligro_scaleX= 0.95; // Scale factor for the X-axis
				let Peligro_scaleY = 1.0; // Scale factor for the Y-axis
				let Peligro_scaleZ = 0.001; // Scale factor for the Z-axis

				let Peligro_center = this.peligroBoundingBox.getCenter(new THREE.Vector3());
				let Peligro_size = this.peligroBoundingBox.getSize(new THREE.Vector3());

				// Adjust the min and max points for each axis
				this.peligroBoundingBox.min.x = Peligro_center.x - (Peligro_size.x * Peligro_scaleX/ 2);
				this.peligroBoundingBox.max.x = Peligro_center.x + (Peligro_size.x * Peligro_scaleX/ 2);

				this.peligroBoundingBox.min.y = Peligro_center.y - (Peligro_size.y * Peligro_scaleY / 2);
				this.peligroBoundingBox.max.y = Peligro_center.y + (Peligro_size.y * Peligro_scaleY / 2);

				this.peligroBoundingBox.min.z = Peligro_center.z - (Peligro_size.z * Peligro_scaleZ / 2);
				this.peligroBoundingBox.max.z = Peligro_center.z + (Peligro_size.z * Peligro_scaleZ / 2);
				// Visualizar el bounding box (opcional para debug)
				//this.peligroHelper = new THREE.Box3Helper(this.peligroBoundingBox, 0xff0000);
				//this.scene3D.add(this.peligroHelper);

				
				
				
			});
		});

	}else if(opcion==3){
		
		const basureroLoader2 = new THREE.MTLLoader();
		basureroLoader2.load('assets/Nivel1/3d/basurero/basurero.mtl', (materials) => {
			materials.preload();
			const basureroLoader2 = new THREE.OBJLoader();
			basureroLoader2.setMaterials(materials);
			basureroLoader2.load('assets/Nivel1/3d/basurero/basurero.obj', (object) => {
				this.basurero = object;
				this.scene3D.add(this.basurero);
				this.basurero.scale.set(0.9, 0.9, 0.9);
				this.basurero.rotation.set(0, -1.5, 0);
				this.basurero.position.set(2, -1.8, -25);
				// Create bounding box for peligro
				this.basureroBoundingBox = new THREE.Box3().setFromObject(this.basurero);
				
				// Scale the bounding box along a specific axis
				let basurero_scaleX= 1; // Scale factor for the X-axis
				let basurero_scaleY = 1.0; // Scale factor for the Y-axis
				let basurero_scaleZ = 0.5; // Scale factor for the Z-axis

				let basurero_center = this.basureroBoundingBox.getCenter(new THREE.Vector3());
				let basurero_size = this.basureroBoundingBox.getSize(new THREE.Vector3());

				// Adjust the min and max points for each axis
				this.basureroBoundingBox.min.x = basurero_center.x - (basurero_size.x * basurero_scaleX/ 2);
				this.basureroBoundingBox.max.x = basurero_center.x + (basurero_size.x * basurero_scaleX/ 2);

				this.basureroBoundingBox.min.y = basurero_center.y - (basurero_size.y * basurero_scaleY / 2);
				this.basureroBoundingBox.max.y = basurero_center.y + (basurero_size.y * basurero_scaleY / 2);

				this.basureroBoundingBox.min.z = basurero_center.z - (basurero_size.z * basurero_scaleZ / 2);
				this.basureroBoundingBox.max.z = basurero_center.z + (basurero_size.z * basurero_scaleZ / 2);
				// Visualizar el bounding box (opcional para debug)
				//this.basureroHelper = new THREE.Box3Helper(this.basureroBoundingBox, 0xff0000);
				//this.scene3D.add(this.basureroHelper);
				
				
				
			});
		});

	}

}

checkCollision3d() {
	if(this.obstaculo==1){
		
		if (this.manoBoundingBox && this.sillaBoundingBox) {
		

			if (this.manoBoundingBox.intersectsBox(this.sillaBoundingBox)) {
				//this.gameOver();
				this.physics.pause();
				this.time.addEvent({
					delay: 1000, // 1 second delay before stopping updates
					callback: () => {
						this.pausar();
						this.salirDeLaEscena3D();
	
						window.location.href = window.location.origin + window.location.pathname + '?scene=Perdida&nocache=' + new Date().getTime();
					},
					callbackScope: this
				});
				
				
			}
		}

	}if(this.obstaculo==2){
		if (this.manoBoundingBox && this.peligroBoundingBox) {
		

			if (this.manoBoundingBox.intersectsBox(this.peligroBoundingBox)) {
				//this.gameOver();
				this.physics.pause();
				this.time.addEvent({
					delay: 1000, // 1 second delay before stopping updates
					callback: () => {
						this.pausar();
						this.salirDeLaEscena3D();
	
						window.location.href = window.location.origin + window.location.pathname + '?scene=Perdida&nocache=' + new Date().getTime();
					},
					callbackScope: this
				});
				
				
			} 
		}

	}if(this.obstaculo==3){
		
		if (this.manoBoundingBox && this.basureroBoundingBox) {
		

			if (this.manoBoundingBox.intersectsBox(this.basureroBoundingBox)) {
				//this.gameOver();
				this.physics.pause();
				this.time.addEvent({
					delay: 1000, // 1 second delay before stopping updates
					callback: () => {
						this.pausar();
						this.salirDeLaEscena3D();
						window.location.href = window.location.origin + window.location.pathname + '?scene=Perdida&nocache=' + new Date().getTime();
					},
					callbackScope: this
				});
				
				
			} 
		}

	}
	
}


updatemanoBoundingBox() {
	// Actualizar el bounding box con la posición y escala actuales del objeto
	this.manoBoundingBox.setFromObject(this.mano);
	 // Scale the bounding box along a specific axis
	 let mano_scaleX= 0.65; // Scale factor for the X-axis
	 let mano_scaleY = 0.4; // Scale factor for the Y-axis
	 let mano_scaleZ = 0.2; // Scale factor for the Z-axis

	 this.mano_center = this.manoBoundingBox.getCenter(new THREE.Vector3());
	 this.mano_size = this.manoBoundingBox.getSize(new THREE.Vector3());

	 // Adjust the min and max points for each axis
	 this.manoBoundingBox.min.x = this.mano_center.x - (this.mano_size.x * mano_scaleX/ 2);
	 this.manoBoundingBox.max.x = this.mano_center.x + (this.mano_size.x * mano_scaleX/ 2);

	 this.manoBoundingBox.min.y = this.mano_center.y - (this.mano_size.y * mano_scaleY / 2);
	 this.manoBoundingBox.max.y = this.mano_center.y + (this.mano_size.y * mano_scaleY / 2);

	 this.manoBoundingBox.min.z = this.mano_center.z - (this.mano_size.z * mano_scaleZ / 2);
	 this.manoBoundingBox.max.z = this.mano_center.z + (this.mano_size.z * mano_scaleZ / 2);

	  // Remover el helper antiguo
	  this.scene3D.remove(this.manoHelper);

	  // Crear un nuevo helper con el bounding box actualizado
	  this.manoHelper = new THREE.Box3Helper(this.manoBoundingBox, 0xff0000);
  
	  // Agregar el nuevo helper a la escena
	  this.scene3D.add(this.manoHelper);
}

actualizarobstaculo(){
	
	if(this.obstaculo==1){
		if(this.silla){
			this.silla.position.z += 0.1;
			this.sillaBoundingBox = new THREE.Box3().setFromObject(this.silla);
				
				// Scale the bounding box along a specific axis
				let silla_scaleX= 0.2; // Scale factor for the X-axis
				let silla_scaleY = 0.3; // Scale factor for the Y-axis
				let silla_scaleZ = 0.1; // Scale factor for the Z-axis

				let silla_center = this.sillaBoundingBox.getCenter(new THREE.Vector3());
				let silla_size = this.sillaBoundingBox.getSize(new THREE.Vector3());

				// Adjust the min and max points for each axis
				this.sillaBoundingBox.min.x = silla_center.x - (silla_size.x * silla_scaleX/ 2);
				this.sillaBoundingBox.max.x = silla_center.x + (silla_size.x * silla_scaleX/ 2);

				this.sillaBoundingBox.min.y = silla_center.y - (silla_size.y * silla_scaleY / 2);
				this.sillaBoundingBox.max.y = silla_center.y + (silla_size.y * silla_scaleY / 2);

				this.sillaBoundingBox.min.z = silla_center.z - (silla_size.z * silla_scaleZ / 2);
				this.sillaBoundingBox.max.z = silla_center.z + (silla_size.z * silla_scaleZ / 2);
				 // Remover el helper antiguo
				//this.scene3D.remove(this.sillaHelper);
				// Visualizar el bounding box (opcional para debug)
				//this.sillaHelper = new THREE.Box3Helper(this.sillaBoundingBox, 0xff0000);
				//this.scene3D.add(this.sillaHelper);

			

	  // Crear un nuevo helper con el bounding box actualizado
	 
		if (this.silla.position.z > 10) {
			this.scene3D.remove(this.silla);
			this.scene3D.remove(this.sillaHelper);
			this.obstaculo = Phaser.Math.RND.pick([1, 2, 3]);
			
			this.cargarobstaculo3d(this.obstaculo);


			
		}

		}
		


	}else if(this.obstaculo==2){
		if(this.peligro){
			this.peligro.position.z += 0.1;
			// Create bounding box for peligro
			this.peligroBoundingBox = new THREE.Box3().setFromObject(this.peligro);
				
			// Scale the bounding box along a specific axis
			let Peligro_scaleX= 0.95; // Scale factor for the X-axis
			let Peligro_scaleY = 1.0; // Scale factor for the Y-axis
			let Peligro_scaleZ = 0.001; // Scale factor for the Z-axis

			let Peligro_center = this.peligroBoundingBox.getCenter(new THREE.Vector3());
			let Peligro_size = this.peligroBoundingBox.getSize(new THREE.Vector3());

			// Adjust the min and max points for each axis
			this.peligroBoundingBox.min.x = Peligro_center.x - (Peligro_size.x * Peligro_scaleX/ 2);
			this.peligroBoundingBox.max.x = Peligro_center.x + (Peligro_size.x * Peligro_scaleX/ 2);

			this.peligroBoundingBox.min.y = Peligro_center.y - (Peligro_size.y * Peligro_scaleY / 2);
			this.peligroBoundingBox.max.y = Peligro_center.y + (Peligro_size.y * Peligro_scaleY / 2);

			this.peligroBoundingBox.min.z = Peligro_center.z - (Peligro_size.z * Peligro_scaleZ / 2);
			this.peligroBoundingBox.max.z = Peligro_center.z + (Peligro_size.z * Peligro_scaleZ / 2);
			//this.scene3D.remove(this.peligroHelper);
			// Visualizar el bounding box (opcional para debug)
			//this.peligroHelper = new THREE.Box3Helper(this.peligroBoundingBox, 0xff0000);
			//this.scene3D.add(this.peligroHelper);

		if (this.peligro.position.z > 10) {
			this.scene3D.remove(this.peligro);
			this.scene3D.remove(this.peligroHelper);
			this.obstaculo = Phaser.Math.RND.pick([1, 2, 3]);
			
			this.cargarobstaculo3d(this.obstaculo);

			
		}

		}
		

	}else if(this.obstaculo==3){
		if(this.basurero && this.boundie){
			this.basurero.position.z += 0.1;
			// Create bounding box for peligro
			this.basureroBoundingBox = new THREE.Box3().setFromObject(this.basurero);
				
			// Scale the bounding box along a specific axis
			let basurero_scaleX= 1; // Scale factor for the X-axis
			let basurero_scaleY = 1.0; // Scale factor for the Y-axis
			let basurero_scaleZ = 0.5; // Scale factor for the Z-axis

			let basurero_center = this.basureroBoundingBox.getCenter(new THREE.Vector3());
			let basurero_size = this.basureroBoundingBox.getSize(new THREE.Vector3());

			// Adjust the min and max points for each axis
			this.basureroBoundingBox.min.x = basurero_center.x - (basurero_size.x * basurero_scaleX/ 2);
			this.basureroBoundingBox.max.x = basurero_center.x + (basurero_size.x * basurero_scaleX/ 2);

			this.basureroBoundingBox.min.y = basurero_center.y - (basurero_size.y * basurero_scaleY / 2);
			this.basureroBoundingBox.max.y = basurero_center.y + (basurero_size.y * basurero_scaleY / 2);

			this.basureroBoundingBox.min.z = basurero_center.z - (basurero_size.z * basurero_scaleZ / 2);
			this.basureroBoundingBox.max.z = basurero_center.z + (basurero_size.z * basurero_scaleZ / 2);
			// Visualizar el bounding box (opcional para debug)
			this.scene3D.remove(this.basureroHelper);
			//this.basureroHelper = new THREE.Box3Helper(this.basureroBoundingBox, 0xff0000);
			//this.scene3D.add(this.basureroHelper);

		if (this.basurero.position.z > 10) {
			this.scene3D.remove(this.basurero);
			this.scene3D.remove(this.basureroHelper);
			this.obstaculo = Phaser.Math.RND.pick([1, 2, 3]);
			
			this.cargarobstaculo3d(this.obstaculo);

			
		}

		}
		


	}
	
}


contadnoticias() {
	const textGeometry = new THREE.TextGeometry(`X ${this.game.global.conteoglobal}`, {
		font: this.font,
		size: 0.4,
		height: 0.1,
		curveSegments: 12,
		bevelEnabled: false
	});
	if (this.textMesh) {
		this.scene3D.remove(this.textMesh); // Eliminar el texto anterior
	}
	this.textMesh = new THREE.Mesh(textGeometry, this.textMaterial);
	this.textMesh.position.set(-7.3, 1, -6); // Ajusta la posición
	this.textMesh.rotation.set(-0.5, 0.1, 0.001);
	this.scene3D.add(this.textMesh);
}
	
	updateThreeJS(time, delta) {
		if (this.ispause) {
			return; // Don't update Three.js objects if game is over
		}
		// Lógica para actualizar la escena 3D en cada frame
		this.renderer3D.render(this.scene3D, this.camera3D);

//****************************movimiento de escenario */

		if (this.ambiente) {
			// Mover el modelo hacia la cámara
			const speedambiente = 0.005 * delta; // ajusta la velocidad basada en delta
			this.ambiente.position.z += speedambiente;
			

			// Si el modelo se mueve más allá de la cámara, reiniciar su posición
			if (this.ambiente.position.z > this.camera3D.position.z + 7.5) {
				this.ambiente.position.z = 0.2; // Ajusta la distancia según tu necesidad
			}
		}

/***************************Oscilacion de mano *************************/

			const speedosci = 0.005; // Velocidad de la animación
			const amplitudeosci = 0.05; // Amplitud de la animación

			// Animación de la mano
			if (this.mano && this.container2D) {
				this.mano.position.y = 1 + Math.sin(time * speedosci) * amplitudeosci;
				this.container2D.position.y = 1 + Math.sin(time * speedosci) * amplitudeosci-1.5;	
			
				if (this.cursors.left.isDown) {
					this.mano.position.x -= 0.1;
					this.container2D.position.x -= 0.1;
				
				} else if (this.cursors.right.isDown) {
					this.mano.position.x += 0.1;
					this.container2D.position.x += 0.1;}


					const speedHorizontal = 0.1; // Velocidad de movimiento

					// Movimiento hacia la izquierda
					if (this.cursors.left.isDown) {
						this.mano.position.x -= speedHorizontal;
						this.container2D.position.x -= speedHorizontal;
					}
					
					// Movimiento hacia la derecha
					else if (this.cursors.right.isDown) {
						this.mano.position.x += speedHorizontal;
						this.container2D.position.x += speedHorizontal;
					}

					// Limitar el movimiento de la mano
					this.mano.position.x = Phaser.Math.Clamp(this.mano.position.x, 2.5, 8);
					this.container2D.position.x = Phaser.Math.Clamp(this.container2D.position.x, -2.44, 2.95);

			
			}

			if (this.ambiente) {
				// Mover el modelo hacia la cámara
				const speedambiente = 0.006 * delta; // ajusta la velocidad basada en delta
				this.ambiente.position.z += speedambiente;
				
	
				// Si el modelo se mueve más allá de la cámara, reiniciar su posición
				if (this.ambiente.position.z > this.camera3D.position.z + 7.5) {
					this.ambiente.position.z = 0.2; // Ajusta la distancia según tu necesidad
				}
			}
			const speedfondo = 0.05; 
/***************************movimiento fondo *************************/			

			if (this.fondo2_1 && this.fondo2_2) {
				// ajusta la velocidad basada en delta
			
				// Mover el fondo 1
				this.fondo2_1.position.x -= speedfondo;
			
				// Mover el fondo 2
				this.fondo2_2.position.x -= speedfondo;
			
				// Si el fondo 1 se mueve más allá de la cámara, reiniciar su posición
				if (this.fondo2_1.position.x <= -4) {
					this.fondo2_1.position.x = this.fondo2_2.position.x + 12.5;  // Reposicionar detrás del fondo 2
				}
			
				// Si el fondo 2 se mueve más allá de la cámara, reiniciar su posición
				if (this.fondo2_2.position.x <= -4) {
					this.fondo2_2.position.x = this.fondo2_1.position.x + 12.5;  // Reposicionar detrás del fondo 1
				}
			}
/***************************movimiento suelo *************************/			

if (this.suelo_1) {
	// ajusta la velocidad basada en delta

	// Mover el suelo
	this.suelo_1.position.x -= speedfondo;

	if (this.suelo_1.position.x <= 4) {
		this.suelo_1.position.x =8.5;  
	}

	
}
/***************************manejo obstculos *************************/


if (this.obstaculo_1 && this.obstaculo_2) {
	if(this.primerobst){
		this.obstaculo_1.position.x -= speedfondo;
	} 
	if (this.obstaculo_1.position.x < 2 || this.obstaculo_2.position.x < 2) {
		this.primerobst = false;
		this.obstopc = Phaser.Math.Between(0, 1);
	
		this.obstaculo_1.position.x = 8;
		this.obstaculo_2.position.x = 7.5;
	}

	if( this.obstopc==0 &&  this.primerobst==false){
		this.obstaculo_1.position.x -= speedfondo;
	}
	if( this.obstopc==1 &&  this.primerobst==false){
		this.obstaculo_2.position.x -= speedfondo;
	}
/***************************control de sprites *************************/

// Controlar el sprite con las teclas de flecha para saltar

if(this.jugador){
	if (this.cursors.up.isDown && !this.jugador.isJumping ) {
		console.log("arriba");
		this.jugador.velocityZ = -this.jugador.jumpVelocity;
		this.jugador.isJumping = true;
	}
	this.jugador.velocityZ += this.jugador.gravity;
	
	// Actualizar la posición en el eje Z
	this.jugador.position.z += this.jugador.velocityZ;
	
	
	
		if (this.jugador.position.z >= 2.45) {
			 // Colisión detectada, ajustar la posición y velocidad
			this.jugador.position.z = 2.45;
			this.jugador.velocityZ = 0;
			this.jugador.isJumping = false;
		}



}

/***************************colision 2d *************************/
	
   if (this.checkCollision(this.jugador, this.obstaculo_1)||this.checkCollision(this.jugador, this.obstaculo_2)) {
	
	this.pausar();
        
	this.salirDeLaEscena3D();
	
	window.location.href = window.location.origin + window.location.pathname + '?scene=Perdida&nocache=' + new Date().getTime();
	
  }	
	
	
  for (let i = this.newsItems.length - 1; i >= 0; i--) {
	const noti = this.newsItems[i];
	if (noti.position.x < -1) {
		
				this.container2D.remove(noti); // Eliminar de la escena
				this.newsItems.splice(i, 1); // Eliminar del array
			}
	if (this.checkCollision(this.jugador, noti)) {
		
	
		
	
		this.game.global.conteoglobal+=1;
		this.container2D.remove(noti);
		
		
	}}
			 // Mover las noticias hacia la izquierda
			 for (const noticia of this.newsItems) {
				noticia.position.x -= speedfondo; // Ajusta la velocidad según sea necesario
			  }

			  	// Actualizar el texto de la puntuación
		if (this.font && this.textMaterial && this.contadoractivo) {
			this.contadnoticias();
		}
		

		if(this.game.global.conteoglobal>0){

			this.input.keyboard.on('keydown-A', this.changeLevel, this);
			// Crear el texto del contador de noticias
			const loadertxt2 = new THREE.FontLoader();
loadertxt2.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    // Una vez que la fuente se ha cargado, puedes crear la geometría del texto
    this.font = font; // Guardar la fuente cargada para su uso posterior
    this.textMaterial2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    // Crear la geometría del texto dentro del callback
    const textGeometry2 = new THREE.TextGeometry("Presiona la A para analizar las noticias", {
        font: this.font,  // Usar la fuente que ya está cargada
        size: 0.3,
        height: 0.1,
        curveSegments: 12,
        bevelEnabled: false
    });

    // Crear el Mesh para el texto y añadirlo a la escena
    this.textMesh2 = new THREE.Mesh(textGeometry2, this.textMaterial2);
    this.textMesh2.position.set(1, 1, -2); // Ajusta la posición
    this.textMesh2.rotation.set(-0.5, 0.1, 0.00);
    this.scene3D.add(this.textMesh2);
});



		}

		

				  this.actualizarobstaculo();
				  this.updatemanoBoundingBox.call(this);
				  this.checkCollision3d();




}



	}

	changeLevel() {
	
		this.pausar();
		this.salirDeLaEscena3D();
		
		
	  window.location.href = window.location.origin + window.location.pathname + '?scene=InstructivoNivel2&nocache=' + new Date().getTime() + '&conteoglobal=' + this.game.global.conteoglobal;
    }

	update(time, delta) {
		// Actualizaciones de lógica del juego pueden ir aquí
		this.updateThreeJS(time, delta);
	
		
	
		
		


	}


	checkCollision(obj1, obj2) {
		if(obj1&&obj2){
	     // Actualizar las matrices del mundo de ambos objetos
		 obj1.updateMatrixWorld();
		 obj2.updateMatrixWorld();
	 
		 // Obtener la caja delimitadora original del jugador (obj1)
		 const obj1Box = new THREE.Box3().setFromObject(obj1);
		 
		 // Reducir solo en el eje X
		 const shrinkFactorX = 0.1; // Reducir el ancho en un 50%
		 // Reducir solo en el eje X
		 const shrinkFactorZ = 0.8; // Reducir el ancho en un 50%
		 const obj1Center = obj1Box.getCenter(new THREE.Vector3());
		 const obj1Size = obj1Box.getSize(new THREE.Vector3());
	 
		 // Reducir la dimensión en el eje X manteniendo las dimensiones Y y Z iguales
		 obj1Size.x *= shrinkFactorX;
		   // Reducir la dimensión en el eje X manteniendo las dimensiones Y y Z iguales
		 obj1Size.z *= shrinkFactorZ;
	 
		 // Redefinir la caja de colisión con el nuevo tamaño en X
		 obj1Box.setFromCenterAndSize(obj1Center, obj1Size);
	 
		 // Crear la caja delimitadora para el objeto 2 (noticia)
		 const obj2Box = new THREE.Box3().setFromObject(obj2);
	 
		 // Verificar si las cajas delimitadoras se intersectan

		 return obj1Box.intersectsBox(obj2Box);



		}else{

			return false;
		}
	
    
     }


	 clearScene() {	

		// Eliminar todos los objetos de la escena
		while (this.scene3D.children.length > 0) {
			const child = this.scene3D.children[0];
			this.scene3D.remove(child);
			if (child.geometry) child.geometry.dispose(); // Libera la geometría
			if (child.material) {
				if (Array.isArray(child.material)) {
					child.material.forEach(material => material.dispose()); // Libera materiales
				} else {
					child.material.dispose(); // Libera material
				}
			}
		}
	
		// Limpiar texturas
		if (this.renderer3D) {
			this.renderer3D.dispose(); // Libera el renderizador
		}
	}
	
   changeScene() {
    this.clearScene(); // Limpia la escena anterior
    this.setupThreeJS()
   // Cargar los elementos 3D y luego los elementos 2D
		this.cargarElementos3D().then(() => {
			this.cargarElementos2D();
		}).catch(error => {
			console.error("Error al cargar elementos 3D:", error);
		});

}


salirDeLaEscena3D() {
	// Eliminar todos los objetos de la escena
	this.boundie=false;
	this.contadoractivo=false;
	 
   this.scene3D.remove(this.container2D);

	while (this.scene3D.children.length > 0) {
	   const object = this.scene3D.children[0];
	   this.scene3D.remove(object);
   }

   // Detener el renderizador
   if (this.renderer3D) {
	   this.renderer3D.dispose();
   }

   // Limpiar el canvas de Three.js
   const canvas = this.renderer3D.domElement;
   if (canvas && canvas.parentNode) {
	   canvas.parentNode.removeChild(canvas);
   }

   // Limpiar variables de referencia a la escena y el renderizador
   this.scene3D = null;
   this.renderer3D = null;
   this.camera3D = null;
	   // Limpieza de elementos y eventos
	   if (this.container2D) {
		   const cantidadElementos = this.container2D.children.size
		  
		   this.container2D.clear(true, true);
		  
			// Elimina sprites del grupo y libera memoria
	   }
		   // Limpiar caché de texturas si es necesario
		   THREE.Cache.clear();  // Limpia la caché de Three.js
	   this.scene.stop('Nivel1');
	   this.physics.world.enable = false;
	   this.children.removeAll(true); 
	   
	  
}
   

	

	onWindowResize() {
		// Actualizar el tamaño de la ventana
		const width = window.innerWidth;
		const height = window.innerHeight;
	
		this.renderer3D.setSize(width, height);
		this.camera3D.aspect = width / height;
		this.camera3D.updateProjectionMatrix();
	}
}