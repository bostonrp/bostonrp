
// IMPORTS

import Events from "../api/Events";
import Auth from "../systems/auth";
import WhiteList from "../systems/whitelist";

// CODE

Events.add('server.auth:login:send', async (player, username, password) => {
    let _account = await Auth.getAccountByKey('username', username);

    if(_account !== null) {
        let _password = Auth.generatePasswordHash(password);
        if(_password !== _account.password) return; // todo Нужно уведомить игрока о том, что пароль неверный
        if(_account.socialID !== player.rgscId) return; // todo Нужно уведомить игрока, что это не его аккаунт

        let isWhiteListed = WhiteList.get(player.socialClub);
        if(isWhiteListed === undefined || !isWhiteListed.status) return player.kickSilent();

        // todo Все хорошо, нужно пропустить игрока к выбору персонажа
    } else {
        // todo Нужно обработать ошибку и отправить её на клиент для того чтобы пользователь узнал, что аккаунта не существует
    }
});

Events.add('server.auth:register:send', async (player, data:TBoston.Systems.Auth.regData) => {
    let _account = await Auth.getAccountByKey('socialID', player.rgscId);

    if(_account !== null) {
        let _data = {
            email: await Auth.getAccountByKey('email', data.email),
            username: await Auth.getAccountByKey('username', data.username)
        };

        if(_data.email !== null) return; // todo Такая почта уже занята
        if(_data.username !== null) return; // todo Такой логин уже используется

        await Auth.createAccount({
            email: data.email,
            username: data.username,
            password: Auth.generatePasswordHash(data.password),
            socialID: player.rgscId,
            socialName: player.socialClub,
            hwid: player.serial,
            ip: player.ip,
            referal_code: data.referalcode
        });

        // todo Все хорошо, нужно пропустить игрока к выбору персонажа
    } else {
        // todo Нужно написать игроку, что у него уже существует аккаунт
    }
});