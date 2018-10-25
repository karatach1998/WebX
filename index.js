
const BoardStarSwitcher = class {
    constructor() {
        var btn = this.btn = document.getElementById('startBtn');
        btn.starred = true;
        btn.onclick = function () {
            if (btn.starred) {
                btn.style.color = "white";
                btn.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
                btn.starred = false;
                console.log('Un star.');
            } else {
                btn.style.color = "yellow";
                btn.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
                btn.starred = true;
                console.log('Star.');
            }
        }
    }
};


console.log('--- Starting ---');
var boardStarSwitcher = new BoardStarSwitcher();