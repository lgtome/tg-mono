process.env.NTBA_FIX_319 = '1'
import { config } from 'dotenv'
config({ path: '.env.local' })
config()
import TelegramBot from 'node-telegram-bot-api'
import express from 'express'
import { Provider } from './services/providerService'
import { BotService } from './services/botService'
import { sumUpTime, transformTime } from './helpers/transformTime'

const app = express()
const PORT = 4002
const TOKEN = process.env.BOT_API_KEY || ''
const TIME = transformTime(sumUpTime(process.env.TIME))

console.log('Token: ', TOKEN)

const bot = new TelegramBot(TOKEN, { polling: true })

const provider = new Provider(Provider.defaultHandler(bot), TIME)

const botService = new BotService(bot, provider)

botService.acceptDialog()
botService.acceptText()

app.listen(PORT, () => {
    console.log('works')
})
