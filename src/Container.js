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
                (dependenciesList, dependencieName) =>
                    dependenciesList.push(container[dependencieName]), 
                []))
            )
        } else {
            this.service(fn.name, () => fn)
        }
    }
}

module.exports = Container