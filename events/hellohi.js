module.exports = {
	name: 'messageCreate',
	execute(message) {
		if (message.author.bot) return
	  
    const messageContent = message.content.toLowerCase()
    
    if (['hello', 'hi', 'sup', 'hey'].includes(messageContent)) return
    
    if(message.channelId == '958985861565919232') {
      message.reply('<#958985813826355223> might be a better place to say hi')
    }
  },
};