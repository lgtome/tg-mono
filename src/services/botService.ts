import TelegramBot from 'node-telegram-bot-api'
import { sumUpTime, transformTime } from '../helpers/transformTime'
import { Provider } from '../services/providerService'

class BotService {
    private readonly bot: TelegramBot
    private readonly provider: InstanceType<typeof Provider>
    constructor(bot: TelegramBot, provider: Provider) {
        this.bot = bot
        this.provider = provider
    }
    acceptText() {
        this.bot.onText(/^((?!setup).)*$/gm, (msg) => {
            const id = msg?.chat?.id
            if (id && msg?.text) {
                if (new RegExp(/stop/gi).test(msg?.text)) {
                    console.log('stop')
                    this.provider.unsubscribe(id.toString())
                } else {
                    console.log('start')
                    this.provider.subscribe(id.toString())
                }
            }
        })
    }

    acceptDialog() {
        this.bot.onText(/setup+$/gi, (msg) => {
            const id = msg?.chat?.id
            if (id && msg?.text) {
                this.bot.sendMessage(id, 'test', {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: '5 minute',
                                    callback_data: '1000 * 60 * 5',
                                },
                            ],
                            [
                                {
                                    text: '15 minute',
                                    callback_data: '1000 * 60 * 15',
                                },
                            ],
                            [
                                {
                                    text: '30 minute',
                                    callback_data: '1000 * 60 * 30',
                                },
                            ],
                            [
                                {
                                    text: '1hour',
                                    callback_data: '1000 * 60 * 60',
                                },
                            ],
                            [
                                {
                                    text: '2hour',
                                    callback_data: '1000 * 60 * 120',
                                },
                            ],
                            [
                                {
                                    text: '3hour',
                                    callback_data: '1000 * 60 * 180',
                                },
                            ],
                            [
                                {
                                    text: '12hour',
                                    callback_data: '1000 * 60 * 60 * 12',
                                },
                            ],
                        ],
                    },
                })
            }
        })

        this.bot.on('callback_query', (callbackQuery) => {
            const action = callbackQuery.data
            const msg = callbackQuery.message
            const opts = {
                chat_id: msg?.chat.id,
                message_id: msg?.message_id,
            }
            if (!action) {
                this.bot.editMessageText('something went wrong', opts)
                return
            }

            const time = transformTime(sumUpTime(action))
            if (time) {
                this.provider.timeSetter = time
            }
            this.bot.editMessageText('accepted!', opts)
        })
    }
}

export { BotService }
