const fs = require("fs-promise");
const _ = require("underscore");
const path = require("path");

const basePath = "../luis-prebuilt-domains/PrebuiltModels/";
const languagePath = "en-us";

const domains = [
    "Calendar",
    "Communication",
    "Email",
    "HomeAutomation",
    "Note",
    "Places",
    "RestaurantReservation",
    "ToDo",
    "Utilities",
    "Weather",
    "Web"

];

const getDomainLanguagesPath = (base,domain)=>{
    let tempPath = base + domain + "/";
    return path.join(__dirname, tempPath);    
}

const getFileNameFromBits = (base,language,domain)=>{

    let tempPath="";

    // exception for ToDo
    if (domain=="ToDo"){
        tempPath = base + domain + "/" + language + "/latest/" + domain + "_basic_enus_official.json";
    } else {
        tempPath = base + domain + "/" + language + "/latest/" + domain + "_enus_official.json";
    }

    return path.join(__dirname, tempPath);
}

const saveMarkdownFile = (fileName,fileContents) => {
    fs.writeFileSync(fileName, fileContents)
}

const getSupportedLanguagesFromSubfolders = (path)=>{

    const fileObjects = fs.readdirSync(path, {withFileTypes: true});
     
    let supportedLanguages = "";

     if (fileObjects && fileObjects.length>0) {
        fileObjects.sort().map(element=>{
            const supportLanguage = "* " + element.name + "\n";
            element.isDirectory() ? supportedLanguages += (supportLanguage) : null; 
        });
     }
     return supportedLanguages + "\n";
}

const getFileContents = (path)=>{
    try{

        let tempStats = fs.statSync(path);
        return fs.readFileSync(path,"utf-8");
    } catch (err){
        console.log(err);
    }
}
const parseJSONFileContents = (luis_app)=>{
    let intents = luis_app.intents.map(intent => {
        return intent.name;
    });
    
    let entities = luis_app.entities.map(entity => {
        return entity.name;
    });
    
    let lists = luis_app.closedLists.map(entity => {
        return entity.name;
    });
    
    const composites = luis_app.composites.map(entity => {
        return entity.name;
    });
    
    const patternAny = luis_app.patternAnyEntities.map(entity => {
        return entity.name;
    });
    
    const prebuiltEntities = luis_app.prebuiltEntities.map(entity => {
        return entity.name;
    });
    
    const patterns = luis_app.patterns.map(pattern => {
        return pattern.name;
    });
    
    const utterances = luis_app.utterances.map(utterance => {
        return utterance.name;
    });

    let markdownFileContents ="";

    const printSection = (name, arr) => {
        markdownFileContents += `### ${name} \n\n`;
        printItems(arr);
    }

    const printItems = (arr) => {
        arr.forEach(element => {
            markdownFileContents += "* " + element + "\n";
        });
        markdownFileContents += "\n\n";
    }

   
    (intents.length>0) ? printSection("Intents", intents.sort()) : null;
    (entities.length>0) ? printSection("Entities", entities.sort()) : null;
    (lists.length>0) ? printSection("List entities", lists.sort()) : null;
    (composites.length>0) ? printSection("Composite entities", composites.sort()) : null;
    (patternAny.length>0) ? printSection("Pattern.Any entities",patternAny.sort()) : null;
    (prebuiltEntities.length>0) ? printSection("Prebuilt entities",prebuiltEntities.sort()) : null;

    return markdownFileContents;
}

const getDomainLanguages = (domainPath)=>{

}


domains.forEach(domainName => {

    const fileNameJSON = getFileNameFromBits(basePath,languagePath,domainName);
    const appJSON = JSON.parse(getFileContents(fileNameJSON));
    const markdownHeader = "## " + domainName + "\n\n";
    const markdownSupportedLanguages = "### Supported languages\n\n" + getSupportedLanguagesFromSubfolders(getDomainLanguagesPath(basePath, domainName));
    const markdownAppModel = parseJSONFileContents(appJSON);

    const markdownContents = markdownHeader + markdownSupportedLanguages + markdownAppModel

    const markdownFilePath = path.join(__dirname,"/out/" + domainName + ".md");
    saveMarkdownFile(markdownFilePath,markdownContents);
})
