function Timer(minute = 0, renderElementSelector = '[data-show-timer]', countdownSoundSelector = '[data-countdown-sound]') {
  this.minute = minute;
  this.started = false;
  this._remainingMs = minute * 60 * 1000;
  this._endTime = null;

  this.timeInSeconds = () => Math.ceil(this._remainingMs / 1000);

  this.setMinutes = (minute) => {
    this.minute = minute;
    this._remainingMs = minute * 60 * 1000;
    this._endTime = null;
    this.stop();
    this.render();
  }

  this.toggle = () => { this.started ? this.stop() : this.start(); }

  this.start = () => {
    this.started = true;
    this._endTime = Date.now() + this._remainingMs;

    this.interval = setInterval(() => {
      this._remainingMs = Math.max(0, this._endTime - Date.now());

      this.countSoundPlayer(this.timeInSeconds() <= 4 && this.timeInSeconds() > 0);
      this.render();

      if (this._remainingMs <= 0) {
        this.started = false;
        clearInterval(this.interval);
        if (typeof this.onEnd === 'function') this.onEnd();
      }
    }, 100);
  }

  this.stop = () => {
    this.started = false;
    if (this._endTime !== null) {
      this._remainingMs = Math.max(0, this._endTime - Date.now());
      this._endTime = null;
    }
    this.countSoundPlayer(false);
    clearInterval(this.interval);
  }

  this.reset = () => {
    this._remainingMs = 0;
    this._endTime = null;
    this.render();
  }

  this.timer_format = () => {
    const total = this.timeInSeconds();
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  this.render = () => {
    const element = document.querySelector(renderElementSelector);
    if (element) { element.innerHTML = this.timer_format(); }
  }

  this.countSoundPlayer = (play = true) => {
    const audioPlayer = document.querySelector(countdownSoundSelector);
    if (play) {
      audioPlayer.paused && audioPlayer.play();
    } else {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }
  }
}
