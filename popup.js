let timerInterval;
let remainingTime = 0;

// 更新顯示的時間
function updateDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  document.getElementById('display').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 開始計時
function startTimer() {
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;
  remainingTime = minutes * 60 + seconds;

  if (remainingTime > 0) {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
        updateDisplay();
      } else {
        clearInterval(timerInterval);
        alert('Time is up!');
      }
    }, 1000);

    // 保存狀態到 Chrome storage
    chrome.storage.local.set({ remainingTime });
  }
}

// 重置計時器
function resetTimer() {
  clearInterval(timerInterval);
  remainingTime = 0;
  updateDisplay();
  chrome.storage.local.remove('remainingTime');
}

// 恢復之前的計時器狀態
chrome.storage.local.get('remainingTime', (result) => {
  if (result.remainingTime) {
    remainingTime = result.remainingTime;
    updateDisplay();
    startTimer();
  }
});

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('reset').addEventListener('click', resetTimer);