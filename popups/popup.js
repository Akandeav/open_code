let numOfActiveGithubTabs = 0;
// what displays in the paragraph tag that shows how many github
// tabs are active
let tabStatusElementInner = ""; 

// gets opened github tabs
// the url is to match any repository
const githubTabs = await chrome.tabs.query({
    url: [
        "https://github.com/*/*"
    ]
})

const template = document.getElementById("li_template");
const elements = new Set();
for (const tab of githubTabs){
    const element = template.content.firstElementChild.cloneNode(true);

    const title = tab.title.split("-")[0].trim().split("/")[1];
    const pathname = new URL(tab.url).pathname;
    element.querySelector(".title").textContent = title
    element.querySelector(".pathname").textContent = pathname
    element.querySelector("a").addEventListener(
        "click", async () => {
            // open the github repository path in vscode web
            chrome.tabs.create({
                url: "https://vscode.dev/github" + pathname
            });
    });

    elements.add(element)
    numOfActiveGithubTabs += 1;
}
document.querySelector("ul").append(...elements);

numOfActiveGithubTabs > 0 ?
    tabStatusElementInner = numOfActiveGithubTabs + " active github repo(s)"
    : tabStatusElementInner = "No active github repository";

document.getElementById( "numOfOpenGithubTabs").innerHTML = tabStatusElementInner