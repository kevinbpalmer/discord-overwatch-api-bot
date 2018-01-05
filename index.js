require('dotenv').config()
console.log('Token: ', process.env.TOKEN)
const Discord = require('discord.js')
const client = new Discord.Client()
const axios = require('axios')

client.on('ready', () => {
  console.log('I am ready!')
})

client.on('message', message => {
  const string = message.content.toLowerCase()
  if (string.includes('!ow')) {
    const username = string.substr(string.indexOf(' ')+1) // this should be the username
    const uneditedUsername = message.content.substr(string.indexOf(' ')+1) // this makes sure to pass in the exact username without making it lowercase
    console.log(username)

    if (username === 'kevin') {
      axios.get('https://discord-overwatch-api.herokuapp.com/profile/pc/us/Blahlalablah-1697')
      .then(res => {
        console.log('Success!! ', res.data)
        const user = res.data

        const finalMessage = `\n\nUsername: ${user.username} \n\n Level: ${user.level} \n\n Playtime: Quickplay: ${user.playtime.quickplay} Competitive: ${user.playtime.competitive} \n\n ${!user.competitive.rank ? 'Rank: Not ranked for this season' : user.competitive.rank} \n\n`
        message.reply(finalMessage)
      })
      .catch(err => {
        console.error('FAIL! ', err)
      })
    }
    else {
      axios.get(`https://discord-overwatch-api.herokuapp.com/profile/pc/us/${uneditedUsername}`)
      .then(res => {
        console.log('Success!! ', res.data)
        const user = res.data

        const finalMessage = `\n\nUsername: ${user.username} \n\n Level: ${user.level} \n\n Playtime: Quickplay: ${user.playtime.quickplay} Competitive: ${user.playtime.competitive} \n\n ${!user.competitive.rank ? 'Rank: Not ranked for this season' : user.competitive.rank} \n\n`
        message.reply(finalMessage)
      })
      .catch(err => {
        console.error('FAIL! ', err)
        message.reply(`Cannot find user: ${username}`)
      })
    }

  }
})

client.login(process.env.TOKEN)
