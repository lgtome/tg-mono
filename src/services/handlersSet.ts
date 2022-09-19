import axios from 'axios'
import TelegramBot from 'node-telegram-bot-api'
import { getCurrentCurrencies } from '../helpers/getCorrectCurrency'

class HandlersSet {
    static defaultHandler(bot: TelegramBot) {
        return (id: string) => async () => {
            try {
                const data = await axios.get(
                    'https://api.monobank.ua/bank/currency'
                )
                const currencies = getCurrentCurrencies(data.data)
                const res = currencies.map((curr) => curr.rateBuy)
                bot.sendMessage(id, res.toString())
            } catch (e) {
                const error = e as Error
                console.log('Error: ', error.message)
            }
        }
    }
}

export { HandlersSet }
