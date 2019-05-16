const Container = require('../Container')
describe('CheckConfiguration data', () => {
    it('should throw because  a depencie is missing', () => {
        expect.assertions(1)
        try {
            new Container([
                {
                    "path": "./presenter",
                    "name": "presenter", 
                    "kind": "object",
                    "dependencies": ["Presenter"],
                },
            ])
        }catch(err) {
            expect(err.message).toMatch('There is a error in configurations data')
        }
    })

    it('should throw because  a depencie is missing', () => {
        expect.assertions(0)
        try {
            new Container([
                {
                    "path": "./presenter",
                    "name": "presenter", 
                    "kind": "object",
                    "dependencies": ["Presenter"],
                },
                {
                    "path": "./presenter",
                    "name": "Presenter", 
                    "kind": "object",
                    "dependencies": ["Presenter"],
                },
            ])
        }catch(err) {
            expect(err.message).toMatch('There is a error in configurations data')
        }
    })
})