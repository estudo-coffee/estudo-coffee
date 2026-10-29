(() => {
  const audio = document.getElementById('cafe-audio');
  const toggle = document.getElementById('cafe-audio-toggle');
  const stop = document.getElementById('cafe-audio-stop');
  const volume = document.getElementById('cafe-audio-volume');
  const status = document.getElementById('cafe-audio-status');
  if (!audio || !toggle || !stop || !volume || !status) return;
  let pending = false;
  let request = 0;
  audio.volume = Number(volume.value);
  const idle = (message = 'ボタンを押したときだけ再生します。') => {
    pending = false; toggle.textContent = '音楽を聴く';
    toggle.setAttribute('aria-pressed', 'false'); status.textContent = message;
  };
  const reset = () => {
    request++; audio.pause();
    try { audio.currentTime = 0; } catch (_) {}
    stop.disabled = true; idle('停止しました。次は曲の最初から再生します。');
  };
  toggle.addEventListener('click', () => {
    if (pending || !audio.paused) {
      request++; audio.pause(); idle('一時停止しました。'); return;
    }
    const token = ++request;
    pending = true; stop.disabled = false;
    toggle.textContent = '読み込み中… 停止';
    status.textContent = '音楽を読み込んでいます。';
    // play() is invoked directly from this click for mobile user-gesture policies.
    let playResult;
    try { playResult = audio.play(); }
    catch (_) { idle('再生できませんでした。端末の音声設定を確認し、もう一度お試しください。'); return; }
    Promise.resolve(playResult).then(() => {
      if (token !== request) { audio.pause(); return; }
      pending = false;
      if (!audio.paused) {
        toggle.textContent = '一時停止'; toggle.setAttribute('aria-pressed', 'true');
        status.textContent = 'Cozy Café Jazz を再生中。';
      }
    }).catch(() => {
      if (token === request) idle('再生できませんでした。端末の音声設定を確認し、もう一度お試しください。');
    });
  });
  stop.addEventListener('click', reset);
  volume.addEventListener('input', () => { audio.volume = Number(volume.value); });
  audio.addEventListener('ended', () => { request++; stop.disabled = true; idle('曲が終わりました。もう一度聴くときは再生ボタンを押してください。'); });
  audio.addEventListener('error', () => { request++; audio.pause(); stop.disabled = true; idle('音声を読み込めませんでした。接続を確認してお試しください。'); });
  audio.addEventListener('pause', () => { if (!pending && !audio.ended) idle('一時停止しました。'); });
  window.addEventListener('pagehide', reset);
})();
