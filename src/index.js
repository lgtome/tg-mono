process.env.NTBA_FIX_319 = 1
require('dotenv').config()
const { getCurrentCurrencies } = require('./helpers/getCorrectCurrency')
const axios = require('axios')
const { Provider } = require('./helpers/provider')
const express = require('express')
const app = express()
const PORT = 4002
const TelegramBot = require('node-telegram-bot-api')
const token = process.env.BOT_API_KEY
const bot = new TelegramBot(token, { polling: true })
const provider = Provider((id) => async () => {
    try {
        const data = await axios.get('https://api.monobank.ua/bank/currency')
        const currencies = getCurrentCurrencies(data.data)
        const res = currencies.map((curr) => curr.rateBuy)
        bot.sendMessage(id, res.toString())
    } catch (e) {
        console.log('Error: ', e.message)
    }
})

bot.onText(/[a-zA-Z]+$/gi, (msg) => {
    const id = msg?.chat?.id
    if (new RegExp(/stop/gi).test(msg?.text)) {
        console.log('stop')
        provider(id).unsubscribe()
    } else {
        console.log('start')
        provider(id).subscribe()
    }
})

app.listen(PORT, () => {
    console.log('works')
})
