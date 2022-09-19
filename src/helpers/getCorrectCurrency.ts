interface Currency {
    currencyCodeA: number
    currencyCodeB: number
    rateBuy: string
}

function getCurrentCurrencies(currencies: Currency[]) {
    const CODES = [
        { currencyCodeA: 840, currencyCodeB: 980 },
        { currencyCodeA: 978, currencyCodeB: 980 },
    ]
    return currencies.filter(
        ({
            currencyCodeA: externalCurrencyCodeA,
            currencyCodeB: externalCurrencyCodeB,
        }) => {
            return CODES.some(({ currencyCodeA, currencyCodeB }) => {
                return (
                    currencyCodeA === externalCurrencyCodeA &&
                    currencyCodeB === externalCurrencyCodeB
                )
            })
        }
    )
}

export { getCurrentCurrencies }
