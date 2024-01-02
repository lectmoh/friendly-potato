export default class Log {

  static style = "color: #ffffff;border-radius: .5rem;padding: 0 .25rem;"
  static infoStyle = this.style + "background: #7367f0;"
  static warnStyle = this.style + "background: #413c26;"
  static errorStyle = this.style + "background: #4e3534;"

  static _texts(texts) {
    return typeof texts === "string" ? texts : texts.join(" ")
  }

  static info(...texts) {
    console.log(`%cinfo`, this.infoStyle, this._texts(texts))
  }

  static warn(...texts) {
    if (texts instanceof String)
    console.warn(`%cwarn`, this.warnStyle, this._texts(texts))
  }

  static error(...texts) {
    console.error(`%error`, this.errorStyle, this._texts(texts))
  }

}