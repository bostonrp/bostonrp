
// IMPORTS

import terminal from "../modules/terminal";
import DBWhiteList from '@database/whitelist';

// CODE

class WhiteList {
    private static _list = new Map();

    public static get(socialClubName:string) {
        return this._list.get(socialClubName);
    }

    public static add(socialClubName:string, status:boolean = true) {
        this._list.set(socialClubName, status);
    }

    public static getAll() {
        let _keys = this._list.keys();
        let _items = new Array();

        this._list.forEach((value:boolean) => {
            _items.push({ socialClub: _keys.next().value, status: value });
        });

        return _items;
    }

    public static setStatus(socialClubName:string, status:boolean) {
        this.remove(this.get(socialClubName));
        this.add(socialClubName, status);
    }

    public static remove(socialClubName:string, deleteDB:boolean = false) {
        this._list.delete(socialClubName);
        if(deleteDB) this.removeInDB(socialClubName);
    }

    private static async removeInDB(socialClubName:string) {
        try {
            await DBWhiteList.methods?.destroy({ where: { socialClub: socialClubName } });
        } catch(e) { terminal.error(e); }
    }

    public static async load() {
        terminal.debugDetailed('WhiteList.load();');

        try {
            let _list:any = await DBWhiteList.methods?.findAll();
            
            // if(_list != undefined) {
                if(_list?.length >= 1) {
                    let _count = 0;
                    _list?.forEach((_element:TBoston.Systems.WhiteList.element) => {
                        this._list.set(_element.socialClub, _element.status);
                        _count++;
                    });

                    terminal.done(`[WhiteList] Было загружено ${_count} пользователей`);
                } else {
                    terminal.warning(`[WhiteList] Загрузка невозможна так как таблица пуста`);
                }
            // } else {
            //     terminal.warning(`[WhiteList] Загрузка невозможна так как таблица пуста`);
            // }
        } catch(e) { terminal.error(e); }
    }

    public static async save() {
        try {
            await DBWhiteList.methods?.destroy({ where: {}, truncate: false });
            let _items = this.getAll();

            _items.forEach(async (_element:TBoston.Systems.WhiteList.element) => {
                let _found = await DBWhiteList.methods?.findOne({ where: { socialClub: _element.socialClub } });

                if(_found !== null) {
                    await DBWhiteList.methods?.update({
                        status: _element.status
                    }, { where: { socialClub: _element.socialClub} });
                } else {
                    await DBWhiteList.methods?.create({
                        socialClub: _element.socialClub,
                        status: _element.status
                    });
                }
            });
        } catch(e) { terminal.error(e); }
    }
}

export default WhiteList;