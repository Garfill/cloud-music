const STATE_PAUSE = 0
const STATE_PLAYING = 1
const timeReg = /\[(\d{2,})\:(\d{2})(?:\.(\d+))\]/g
class Lyric {
  constructor(lrc, handler = () => { }) {
    this.lrc = lrc;
    this.lines = [];
    this.handler = handler;
    this.state = STATE_PAUSE;

    this.currentLine = 0;
    this.startTimestamp = 0;

    this.timer = null;

    this.initLine()
  }

  initLine() {
    const lines = this.lrc.split('\n')
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i]
      const result = timeReg.exec(line)
      if (!result) continue;
      const txt = line.replace(timeReg, '').trim();
      if (result[3].length === 2) {
        result[3] = result[3] * 10
      }
      this.lines.push({
        txt,
        time: Number(result[1]) * 60 * 1000 + Number(result[2]) * 1000 + Number(result[3] || 0)
      })
    }
  }

  play(offset = 0, isSeek = false) {
    if (!this.lines.length) return;
    this.state = STATE_PLAYING;
    this.currentLine = this.findLine(offset);
    // 当前正在currentline - 1
    this.callHandler(this.currentLine - 1);
    this.startTimestamp = +new Date() - offset;
    if (this.currentLine < this.lines.length) {
      clearTimeout(this.timer)
      this.playRest(isSeek)
    }
  }

  findLine(time) {
    for (let i = 0; i < this.lines.length; i++) {
      if (time <= this.lines[i].time) {
        return i
      }
    }
    return this.lines.length - 1
  }

  callHandler(line) {
    if (line < 0) {
      return;
    }
    this.handler({
      lineNum: line,
      txt: this.lines[line].txt
    })
  }

  playRest(isSeek = false) {
    let line = this.lines[this.currentLine]
    let delay = 0;
    if (isSeek) {
      delay = line.time - (+new Date() - this.startTimestamp)
    } else {
      let preline = this.lines[this.currentLine - 1]
      let preTime = preline?.time || 0;
      delay = line.time - preTime;
    }
    this.timer = setTimeout(() => {
      this.callHandler(this.currentLine++)
      if (this.currentLine < this.lines.length && this.state == STATE_PLAYING) {
        this.playRest(isSeek)
      }
    }, delay);
  }

  togglePlay(offset) {
    if (this.state == STATE_PLAYING) {
      this.stop()
    } else {
      this.play(offset, true)
    }
  }

  stop() {
    this.state = STATE_PAUSE
    clearTimeout(this.timer)
  }

  seek(offset) {
    this.play(offset, true)
  }

  reset() {
    this.currentLine = 0;
    this.startTimestamp = 0;
    clearTimeout(this.timer)
    this.timer = null;
    this.callHandler(0)
  }
}

export default Lyric;