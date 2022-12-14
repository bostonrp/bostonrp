
// IMPORTS

import WorldTime from "@database/world_time";
import config from "@shared/configs/server.json";
import methods from "../modules/methods";
import terminal from "../modules/terminal";

// CODE

class Time {
    private static _year:number = 2010;
    private static _months:number = 1;
    private static _days:number = 1;

    private static _hours:number = 0;
    private static _minutes:number = 0;
    private static _seconds:number = 0;

    public static async load() {
        terminal.debugDetailed('Time.load();');
        await WorldTime.methods?.findOrCreate({ where: { id: 1 } });

        let _data = await WorldTime.methods?.findOne({ where: { id: 1 } });
        let _result = JSON.parse(JSON.stringify(_data));
        
        this._year = _result.year;
        this._months = _result.month;
        this._days = _result.day;
        
        this._hours = _result.hour;
        this._minutes = _result.minute;

        this._tick();
    }

    private static async _tick() {
        await methods.sleep(config.time.secondsPedMinute * 1000 / 60);
        ++this._seconds;

        if(this._seconds >= 60) {
            this._seconds = 0;
            ++this._minutes;
            this._save();
        }

        if(this._minutes >= 60) {
            this._minutes = 0;
            ++this._hours;
        }

        if(this._hours >= 24) {
            this._hours = 0;
            ++this._days;
        }

        if(this._months == 2) { // Февраль
            if(this._getLeapYear(this._year)) { // Высокосный
                if(this._days > 29) {
                    this._days = 1;
                    ++this._months;
                }
            } else { // Не высокосный
                if(this._days > 28) {
                    this._days = 1;
                    ++this._months;
                }
            }
        } else {
            if(this._months == 1 || this._months == 3 || this._months == 5 || this._months == 7 || this._months == 8 || this._months == 10 || this._months == 12) {
                if(this._days > 31) {
                    this._days = 1;
                    ++this._months;
                }
            } else {
                if(this._days > 30) {
                    this._days = 1;
                    ++this._months;
                }
            }
        }

        if(this._months > 12) {
            this._months = 1;
            ++this._year;
        }

        mp.world.time.set(this._hours, this._minutes, this._seconds);
        if(config.time.debug) terminal.log(`${this._hours}:${this._minutes}:${this._seconds}`);

        this._tick();
    }

    private static async _save() {
        if(config.time.debug) terminal.log('Time._save();');
        
        await WorldTime.methods?.update({
            year: this._year,
            month: this._months,
            day: this._days,

            hour: this._hours,
            minute: this._minutes
        }, { where: { id: 1 } }).catch((err) => {
            terminal.error(err);
        });
    }

    private static _getLeapYear(number:number) {
        return !((number % 4) || (!(number % 100) && (number % 400)));
    }
}

export default Time;