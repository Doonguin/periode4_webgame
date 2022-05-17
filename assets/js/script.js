import loadModel from "p5.min.js";

function onloadStart() {
    // Define the canvas element
    const gameWindow = document.getElementById('canvas');
    const context = gameWindow.getContext('webgl');
    const platform = loadModel('../objects/platform.obj');

    // Check if webcontext can be initialized
    if (context === null) {
        alert('Can not initialize webgl :(');
        return;
    }
    
    // Set canvas width and height
    gameWindow.width = 1280;
    gameWindow.height = 720;

    // Set colors
    context.clearColor(1.0, 1.0, 1.0, 1.0);
    context.clear(context.COLOR_BUFFER_BIT);

    // Draw 3d model
    model(platform);
};

window.onload = onloadStart();