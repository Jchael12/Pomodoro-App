//Timer Options
const pomodoroBtn = document.querySelector(".option--1");
const shortBreakBtn = document.querySelector(".option--2");
const longBreakBtn = document.querySelector(".option--3");
const options = Array.from(document.querySelectorAll(".option"));
const actions = Array.from(document.querySelectorAll(".action"));

//Timer Display
const timerDisplay = document.getElementById("timer-display");

//Timer Buttons
const startBtn = document.querySelector(".action--start");
const stopBtn = document.querySelector(".action--stop");
const resetBtn = document.querySelector(".action--reset");

let timerDown, clickable, activeClass;
let time = 25 * 60;
let current = "pomodoro";

const changeOptions = (arr) => {
	activeClass = arr === options ? "option--active" : "action--active";
	arr.forEach((el) => el.classList.remove(activeClass));
	return activeClass;
};

const newOption = (arr, active) => {
	changeOptions(arr);
	if (active !== resetBtn) active.classList.add(activeClass);
};

const startCountDown = () => {
	const countDown = () => {
		time--;
		const min = `${Math.trunc(time / 60)}`.padStart(2, 0);
		const sec = `${time % 60}`.padStart(2, 0);
		timerDisplay.textContent = `${min}:${sec}`;

		if (time === 0) {
			clearInterval(timerDown);
			timerDisplay.textContent = "00:00";
			checkTime();
		}
	};
	timerDown = setInterval(countDown, 1000);
	countDown();
	return timerDown;
};

const checkTime = () => {
	if (current === "pomodoro") {
		time = 25 * 60;
	}
	if (current === "short") {
		time = 5 * 60;
	}
	if (current === "long") {
		time = 15 * 60;
	}
};

const resetCountDown = () => {
	clickable = true;
	if (timerDown) clearInterval(timerDown);
	checkTime();
	if (current === "pomodoro") {
		timerDisplay.textContent = "25:00";
	}
	if (current === "short") {
		timerDisplay.textContent = "5:00";
	}
	if (current === "long") {
		timerDisplay.textContent = "15:00";
	}
};

clickable = true;
startBtn.addEventListener("click", () => {
	if (clickable) {
		changeOptions(actions, startBtn);
		startCountDown();
	}
	clickable = false;
});

stopBtn.addEventListener("click", () => {
	clickable = true;
	newOption(actions, stopBtn);
	if (timerDown) clearInterval(timerDown);
});

resetBtn.addEventListener("click", () => {
	resetCountDown();
	changeOptions(actions, resetBtn);
});

pomodoroBtn.addEventListener("click", () => {
	current = "pomodoro";
	resetCountDown();
	changeOptions(options, pomodoroBtn);
	newOption(actions);
});

shortBreakBtn.addEventListener("click", () => {
	current = "short";
	resetCountDown();
	changeOptions(options, shortBreakBtn);
	newOption(actions);
});

longBreakBtn.addEventListener("click", () => {
	current = "long";
	resetCountDown();
	changeOptions(options, longBreakBtn);
	newOption(actions);
});
