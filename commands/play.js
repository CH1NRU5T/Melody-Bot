const axios = require('axios')
module.exports = {

  name: `play`,

  description: `Joins and plays a video from youtube`,

  execute(message, args) {

    //function to get the direct mp3 link of the searched song
    var songLink1 = (searchQuery) => {
      return axios.get('https://apg-saavn-api.herokuapp.com/result/?q=' + searchQuery)
        .then(res => res.data[0].media_url)
        .catch(err => console.log(err))
    }

    // function to turn the arguments into a string so that search query can be performed
    var getSongName = (args) => {
      var name = ""
      args.forEach(element => {
        name += element;
      });
      return name
    }

    //function to join the user voice channel and play the song
    function playSong(msg, link) {
      msg.member.voice.channel.join().then(VoiceConnection => {
        VoiceConnection.play(link, { seek: 0, volume: 1 }).on("finish", () => VoiceConnection.disconnect());
        msg.reply("Playing...");
      }).catch(e => console.log(e))
    }

    //start from here
    link = songLink1(getSongName(args)).then(res => playSong(message, res))
  }


}