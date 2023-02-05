
// IMPORTS

import rpc from "@aspidemon/rage-rpc";
import Users from "api/users/index";
import methods from "modules/methods";
import terminal from "modules/terminal";
import Auth from "../systems/auth";
import WhiteList from "../systems/whitelist";

// CODE

rpc.on('server.auth:login:send', async (player:PlayerMp, data:string) => {
    let _data = JSON.parse(data)

    let _user = Users.getByDynamicID(player.id)
    let _account = await Auth.getAccountByKey('username', _data.username);

    terminal.log(_account)

    if(_account !== null) {
        let _password = Auth.generatePasswordHash(_data.password.trim());
        let _social_id = Auth.generatePasswordHash(player.rgscId)
        let _social_club = player.socialClub

        let isWhiteListed = WhiteList.get(_social_club);

        if(isWhiteListed === undefined || !isWhiteListed) {
            _user.callBrowser('cef.auth:notify:set', 'У вас нет доступа к WhiteList.\n Наш дискорд: https://discord.gg/SnnKVv5N');
            await methods.sleep(1500)
            return player.kickSilent()
        };

        if(_password != _account.password) return _user.callBrowser('cef.auth:notify:set', 'Неверный пароль');
        if(_account.social_id !== _social_id) return _user.callBrowser('cef.auth:notify:set', 'Это не Ваш аккаунт!');

        if (_user)
            _user.callClient("client.auth:cef:hide")
    } else {
        _user.callBrowser('cef.auth:notify:set', 'Такого логина не существует');
    }
});

rpc.on('server.auth:register:send', async (player:PlayerMp, data:string) => {
    let _data:TBoston.Systems.Auth.registerData = JSON.parse(data);

    let _account = await Auth.getAccountByKey('social_id', player.rgscId);

    let _user = Users.getByDynamicID(player.id)

    if(_account === null) {
        let _dataCheck = {
            email: await Auth.getAccountByKey('email', _data.email),
            username: await Auth.getAccountByKey('username', _data.username)
        };

        if(_dataCheck.email !== null) return _user.callBrowser('cef.register:notify:set', 'Почта уже используется');
        if(_dataCheck.username !== null) return _user.callBrowser('cef.register:notify:set', 'Такой логин уже используется');

        await Auth.createAccount({
            email: _data.email,
            username: _data.username,
            password: _data.password.trim(),
            social_id: player.rgscId,
            social_name: player.socialClub,
            hwid: player.serial,
            ip: player.ip,
            referal_code: _data.referal_code
        });

        // todo Все хорошо, нужно пропустить игрока к выбору персонажа
    } else {
        _user.callBrowser('cef.register:notify:set', 'У Вас уже существует аккаунт');
    }
});