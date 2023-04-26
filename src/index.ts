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
    const player = new Player(blockSize, "red", 5);
    player.colisionMap = renderMap.map.colision;

    function gameLoop() {
      drawner.clear();
      renderMap.render();
      player.render();
      //renderMap.renderColision();
    }

    function keyEvents(e: KeyboardEvent): void {
      switch (e.keyCode) {
        case 38: // up arrow
          /**if (!renderMap.colisionCheck(player.x, player.y - (blockSize - player.speed)))*/ player.toTop();
          break;
        case 40: // down arrow
          /**if (!renderMap.colisionCheck(player.x, player.y + (blockSize - player.speed)))*/ player.toDown();
          break;
        case 37: // left arrow
          /**if (!renderMap.colisionCheck(player.x - (blockSize - player.speed), player.y))*/ player.toLeft();
          break;
        case 39: // right arrow
          /**if (!renderMap.colisionCheck(player.x + (blockSize - player.speed), player.y))*/ player.toRight();
          break;
      }
    }

    document.onkeydown = keyEvents;
    setInterval(gameLoop, 1000 / fps);
  }
}

MeuProjeto.Main();
