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
        const { inject } = fn
        if (inject) {
            this.service(fn.name, (container) => fn.bind(null,...inject.reduce(
                (dependenciesList, dependencieName) => ([ ...dependenciesList, container[dependencieName]]), 
                []))
            )
        } else {
            this.service(fn.name, () => fn)
        }
    }

    inject(registerName) {
        return function decorator(target) {
            if (registerName) {
                target = this[registerName][target.name]
            } else {
                target = this[target.name]
            }
        }
    }
}

module.exports = Container