; (function () {
    const date = new Date("Jun 3, 2022 08:00:00").getTime();

    const countdownDayOne = document.querySelector(".countdown .countdown--day-1");
    const countdownDayTwo = document.querySelector(".countdown .countdown--day-2");

    const countdownHoursOne = document.querySelector(".countdown .countdown--hour-1");
    const countdownHoursTwo = document.querySelector(".countdown .countdown--hour-2");

    const countdownMinuteOne = document.querySelector(".countdown .countdown--minute-1");
    const countdownMinuteTwo = document.querySelector(".countdown .countdown--minute-2");

    const countdownSecondOne = document.querySelector(".countdown .countdown--second-1");
    const countdownSecondTwo = document.querySelector(".countdown .countdown--second-2");

    function setCountdown() {
        const now = new Date().getTime();
        const delta = date - now;

        const countdownCompleted = delta < 0;
        if (countdownCompleted) {
            countdownDayOne.dataset.number = 0;
            countdownDayTwo.dataset.number = 0;

            countdownHoursOne.dataset.number = 0;
            countdownHoursTwo.dataset.number = 0;

            countdownMinuteOne.dataset.number = 0;
            countdownMinuteTwo.dataset.number = 0;

            countdownSecondOne.dataset.number = 0;
            countdownSecondTwo.dataset.number = 0;

            clearInterval(setCountdown);

        } else {
            const days = Math.floor(delta / (1000 * 60 * 60 * 24))
                .toString()
                .padStart(2, "0");

            countdownDayOne.dataset.number = days[0];
            countdownDayTwo.dataset.number = days[1];

            const hours = Math.floor(
                (delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )
                .toString()
                .padStart(2, "0");

            countdownHoursOne.dataset.number = hours[0];
            countdownHoursTwo.dataset.number = hours[1];

            const minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60))
                .toString()
                .padStart(2, "0");

            countdownMinuteOne.dataset.number = minutes[0];
            countdownMinuteTwo.dataset.number = minutes[1];

            const seconds = Math.floor((delta % (1000 * 60)) / 1000)
                .toString()
                .padStart(2, "0");

            countdownSecondOne.dataset.number = seconds[0];
            countdownSecondTwo.dataset.number = seconds[1];
        }
    }

    setCountdown();
    setInterval(setCountdown, 1000);

    const bodyEl = document.querySelector("body");

    bodyEl.addEventListener("click", (ev) => {
        const target = ev.target;
        if (!target.matches(".tab")) {
            return;
        }

        const tabs = target.closest(".tabs");
        const tabPanelsIds = [...tabs.querySelectorAll(".tab")].map((x) =>
            x.getAttribute("aria-controls")
        );

        const index = target.getAttribute("aria-controls").replace("tab-", "");
        target.closest(".pixel-border").dataset.pixelBorderTheme = index;

        tabs.querySelectorAll(".tab").forEach((x) => {
            x.classList.remove("tab--active");
            x.ariaSelected = "false";
        });

        tabPanelsIds.forEach((x) => {
            document.getElementById(x).hidden = true;
        });

        target.classList.add("tab--active");
        target.ariaSelected = "true";
        document.getElementById(
            target.getAttribute("aria-controls")
        ).hidden = false;
    });
})();