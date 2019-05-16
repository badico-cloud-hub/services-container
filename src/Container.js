class Container {
    constructor(data){
        // this.checkConfiguration(data)
        this.services = {}

        // data && this.json(data)
    }

    checkConfiguration(data) {
        // const check = data.reduce((error, item) => {
        //     if (error) throw error
        //    item.dependencies.every((depName) => {
        //         return data.some(item => item.name === depName)
        //     })
        // }, null)
        if (true) {
            throw new Error('There is a error in configurations data')
        }
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

    register(fn, name, dependencies, kind) {
        const { inject, autoCall } = fn

        this.service(fn.name, (container) => {
            if (inject && inject.length === 1 && autoCall) {
                return fn(container[inject[0]])
            }
            const boundFn = fn.bind(null,...(inject || []).reduce(
                (dependenciesList, dependencieName) => ([ ...dependenciesList, container[dependencieName]]), 
                []))
            return autoCall ? boundFn() : boundFn
        })
        
    }

    // batch(list) {
    //     list.reduce((c, fn) => c.register(fn), this)
    // }
    
    // json(list) {
    //     this.batch(
    //         list.map(this.require)
    //     )
    // }

    // require(filepath) {
    //     return require(this.path(filepath))
    // }

    // path(filepath) {
    //     return `../${filepath}`
    // }

}

/**
 *
 * Add a method to validade the document,
 * check every dependencie in the tree
 * if has a correspondent service register
 * so in the constructor time it throws
 * a exception of bad config
 * 
 * DATA INTERFACE
 [
    {
        "path": "./presenter", required
        "name": "presenter", required
        "kind": "object", optinal | function
        "dependencies": ["Presenter"] optional | []
    },
    {
        "path": "../services/transaction.analyze",
        "name": "confirmTransaction",
        "kind": "function",
        "dependencies": [
            "getFinancialInstitutionIdFromJwtToken",
            "TransactionDomainORM",	
            "RunnerFactory"
        ]
    }
]
 * */

module.exports = Container