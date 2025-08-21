const express = require('express');
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const GUILD_ID = 'enter your guild id';
const TOKEN = 'enter your token';

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

app.post('/send-message', async(req, res) => {
    console.log('Received');
    const { discordId, message, adminName } = req.body;
    
    try {
        const guild = await client.guilds.cache.get(GUILD_ID);
        const member = await guild.members.cache.get(discordId);
        console.log(discordId);
        const messageEmbed = new EmbedBuilder().setAuthor({ name: adminName}).setColor('Red').setDescription(message).setTitle('Message from Admin: ' + adminName).setTimestamp();
        await member.send({
            embeds: [messageEmbed],
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: 'Error sending message!'});
    }
});

client.on('ready', async(c) => {
    console.log('logged in as bot');
});

client.login(TOKEN);

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});