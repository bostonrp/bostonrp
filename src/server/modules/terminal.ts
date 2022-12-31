
// IMPORTS

import methods from './methods';
import configs from '../../shared/configs/server.json';
import * as colors from 'console-log-colors';

// CODE

class Terminal {
    public log(text: any, ...args: any[]): void {
        let _timeTag = colors.gray(methods.getRealTimeToSec());
        let _tag = colors.gray(`[LOG]`);
        let _scobe = {
            open: colors.gray('['),
            close: colors.gray(']')
        };
    
        let _args = `${args}`.replace(',', '", "');
        let _construction = colors.gray(`"${_args}"`);
    
        console.log(
            `${_timeTag} ${_tag} ${text}`,
            _args ? `${_scobe.open}${_construction}${_scobe.close}` : ''
        );
    }
    
    public debug(text:any, ...args:any[]) {
        if(!configs.debug) return;
        let _timeTag = colors.gray(methods.getRealTimeToSec());
        let _tag = colors.cyan(`[DEBUG]`);
        let _scobe = {
            open: colors.gray('['),
            close: colors.gray(']')
        };
    
        let _args = `${args}`.replace(',', '", "');
        let _construction = colors.cyan(`"${_args}"`);
    
        console.log(
            `${_timeTag} ${_tag} ${text}`,
            _args ? `${_scobe.open}${_construction}${_scobe.close}` : ''
        );
    }

    public debugDetailed(text:any, ...args:any[]) {
        if(!configs.debugDetailed) return;
        let _timeTag = colors.gray(methods.getRealTimeToSec());
        let _tag = colors.gray(`[DEBUG]`);
        let _scobe = {
            open: colors.gray('['),
            close: colors.gray(']')
        };
    
        let _args = `${args}`.replace(',', '", "');
        let _construction = colors.gray(`"${_args}"`);
    
        console.log(
            `${_timeTag} ${_tag} ${text}`,
            _args ? `${_scobe.open}${_construction}${_scobe.close}` : ''
        );
    }

    public error(text:any, ...args:any[]) {
        let _timeTag = colors.gray(methods.getRealTimeToSec());
        let _tag = colors.red(`[ERROR]`);
        let _scobe = {
            open: colors.gray('['),
            close: colors.gray(']')
        };
    
        let _args = `${args}`.replace(',', '", "');
        let _construction = colors.red(`"${_args}"`);
    
        console.log(
            `${_timeTag} ${_tag} ${text}`,
            _args ? `${_scobe.open}${_construction}${_scobe.close}` : ''
        );
    }

    public warning(text:any, ...args:any[]) {
        let _timeTag = colors.gray(methods.getRealTimeToSec());
        let _tag = colors.bold(colors.yellow(`[WARNING]`));
        let _scobe = {
            open: colors.gray('['),
            close: colors.gray(']')
        };
    
        let _args = `${args}`.replace(',', '", "');
        let _construction = colors.yellow(`"${_args}"`);
    
        console.log(
            `${_timeTag} ${_tag} ${text}`,
            _args ? `${_scobe.open}${_construction}${_scobe.close}` : ''
        );
    }

    public info(text:any, ...args:any[]) {
        let _timeTag = colors.gray(methods.getRealTimeToSec());
        let _tag = colors.yellow(`[INFO]`);
        let _scobe = {
            open: colors.gray('['),
            close: colors.gray(']')
        };
    
        let _args = `${args}`.replace(',', '", "');
        let _construction = colors.yellow(`"${_args}"`);
    
        console.log(
            `${_timeTag} ${_tag} ${text}`,
            _args ? `${_scobe.open}${_construction}${_scobe.close}` : ''
        );
    }

    public done(text:any, ...args:any[]) {
        let _timeTag = colors.gray(methods.getRealTimeToSec());
        let _tag = colors.green(`[DONE]`);
        let _scobe = {
            open: colors.gray('['),
            close: colors.gray(']')
        };
    
        let _args = `${args}`.replace(',', '", "');
        let _construction = colors.green(`"${_args}"`);
    
        console.log(
            `${_timeTag} ${_tag} ${text}`,
            _args ? `${_scobe.open}${_construction}${_scobe.close}` : ''
        );
    }
}

const terminal = new Terminal();
export default terminal;