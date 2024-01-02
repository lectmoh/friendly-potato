export default class Theme {

  static isDark = false

  static async setThemeDark(tab, toDark = true) {
    if (this.isTabInvalid(tab)) return false

    const tabId = tab.id
    await chrome.action.setBadgeText({
      tabId,
      text: toDark ? "ON" : "OFF"
    })

    await this._removeCSS(tabId)
    toDark && await this._insertCSS(tabId)

    this.isDark = toDark
    await chrome.action.setBadgeText({ text: toDark ? "ON" : "OFF" })

    return true
  }

  static async toggleTheme(tab) {
    if (this.isTabInvalid(tab)) return false

    const state = await chrome.action.getBadgeText({ tabId: tab.id })
    const toDark = state !== "ON"

    await this.setThemeDark(tab.id, toDark)

    return true
  }

  static isTabInvalid(tab) {
    return !tab.url || tab.url.startsWith("chrome")
  }

  static isTabLoading(tab, info) {
    return tab && info.status === "loading"
  }

  static async _insertCSS(tabId) {
    await chrome.scripting.insertCSS({
      files: ["style.css"],
      target: { tabId, allFrames: true }
    })
  }

  static async _removeCSS(tabId) {
    await chrome.scripting.removeCSS({
      files: ["style.css"],
      target: { tabId, allFrames: true }
    })
  }

}