const config = require('./package.json').config;

let player = {
    go: function (mainWindow) {
      const botconf = require('./botconf.json');
      const Discord = require('discord.js');

        let client = new Discord.Client();

        client.on('ready', () => {
            client.user.setPresence({
                game: {
                    name: 'Remoyte | ' + config.prefix + 'help'
                },
                status: 'online'
            });
        });

        client.on('message', message => {
            if (!message.guild) return;
            if (!message.content.startsWith(config.prefix) || message.author.bot) return;
            const args = message.content.slice(config.prefix.length).split(' ');
            const cmd = args.shift().toLowerCase();

            if (cmd === 'help') {
                message.channel.send('Get a video link and paste it after the prefix.');
                message.channel.send(`e.g: ${config.prefix}play https://www.youtube.com/watch?v=aqz-KE-bpKQ`);
                message.channel.send(`To stop the video: ${config.prefix}stop`);
                message.channel.send(`To get more details about me: ${config.prefix}about`);
            }
            if (cmd === 'play') {
                if (args.length !== 1) {
                    message.channel.send('Hey, you need to add a video or it won\'t work.');
                    return;
                }

                let vidReg = /v=(.{11})|\.be\/(.{11})/gmi;
                let match = vidReg.exec(args[0]);
                if (!match) {
                    message.channel.send('Your video is not working');
                    return;
                }
                let goodone = match[1] !== undefined ? match[1] : match[2];
                mainWindow.loadURL(`https://www.youtube.com/embed/${goodone}?autoplay=true`);
                message.channel.send('Playing !');
            }
            if (cmd === 'stop') {
                mainWindow.loadFile('waiting.html');
            }
            if (cmd === 'about') {
                message.channel.send('Discord Controlled Youtube window - more at https://github.com/Tym17/Remoyte');
            }
        })
        client.login(botconf.bottoken);
    }
}

module.exports = player;