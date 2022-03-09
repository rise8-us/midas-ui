import { camelToCapitalCase } from './caseConversions'

describe('caseConversions', () => {
    test('should convert camelcase to capital case', () => {
        expect(camelToCapitalCase('testCamelToCapital')).toEqual('Test Camel To Capital')
    })
})