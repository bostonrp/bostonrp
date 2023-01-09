
// IMPORTS

import Events from "../api/Events";
import Auth from "../systems/auth";
import WhiteList from "../systems/whitelist";

// CODE

Events.add('server.auth:login:send', async (player, username, password) => {
    let _account = await Auth.getAccountByKey('username', username);

    if(_account !== null) {
        let _password = Auth.generatePasswordHash(password);
        if(_password !== _account.password) return player.notify('~r~Неверный пароль');
        if(_account.social_id !== player.rgscId) return player.notify('~r~Это не Ваш аккаунт!');

        let isWhiteListed = WhiteList.get(player.socialClub);
        if(isWhiteListed === undefined || !isWhiteListed.status) return player.kickSilent();

        // todo Все хорошо, нужно пропустить игрока к выбору персонажа
    } else {
        player.notify('~r~Такого логина не существует');
    }
});

Events.add('server.auth:register:send', async (player, data:string) => {
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
            password: Auth.generatePasswordHash(_data.password),
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