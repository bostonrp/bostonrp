
// IMPORTS

import Camera from "api/Camera";

// CODE

let isFLY = false;
let FLYCamera:Camera|null;
let shiftModifier = false;
let controlModifier = false;

let localPlayer = mp.players.local;

class Fly {
    static bindVirtualKeys = {
        F5: 0x74,

        Q: 69,
        E: 81,
        LCTRL: 17,
        SHIFT: 16
    }

    static getNormalizedVector(vector:Vector3) {
        let mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);

        vector.x = vector.x / mag;
        vector.y = vector.y / mag;
        vector.z = vector.z / mag;
        return vector;
    }

    static getCrossProduct(v1:Vector3, v2:Vector3) {
        let vector = new mp.Vector3(0, 0, 0);

        vector.x = v1.y * v2.z - v1.z * v2.y;
        vector.y = v1.z * v2.x - v1.x * v2.z;
        vector.z = v1.x * v2.y - v1.y * v2.x;
        return vector;
    }

    static startFLY() {
        mp.game.graphics.notify('Вы ~g~включили ~s~FLY');

        let camPos = new mp.Vector3(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z);
        
        let camRot = mp.game.cam.getGameplayCamRot(2);

        FLYCamera = new Camera('default', camPos, camRot, 60);
        FLYCamera.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 0, true, false, 0);

        localPlayer.freezePosition(true);
        localPlayer.setInvincible(true);
        localPlayer.setVisible(false, false);
        localPlayer.setCollision(false, false);
    }

    static stopFLY() {
        mp.game.graphics.notify('Вы ~r~выключили ~s~FLY');

        if(FLYCamera) {
            localPlayer.position = FLYCamera.handle.getCoord();
            localPlayer.setHeading(FLYCamera.handle.getRot(2).z);

            FLYCamera.handle.destroy(true);
            FLYCamera = null;
        }

        mp.game.cam.renderScriptCams(false, false, 0, true, false, 0);
        localPlayer.freezePosition(false);
        localPlayer.setInvincible(false);
        localPlayer.setVisible(true, false);
        localPlayer.setCollision(true, false);
    }
}

mp.keys.bind(Fly.bindVirtualKeys.F5, true, () => {
    isFLY = !isFLY;
    mp.game.ui.displayRadar(!isFLY);

    if(isFLY) {
        Fly.startFLY();
    } else {
        Fly.stopFLY();
    }
});

mp.events.add('render', () => {
    if(!FLYCamera || mp.gui.cursor.visible) {
        return;
    }

    controlModifier = mp.keys.isDown(Fly.bindVirtualKeys.LCTRL);
    shiftModifier = mp.keys.isDown(Fly.bindVirtualKeys.SHIFT);

    let rot = FLYCamera.handle.getRot(2);
    let fastMult = 1;
    let slowMult = 1;

    if(shiftModifier) {
        fastMult = 5;
    } else if(controlModifier) {
        slowMult = 0.3;
    }

    let rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220);
    let rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221);
    let leftAxisX = mp.game.controls.getDisabledControlNormal(0, 218);
    let leftAxisY = mp.game.controls.getDisabledControlNormal(0, 219);
    let pos = FLYCamera.handle.getCoord();
    let rr = FLYCamera.handle.getDirection();

    let vector = new mp.Vector3(0, 0, 0);
    vector.x = rr.x * leftAxisY * fastMult * slowMult;
    vector.y = rr.y * leftAxisY * fastMult * slowMult;
    vector.z = rr.z * leftAxisY * fastMult * slowMult;

    let upVector = new mp.Vector3(0, 0, 1);
    let rightVector = Fly.getCrossProduct(Fly.getNormalizedVector(rr), Fly.getNormalizedVector(upVector));

    rightVector.x *= leftAxisX * 0.5;
    rightVector.y *= leftAxisX * 0.5;
    rightVector.z *= leftAxisX * 0.5;

    let upMovement = 0.0;
    if(mp.keys.isDown(Fly.bindVirtualKeys.Q)) {
        upMovement = 0.5;
    }

    let downMovement = 0.0;
    if(mp.keys.isDown(Fly.bindVirtualKeys.E)) {
        downMovement = 0.5;
    }

    mp.players.local.position = new mp.Vector3(pos.x + vector.x + 1, pos.y + vector.y + 1, pos.z + vector.z + 1);
    
    mp.players.local.heading = rr.z;
    FLYCamera.handle.setCoord(pos.x - vector.x + rightVector.x, pos.y - vector.y + rightVector.y, pos.z - vector.z + rightVector.z + upMovement - downMovement);
    
    FLYCamera.handle.setRot(rot.x + rightAxisY * -5.0, 0.0, rot.z + rightAxisX * -5.0, 2);
});