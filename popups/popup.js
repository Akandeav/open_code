// gets opened github tabs
// the url is to match any repository, however
const github_tabs = await chrome.tabs.query({
    url: [
        "https://github.com/*/*"
    ]
})
let numOfActiveTabs = 0;


const template = document.getElementById("li_template");
const elements = new Set();
for (const tab of github_tabs){
    const element = template.content.firstElementChild.cloneNode(true);

    const title = tab.title.split("-")[0].trim();
    const pathname = new URL(tab.url).pathname;

    element.querySelector(".title").textContent = title
    element.querySelector(".pathname").textContent = pathname
    element.querySelector("a").addEventListener("click", async () => {
        // open the github repository path in vscode web
        chrome.tabs.create({
            url: "http://vscode.dev/github" + pathname
        });
    });

    elements.add(element)
    numOfActiveTabs += 1;
}
document.querySelector("ul").append(...elements);
document.getElementById("numOfOpenGithubTabs").innerHTML = numOfActiveTabs;
