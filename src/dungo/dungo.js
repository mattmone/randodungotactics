import { Crew } from "../services/Crew.js";
import { get } from "idb-keyval";

const openingScreen = document.querySelector("opening-screen");
const characterContent = document.querySelector("character-content");
const gameScreen = document.querySelector("game-screen");
const enterDungeonButton = document.querySelector("#enter-dungeon");

openingScreen.addEventListener("continue", async () => {
  await setCharacterContent();
  switchView(characterContent);
});

openingScreen.addEventListener("new", async () => {
  await playerCrew.remove(playerCrew.leader);
  playerCrew.add();
  await setCharacterContent();
  switchView(characterContent);
});

enterDungeonButton.addEventListener("click", async () => {
  const mapId = await get("current-map");
  if (mapId) gameScreen.setAttribute("mapId", mapId);
  await import("./game-screen.js");
  gameScreen.playerCrew = playerCrew;
  switchView(gameScreen);
});

const playerCrew = new Crew();

function switchView(view) {
  [openingScreen, characterContent, gameScreen].forEach((screen) => {
    screen.toggleAttribute("hidden", view !== screen);
  });
}

async function setCharacterContent() {
  await playerCrew.leader.initialized;
  playerCrew.leader.avatar.renderAvatar();
  await playerCrew.leader.avatar.initialized;
  characterContent.character = playerCrew.leader;
}
