// Ví dụ logic đếm ngược đơn giản
function startCountdown(durationInSeconds) {
    let timer = durationInSeconds;
    const secDisplay = document.getElementById('sec');
    const minDisplay = document.getElementById('min');

    setInterval(() => {
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);

        minDisplay.textContent = minutes < 10 ? "0" + minutes : minutes;
        secDisplay.textContent = seconds < 10 ? "0" + seconds : seconds;

        if (--timer < 0) {
            timer = 0;
        }
    }, 1000);
}

// Chạy thử với 3600 giây (1 giờ)
window.onload = () => {
    startCountdown(3600);
};