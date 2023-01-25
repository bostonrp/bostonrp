import Items from "./index";

export default class Item {
    private _id?:number;
    private _name:string = '';
    private _type:number = 0;
    private _subtype?:number;
    private _description?:string;
    private _image?:string;
    private _maxStack?:number;
    private _weight?:number;
    private _interaction?:string;
    private _durability?:number;

    constructor(type:number, name:string, options?:TBoston.Systems.Inventory.Items.createOptions) {
        this._id = options?.id;

        this.setName(name);
        this.setType(type);
        this.setSubType(options?.subtype);;
        this.setDescription(options?.description);
        this.setMaxStack(options?.maxStack);
        this.setWeight(options?.weight);
        this.setInteraction(options?.interaction);
        this.setDurability(options?.durability);

        Items.list.add(this);
    }

    //? SETTERS

    public setDurability(number?:number) {
        this._durability = number;
    }

    public setInteraction(functionName?:string) {
        this._interaction = functionName;
    }

    public setWeight(number?:number) {
        this._weight = number;
    }

    public setMaxStack(number?:number) {
        this._maxStack = number;
    }

    public setDescription(text?:string) {
        this._description = text;
    }
    
    public setImage(name?:string) {
        this._image = name;
    }

    public setName(text:string) {
        this._name = text;
    }

    public setType(number:number) {
        this._type = number;
    }

    public setSubType(number?:number) {
        this._subtype = number;
    }

    //? GETTERS

    get id() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    getType() {
        return this._type;
    }

    getSubType() {
        return this._subtype;
    }

    getDescription() {
        return this._description;
    }

    getImageURL() {
        return this._image;
    }

    getMaxStack() {
        return this._maxStack;
    }

    getWeight() {
        return this._weight;
    }

    getInteraction() {
        return this._interaction;
    }

    getDurability() {
        return this._durability;
    }
}