import Theme from "./util/theme.js"

const key = "check-auto"

async function isAuto() {
  const result = await chrome.storage.local.get(key)
  return !!result[key]
}

chrome.runtime.onInstalled.addListener(async () => {
  await chrome.action.setBadgeText({ text: "OFF" })
})

chrome.action.onClicked.addListener(async (tab) => {
  await chrome.action.openPopup()
})

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  const isDark = await isAuto()
  if (isDark) {
    await Theme.setThemeDark(tab)
  }
})