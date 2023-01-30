async function getCurrentTab(){
    // getCurrentTab()
    //
    // gets the currently-focused window or most recently-focused window
    // if no chrome windows are focused. it returns a tab instance or undefined
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions)
    return tab;
}
// gets opened github tabs
const github_tabs = await chrome.tabs.query({
    url: [
        "https://*.github.com/*"
    ]
})
const current_tab = getCurrentTab()
const current_url = current_tab.url

document.getElementById("numOpenGithubTabs").innerHTML = github_tabs.length()

