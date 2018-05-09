const fs = require("fs-promise");
const _ = require("underscore");
const swagger = require('./0504-luis-for-build-conf.json');

let basePath = swagger.basePath;



var paths = (json) => {
    let final = [];
    _.keys(json.paths).forEach(path => {
        
        let verbs = [];
        _.keys(json.paths[path]).forEach(verb => {

            var codes = [];
            
            //_.keys(json.paths[path][verb].responses).forEach(responseCode => {
                
            //    codes.push(responseCode);
            //});

            var linkedVerb = "[" + verb + "](" + "https://westus.dev.cognitive.microsoft.com/docs/services/5890b47c39e2bb17b84a55ff/operations/" + json.paths[path][verb].operationId + ")";

            verbs.push(linkedVerb);
        });
        final.push({path: path, verbs: verbs});
    });
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
    console.log(" * " + item.path + "  [" + item.verbs.toString() + "]");
})

/*
output:
/apps/{appId}/versions/{versionId}/example  [post]
/apps/  [post,get]
/apps/cultures  [get]
/apps/customprebuiltdomains  [get,post]
/apps/customprebuiltdomains/{culture}  [get]
/apps/domains  [get]
/apps/import  [post]
/apps/usagescenarios  [get]
/apps/{appId}  [get,put,delete]
/apps/{appId}/endpoints  [get]
/apps/{appId}/permissions  [get,post,delete,put]
/apps/{appId}/publish  [post]
/apps/{appId}/querylogs  [get]
/apps/{appId}/settings  [get,put]
/apps/{appId}/versions  [get]
/apps/{appId}/versions/import  [post]
/apps/{appId}/versions/{versionId}/  [get,put,delete]
/apps/{appId}/versions/{versionId}/assignedkey  [get,put]
/apps/{appId}/versions/{versionId}/clone  [post]
/apps/{appId}/versions/{versionId}/closedlists  [post,get]
/apps/{appId}/versions/{versionId}/closedlists/{clEntityId}  [get,put,patch,delete]
/apps/{appId}/versions/{versionId}/closedlists/{clEntityId}/sublists  [post]
/apps/{appId}/versions/{versionId}/closedlists/{clEntityId}/sublists/{subListId}  [delete,put]
/apps/{appId}/versions/{versionId}/closedlists/{entityId}/roles  [get,post]
/apps/{appId}/versions/{versionId}/closedlists/{entityId}/roles/{roleId}  [get,put,delete]
/apps/{appId}/versions/{versionId}/compositeentities  [post,get]
/apps/{appId}/versions/{versionId}/compositeentities/{cEntityId}  [get,put,delete]
/apps/{appId}/versions/{versionId}/compositeentities/{cEntityId}/children  [post]
/apps/{appId}/versions/{versionId}/compositeentities/{cEntityId}/children/{cChildId}  [delete]
/apps/{appId}/versions/{versionId}/compositeentities/{cEntityId}/roles  [get,post]
/apps/{appId}/versions/{versionId}/compositeentities/{cEntityId}/roles/{roleId}  [get,put,delete]
/apps/{appId}/versions/{versionId}/customprebuiltdomains  [post]
/apps/{appId}/versions/{versionId}/customprebuiltdomains/{domainName}  [delete]
/apps/{appId}/versions/{versionId}/customprebuiltentities  [post,get]
/apps/{appId}/versions/{versionId}/customprebuiltentities/{entityId}/roles  [get,post]
/apps/{appId}/versions/{versionId}/customprebuiltentities/{entityId}/roles/{roleId}  [get,put,delete]
/apps/{appId}/versions/{versionId}/customprebuiltintents  [post,get]
/apps/{appId}/versions/{versionId}/customprebuiltmodels  [get]
/apps/{appId}/versions/{versionId}/entities  [post,get]
/apps/{appId}/versions/{versionId}/entities/{entityId}  [get,put,delete]
/apps/{appId}/versions/{versionId}/entities/{entityId}/roles  [get,post]
/apps/{appId}/versions/{versionId}/entities/{entityId}/roles/{roleId}  [get,put,delete]
/apps/{appId}/versions/{versionId}/entities/{entityId}/suggest  [get]
/apps/assistants  [get]
/apps/{appId}/versions/{versionId}/examples  [post,get]
/apps/{appId}/versions/{versionId}/examples/{exampleId}  [delete]
/apps/{appId}/versions/{versionId}/export  [get]
/apps/{appId}/versions/{versionId}/externalKeys  [put,get]
/apps/{appId}/versions/{versionId}/externalKeys/{keyType}  [delete]
/apps/{appId}/versions/{versionId}/features  [get]
/apps/{appId}/versions/{versionId}/hierarchicalentities  [post,get]
/apps/{appId}/versions/{versionId}/hierarchicalentities/{hEntityId}  [get,put,delete]
/apps/{appId}/versions/{versionId}/hierarchicalentities/{hEntityId}/children  [post]
/apps/{appId}/versions/{versionId}/hierarchicalentities/{hEntityId}/children/{hChildId}  [get,put,delete]
/apps/{appId}/versions/{versionId}/hierarchicalentities/{hEntityId}/roles  [get,post]
/apps/{appId}/versions/{versionId}/hierarchicalentities/{hEntityId}/roles/{roleId}  [get,put,delete]
/apps/{appId}/versions/{versionId}/intents  [post,get]
/apps/{appId}/versions/{versionId}/intents/{intentId}  [get,put,delete]
/apps/{appId}/versions/{versionId}/intents/{intentId}/suggest  [get]
/apps/{appId}/versions/{versionId}/listprebuilts  [get]
/apps/{appId}/versions/{versionId}/models  [get]
/apps/{appId}/versions/{versionId}/patternanyentities  [get,post]
/apps/{appId}/versions/{versionId}/patternanyentities/{entityId}  [get,put,delete]
/apps/{appId}/versions/{versionId}/patternanyentities/{entityId}/explicitlist  [post,get]
/apps/{appId}/versions/{versionId}/patternanyentities/{entityId}/explicitlist/{itemId}  [get,delete]
/apps/{appId}/versions/{versionId}/patternanyentities/{entityId}/roles  [get,post]
/apps/{appId}/versions/{versionId}/patternanyentities/{entityId}/roles/{roleId}  [get,put,delete]
/apps/{appId}/versions/{versionId}/patterns  [post,get]
/apps/{appId}/versions/{versionId}/patterns/{patternId}  [get,put,delete]
/apps/{appId}/versions/{versionId}/phraselists  [post,get]
/apps/{appId}/versions/{versionId}/phraselists/{phraselistId}  [get,put,delete]
/apps/{appId}/versions/{versionId}/prebuilts  [post,get]
/apps/{appId}/versions/{versionId}/prebuilts/{entityId}/roles  [get,post]
/apps/{appId}/versions/{versionId}/prebuilts/{entityId}/roles/{roleId}  [get,put,delete]
/apps/{appId}/versions/{versionId}/prebuilts/{prebuiltId}  [get,delete]
/apps/{appId}/versions/{versionId}/regexentities  [post,get]
/apps/{appId}/versions/{versionId}/regexentities/{entityId}/roles  [get,post]
/apps/{appId}/versions/{versionId}/regexentities/{entityId}/roles/{roleId}  [get,put,delete]
/apps/{appId}/versions/{versionId}/regexentities/{regexEntityId}  [delete,get,put]
/apps/{appId}/versions/{versionId}/suggest  [delete]
/apps/{appId}/versions/{versionId}/train  [post,get]
/externalKeys  [post,get]
/externalKeys/{externalKeyValue}  [delete]
/programmatickey  [put]
/subscriptions  [post,get,put]
/subscriptions/{subscriptionKey}  [delete]
/{appId}/versions/{versionId}/patternanyentities/{entityId}/explicitlist/{itemId}  [put]

*/
