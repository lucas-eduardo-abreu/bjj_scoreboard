# bjj_scoreboard

Browser-based scoreboard for Brazilian Jiu-Jitsu competitions. No server, no
dependencies — open `index.html` and it works.

## Features

- Configurable match duration (slider, in minutes)
- Countdown timer with audio alert in the final 3 seconds
- Per-athlete score tracking:
  - Points (normal, mount +4, guard pass +3, takedown +2)
  - Advantages
  - Penalties
- Match reset without page reload
- Configuration modal to set athlete names before the match

## Stack

Vanilla HTML, CSS, and JavaScript. No build step, no package manager.

## Running

```bash
git clone https://github.com/lucas-eduardo-abreu/bjj_scoreboard.git
open bjj_scoreboard/index.html   # macOS
# or just double-click index.html on Windows/Linux
```

Works offline. No installation required.
