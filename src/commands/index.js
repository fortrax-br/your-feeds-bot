const setupFeedActions = require('../actions');
const { 
  startBotCommand,
  startServiceCommand,
  viewChatCommand,
  addFeedCommand,
  removeFeedCommand,
  activeChatCommand,
  startServiceEvent,
  removeChatCommand,
  setStylesFeedCommand,
} = require('./commandsMethods');

class Commands {
  constructor({ bot }) {
    this._bot = bot;
  }

  init() {
    this._bot.start(async ctx => await startBotCommand(ctx));
  
    this._bot.on('channel_post', async ctx => await startServiceEvent(ctx));    
    this._bot.command('start_service', async ctxStartServiceCmd => startServiceCommand(ctxStartServiceCmd));
    this._bot.command('view_chat', async ctxViewChatCmd => viewChatCommand(ctxViewChatCmd, this._bot));
    this._bot.command('add', async ctxAddCmd => await addFeedCommand(ctxAddCmd));
    this._bot.command('remove', async ctxRemoveCmd => await removeFeedCommand(ctxRemoveCmd));
    this._bot.command('active', async ctxActiveCmd => await activeChatCommand(ctxActiveCmd));
    this._bot.command('remove_chat', async ctxRemoveChatCmd => await removeChatCommand(ctxRemoveChatCmd));
    this._bot.command('styles', async ctxSetStylesCmd => await setStylesFeedCommand(ctxSetStylesCmd));

    setupFeedActions({ bot: this._bot });
  }
}

module.exports = Commands;