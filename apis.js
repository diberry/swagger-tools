const fs = require("fs-promise");
const swagger = require('./swagger.json');

let basePath = swagger.basePath;

var paths = (json) => {
    for (var key in json.paths) {
        if (json.paths.hasOwnProperty(key)) {
            let verbs = [];
            for(var verb in json.paths[key]){
                if (json.paths[key].hasOwnProperty(verb)) {
                    verbs.push(verb);
                //console.log(basePath + key + " -> " + verb);
                }
            }
            console.log(basePath + key +  " -> " + verbs.toString());
        }
    }
}

paths(swagger);
