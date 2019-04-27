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
        const { injectable, inject } = fn
        if (injectable) {
            this.service(fn.name, (c) => fn.bind(null,...inject.reduce(
                (arr, dep) => [...arr, c[dep]],  
                []))
            )
        } else {
            this.service(fn.name, () => fn)
        }
    }
}

module.exports = Container