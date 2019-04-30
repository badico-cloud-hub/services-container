class Container {
    constructor(){
        this.services = {};
    }

    service(name, cb){
        Object.defineProperty(this, name, {
            get: () => {
                if(!this.services.hasOwnProperty(name)){
                    this.services[name] = cb(this);
                }

                return this.services[name];
            },
            configurable: true,
            enumerable: true
        });

        return this;
    }

    register(fn) {
        const { inject, autoCall } = fn

        this.service(fn.name, (container) => { 
            const boundFn = fn.bind(null,...(inject || []).reduce(
                (dependenciesList, dependencieName) => ([ ...dependenciesList, container[dependencieName]]), 
                []))
            return autoCall ? boundFn() : boundFn
        })
        
    }

}

module.exports = Container