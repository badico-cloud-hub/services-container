describe('Container spec - constructor', () => {
    it('Container should be a constructor')
    it('new Container should return a object with property services')
})

describe('Container spec - service method', () => {
    it('should be able to insert a new service inside a the object')
    it('should services being requested in a lazy way')
    it('should getter being called just at first time that we use the service')
})

describe('Container spec - register method', () => {
    it('should be able to define a service just with a function as parameter, no injection needed')
    it('should be able to define a service just with a function as parameter, injection needed')
    it('should be able to define a service with autoCall, no injection needed')
    it('should be able to define a service with autoCall, injection needed')
})