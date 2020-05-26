import { checkAddress } from 'nanocurrency'


function validateNanoAddress(nanoAddress: string): boolean {
    return checkAddress(nanoAddress)
}



export {
    validateNanoAddress
}
