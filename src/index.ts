import { RenderMap } from "./RenderMap";
import Player from "./Entities/Player";
import map1 from "./maps/map1";
import mapAssets from "./Assets";
import { drawner } from "./Drawner";

class MeuProjeto {
  public static Main(): void {
    const fps = 60;
    const blockSize = 30;

    const renderMap = new RenderMap(blockSize, map1, mapAssets);
    const player = new Player(blockSize, "blue", 3);
    player.colisionMap = renderMap.map.colision;
    player.eventMap = renderMap.map.event;

    function gameLoop() {
      drawner.clear();
      renderMap.render();
      player.moveProgress();
      player.render();
      //renderMap.renderColision();
      //requestAnimationFrame(gameLoop);
    }

    document.onkeydown = (e: KeyboardEvent): void => {
      switch (e.keyCode) {
        case 38: // up arrow
          player.toTop();
          break;
        case 40: // down arrow
          player.toDown();
          break;
        case 37: // left arrow
          player.toLeft();
          break;
        case 39: // right arrow
          player.toRight();
          break;
        case 32: // interative
          player.interative();
          break;
      }
    };

    document.onkeyup = (e: KeyboardEvent): void => {
      switch (e.keyCode) {
        case 38: // up arrow
          player.resetSpeedYT();
          break;
        case 40: // down arrow
          player.resetSpeedYD();
          break;
        case 37: // left arrow
          player.resetSpeedXL();
          break;
        case 39: // right arrow
          player.resetSpeedXR();
          break;
      }
    };

    //gameLoop();
    setInterval(gameLoop, 1000 / fps);
  }
}

MeuProjeto.Main();
