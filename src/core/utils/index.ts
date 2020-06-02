import { checkAddress } from 'nanocurrency'


function validateNanoAddress(nanoAddress: string): boolean {
    return checkAddress(nanoAddress)
}

function currentTimeInSeconds(): number {
    return Math.trunc(Date.now()/1000)
}

function isNumber(value: string): boolean {
    return /^\d+$/.test(value);
}



export {
    currentTimeInSeconds,
    isNumber,
    validateNanoAddress,
}
