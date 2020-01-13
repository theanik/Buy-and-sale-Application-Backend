module.exports = function(prom){
    return new Promise((resolve,reject)=>{
        let error = null
        let data = null
        prom.then((d)=>{
            data = d
            resolve([error,data])
        })
        .catch(e=>{
            error = e
            resolve([error,data])
        })
    })
}