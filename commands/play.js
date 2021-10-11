const ytdl = require(`ytdl-core`);
const ytSearch = require(`yt-search`);

module.exports = {

  name: `play`,

  description: `Joins and plays a video from youtube`,

  async execute(msg, args) {

    const voiceChannel = msg.member.voice.channel;

    if (!voiceChannel) {

      return msg.reply(`You need to be in a voice channel to listen to music dumbass`);

    }
    const permissions = voiceChannel.permissionsFor(msg.client.user);

    if (!permissions.has(`CONNECT`)) return msg.channel.send(`You don't have the correct permissions`);

    if (!permissions.has(`SPEAK`)) return msg.channel.send(`You don't have the correct permissions`);

    if (!args.length) return msg.channel.send(`You need to type the name of the song`);

    const connection = await voiceChannel.join();

    //function to find video based on search queries
    const videoFinder = async (query) => {
      //yt search
      const videoResult = await ytSearch(query);

      return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
    }

    const video = await videoFinder(args.join(` `));

    if (video) {
      const stream = ytdl(video.url, { filter: 'audioonly' });

      connection.play(stream, { seek: 0, volume: 1 })
        .on(`finish`, () => {
          voiceChannel.leave();
        });

      await msg.reply(`:thumbsup: Now Playing ***${video.title}***`);
    } else {
      msg.channel.send(`No video result found`);
    }
  }
}