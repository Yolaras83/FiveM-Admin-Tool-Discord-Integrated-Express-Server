const express = require('express');
const { Client, IntentsBitField, EmbedBuilder, ChannelType } = require('discord.js');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.DirectMessages,
    ],
});

const staffRole = '1286365936059940875';
let supportChannel;

app.post('/send-message', async(req, res) => {
    console.log('Received');
    const { discordId, message, adminName } = req.body;
    
    try {
        const guild = await client.guilds.cache.get('1286365306767540384');
        const member = await guild.members.cache.get(discordId);
        const messageEmbed = new EmbedBuilder().setAuthor({ name: adminName}).setColor('Red').setDescription(message).setTitle('Message from Admin: ' + adminName).setTimestamp();
        await member.send({
            embeds: [messageEmbed],
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: 'Error sending message!'});
    }
});

app.post('/create-support', async(req, res) => {
    const discordId = req.body.discordId;

    try {
        const guild = await client.guilds.cache.get('1286365306767540384');
        const member = await guild.members.cache.get(discordId); 
        supportChannel = await guild.channels.create({
            name: `📞Support-${member.user.tag}`,
            parent: '1286366197058764901',
            type: ChannelType.GuildVoice,
            permissionOverwrites: [
                {
                    id: guild.roles.everyone.id,
                    deny: ['ViewChannel'],
                },
                {
                    id: discordId,
                    allow: ['ViewChannel', 'Connect'],
                },
                {
                    id: staffRole,
                    allow: ['ViewChannel', 'Connect'],
                },
            ],
        });

        await member.send(`**A support voice room has been created for you by an admin! Please join it by pressing here: <#${supportChannel.id}>**`);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: "Error creating support room!" });
    }
});

client.on('ready', async(c) => {
    console.log('logged in as bot');
});

client.on('voiceStateUpdate', async(oldState, newState) => {

    if(!oldState.channel) return; 

    if(!supportChannel) return;

    if(oldState.channel.id == supportChannel.id) {
        if(oldState.channel.members.size == 0) {
            await oldState.channel.delete();
        }
    }
});

client.login('MTQwODA1MzY2OTAzMDUzMTExMg.G3tHG3.KKhoIStiqcVgdaQ6wZz519eCaMROcM6E9LqfgY');

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
