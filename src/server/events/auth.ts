
// IMPORTS

import rpc from "@aspidemon/rage-rpc";
import Users from "api/users/index";
import Auth from "../systems/auth";
import WhiteList from "../systems/whitelist";

// CODE

rpc.on('server.auth:login:send', async (player, data:string) => {
    let _data = JSON.parse(data)

    let _account = await Auth.getAccountByKey('username', _data.username);

    if(_account !== null) {
        let _password = Auth.generatePasswordHash(_data.password.trim());
        let _social_id = Auth.generatePasswordHash(player.rgscId)
        let _social_club = Auth.generatePasswordHash(player.socialClub)

        if(_password != _account.password) return player.notify('~r~Неверный пароль');
        if(_account.social_id !== _social_id) return player.notify('~r~Это не Ваш аккаунт!');

        let isWhiteListed = WhiteList.get(_social_club);
        console.log(isWhiteListed)
        if(isWhiteListed === undefined || !isWhiteListed.status) return player.kickSilent();

        let _user = Users.getByDynamicID(player.id)

        if (_user)
            _user.callClient("auth:cef:hide")
    } else {
        player.notify('~r~Такого логина не существует');
    }
});

rpc.on('server.auth:register:send', async (player, data:string) => {
    let _data:TBoston.Systems.Auth.registerData = JSON.parse(data);

    let _account = await Auth.getAccountByKey('social_id', player.rgscId);

    if(_account === null) {
        let _dataCheck = {
            email: await Auth.getAccountByKey('email', _data.email),
            username: await Auth.getAccountByKey('username', _data.username)
        };

        if(_dataCheck.email !== null) return player.notify('~r~Почта уже используется!');
        if(_dataCheck.username !== null) return player.notify('~r~Такой логин уже занят');

        await Auth.createAccount({
            email: _data.email,
            username: _data.username,
            password: Auth.generatePasswordHash(_data.password.trim()),
            social_id: player.rgscId,
            social_name: player.socialClub,
            hwid: player.serial,
            ip: player.ip,
            referal_code: _data.referal_code
        });

        // todo Все хорошо, нужно пропустить игрока к выбору персонажа
    } else {
        player.notify('~r~У Вас уже существует аккаунт!');
    }
});