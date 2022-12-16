
// IMPORTS

import { List } from "../modules/methods";

// CODE

class Blips {
    public static list = new List('Blips');

    public static getInListByID(id:number):Blip {
        return this.list.getByID(id);
    }
}

export class Blip {
    private _handle:BlipMp;
    private _id:number;

    constructor(sprite:number, name:string, position:Vector3, options?:TBoston.API.Blips.createOptions) {
        this._handle = mp.blips.new(sprite, position);

        this._id = Blips.list.generateID();

        this.setName(name);
        this.setScale(options?.scale);
        this.setAlpha(options?.alpha);
        this.setColor(options?.color);
        this.setDimension(options?.dimension);
        this.setRotation(options?.rotation);
        this.setShortRange(options?.shortRange);
        this.setDrawDistance(options?.drawDistance);
    }

    // SETTERS

    public setSprite(number:number = 1) {
        this._handle.sprite = number;
    }

    public setName(text:string) {
        this._handle.name = text;
    }

    public setScale(number:number = 1) {
        this._handle.scale = number;
    }

    public setColor(number:number = 4) {
        this._handle.color = number;
    }

    public setAlpha(number:number = 255) {
        this._handle.alpha = number;
    }

    public setDrawDistance(number:number = 50) {
        this._handle.drawDistance = number;
    }

    public setShortRange(status:boolean = true) {
        this._handle.shortRange = status;
    }

    public setRotation(number:number = 0) {
        this._handle.rotation = number;
    }

    public setDimension(number:number = 0) {
        this._handle.dimension = number;
    }

    // GETTERS

    get id() {
        return this._id;
    }

    public getSprite() {
        return this._handle.sprite;
    }

    public getName() {
        return this._handle.name;
    }

    public getScale() {
        return this._handle.scale;
    }

    public getColor() {
        return this._handle.color;
    }

    public getAlpha() {
        return this._handle.alpha;
    }

    public getDrawDistance() {
        return this._handle.drawDistance;
    }

    public getShortRange() {
        return this._handle.shortRange;
    }

    public getRotation() {
        this._handle.rotation;
    }

    public getDimension() {
        return this._handle.dimension;
    }

    // OTHERS
}

export default Blips;