
// IMPORTS

// CODE

function playerConnect(player:PlayerMp) {
    player.setClothes(2, 57, 0, 0);
    player.setClothes(4, 1, 0, 0);
    player.setClothes(6, 1, 0, 0);
    player.setClothes(8, 15, 0, 0);
    player.setClothes(11, 22, 0, 0);
}

mp.events.add('playerJoin', playerConnect);