const fs = require("fs-promise");
const swagger = require('./0924-ignite.json');

let basePath = swagger.basePath;



var paths = (json) => {
    let final = [];
    for (var key in json.paths) {
        if (json.paths.hasOwnProperty(key)) {
            let verbs = [];
            for(var verb in json.paths[key]){
                if (json.paths[key].hasOwnProperty(verb)) {
                    verbs.push(verb);
                //console.log(basePath + key + " -> " + verb);
                }
            }
            final.push({path: basePath + key, verbs: verbs});
        }
    }
    //console.log(final[0].path);
    return final.sort((a,b)=> {
        p1 = a.path;
        p2 = b.path;

        return p1 < p2 ? -1 : p1 > p2 ? 1 : 0;
    });
}


let list = paths(swagger);
//console.log(list[0].path);

list.forEach(item => {
    console.log(item.path + "  [" + item.verbs.toString() + "]");
})

/*
output:
/luis/api/v2.0/apps/  [post,get]
/luis/api/v2.0/apps/assistants  [get]
/luis/api/v2.0/apps/cultures  [get]
/luis/api/v2.0/apps/customprebuiltdomains  [get,post]
/luis/api/v2.0/apps/customprebuiltdomains/{culture}  [get]
/luis/api/v2.0/apps/domains  [get]
/luis/api/v2.0/apps/import  [post]
/luis/api/v2.0/apps/usagescenarios  [get]
/luis/api/v2.0/apps/{appId}  [get,put,delete]
/luis/api/v2.0/apps/{appId}/endpoints  [get]
/luis/api/v2.0/apps/{appId}/permissions  [get,post,delete,put]
/luis/api/v2.0/apps/{appId}/publish  [post]
/luis/api/v2.0/apps/{appId}/querylogs  [get]
/luis/api/v2.0/apps/{appId}/settings  [get,put]
/luis/api/v2.0/apps/{appId}/versions  [get]
/luis/api/v2.0/apps/{appId}/versions/import  [post]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/  [get,put,delete]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/assignedkey  [get,put]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/clone  [post]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/closedlists  [post,get]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/closedlists/{clEntityId}  [get,put,patch,delete]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/closedlists/{clEntityId}/sublists  [post]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/closedlists/{clEntityId}/sublists/{subListId}  [delete,put]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/compositeentities  [post,get]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/compositeentities/{cEntityId}  [get,put,delete]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/compositeentities/{cEntityId}/children  [post]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/compositeentities/{cEntityId}/children/{cChildId}  [delete]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/customprebuiltdomains  [post]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/customprebuiltdomains/{domainName}  [delete]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/customprebuiltentities  [post,get]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/customprebuiltintents  [post,get]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/customprebuiltmodels  [get]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/entities  [post,get]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/entities/{entityId}  [get,put,delete]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/entities/{entityId}/suggest  [get]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/example  [post]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/examples  [post,get]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/examples/{exampleId}  [delete]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/export  [get]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/externalKeys  [put,get]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/externalKeys/{keyType}  [delete]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/features  [get]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/hierarchicalentities  [post,get]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/hierarchicalentities/{hEntityId}  [get,put,delete]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/hierarchicalentities/{hEntityId}/children  [post]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/hierarchicalentities/{hEntityId}/children/{hChildId}  [get,put,delete]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/intents  [post,get]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/intents/{intentId}  [get,put,delete]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/intents/{intentId}/suggest  [get]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/listprebuilts  [get]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/models  [get]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/patterns  [post,get]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/patterns/{patternId}  [get,put,delete]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/phraselists  [post,get]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/phraselists/{phraselistId}  [get,put,delete]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/prebuilts  [post,get]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/prebuilts/{prebuiltId}  [get,delete]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/suggest  [delete]
/luis/api/v2.0/apps/{appId}/versions/{versionId}/train  [post,get]
/luis/api/v2.0/externalKeys  [post,get]
/luis/api/v2.0/externalKeys/{externalKeyValue}  [delete]
/luis/api/v2.0/programmatickey  [put]
/luis/api/v2.0/subscriptions  [post,get,put]
/luis/api/v2.0/subscriptions/{subscriptionKey}  [delete]

*/
