import Theme from "../util/theme.js"

chrome.tabs.query({
  currentWindow: true,
  active: true
}, async function(tabs) {
  const tab = tabs[0]

  const key = "check-auto"
  const result = await chrome.storage.local.get(key)
  const isAuto = !!result[key]

  const check = {
    auto: document.getElementById("check-auto"),
    dark: document.getElementById("check-dark")
  }

  check.auto.checked = isAuto
  check.auto.onclick = function() {
    chrome.storage.local.set({ [key]: check.auto.checked })
  }

  check.dark.checked = // TODO
  check.dark.onclick = async function() {
    const result = await Theme.setThemeDark(tab, check.dark.checked)
    if (!result) {
      alert("지원하지 않는 페이지입니다.")
      check.dark.checked = !check.dark.checked
      return
    }
    await chrome.storage.local.set({ [keys[1]]: check.dark.checked })
  }
})

