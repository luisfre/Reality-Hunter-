window.addEventListener('load', function () {

    // Función para obtener parámetros de la URL
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Obtiene el parámetro de escena de la URL
    const initialScene = getUrlParameter('scene') || 'Level'; // Cambia 'Boot' por tu escena por defecto si es necesario

    var game = new Phaser.Game({
        width: 1920,
        height: 1080,
        type: Phaser.AUTO,
        globalVolume: 0.5,
        conteoglobal: 0,
        experienc: 0,
        noticias: [],
        controleffects: true,
        backgroundColor: "#242424",
        parent: 'game-container', // Especifica el contenedor del juego
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        physics: {
            default: "arcade",
            arcade: {
                debug: false,
            }
        }
    });

    // Añadir un objeto global al juego
    game.global = {
        globalVolume: 0.5,
        conteoglobal: 0,
        experienc: 0,
        noticias: [],
        controleffects: true
    };

    // Añadir las escenas al juego
    game.scene.add("Boot", Boot);
    game.scene.add("Preload", Preload);
    game.scene.add("Level", Level);
    game.scene.add("MenupPrincial", MenupPrincial);
    game.scene.add("Creditos", Creditos);
    game.scene.add("Sonido", Sonido);
    game.scene.add("Nivel1", Nivel1);
    game.scene.add("Perdida", Perdida);
    game.scene.add("Nivel2", Nivel2);
    game.scene.add("Nivel3", Nivel3);
    game.scene.add("InstructivoNivel1", InstructivoNivel1);
    game.scene.add("InstructivoNivel2", InstructivoNivel2);
    game.scene.add("InstructivoNivel3", InstructivoNivel3);
    
    // Iniciar la escena inicial basada en el parámetro de la URL
    game.scene.start(initialScene);
});

// Clase Boot
class Boot extends Phaser.Scene {
    preload() {
        // Cargar los recursos necesarios
        this.load.pack("pack", "assets/preload-asset-pack.json");
        this.load.audio('backgroundMusic', 'assets/backgroundmusic.mp3');
    }

    create() {
        // Cuando todos los recursos estén cargados, iniciar la siguiente escena
        this.scene.start("Preload");

        // Reproducir la música en loop si no se está reproduciendo ya
        if (!this.sound.get('backgroundMusic')) {
            let music = this.sound.add('backgroundMusic', {
                loop: true,
                volume: 0.5 // Ajusta el volumen si es necesario
            });
            music.play();
        }
    }
}