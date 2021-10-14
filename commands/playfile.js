module.exports = {
    name: 'playfile',
    description: 'Command to play song of what file you upload',
    execute(message, args) {
        const file = message.attachments.first();
        const fileUrl = file.url;
        console.log(fileUrl);

        playSong(message, fileUrl)

        function playSong(message, fileUrl) {
            message.member.voice.channel.join().then(VoiceConnection => {
                VoiceConnection.play(fileUrl, { seek: 0, volume: 1 }).on("finish", () => VoiceConnection.disconnect());
                message.reply("Playing...");
            }).catch(e => console.log(e))
        }
    }
}