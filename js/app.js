
// Лабораторная работа №5
// Компонент №1 — Счётчик кликов

const counterValue = document.getElementById("counter-value");

if (counterValue) {
    let count = 0;

    const plusButton = document.getElementById("counter-plus");
    const minusButton = document.getElementById("counter-minus");
    const resetButton = document.getElementById("counter-reset");

    function updateCounter() {
        counterValue.textContent = count;
    }

    plusButton.addEventListener("click", function () {
        count++;
        updateCounter();
    });

    minusButton.addEventListener("click", function () {
        count--;
        updateCounter();
    });

    resetButton.addEventListener("click", function () {
        count = 0;
        updateCounter();
    });
}



// ==========================================
// Компонент №2 — Переключатель темы
// ==========================================

const themeButton = document.getElementById("theme-toggle");

if (themeButton) {
    const themeIcon = document.getElementById("theme-icon");
    const themeTitle = document.getElementById("theme-title");
    const themeDescription = document.getElementById("theme-description");

    // Получаем сохранённую тему
    const savedTheme = localStorage.getItem("lab5-theme");

    // Устанавливаем тему при загрузке страницы
    if (savedTheme === "dark") {
        applyTheme("dark");
    } else {
        applyTheme("light");
    }

    // Изменение темы по нажатию кнопки
    themeButton.addEventListener("click", function () {
        const isDark = document.body.classList.contains("dark-theme");

        const newTheme = isDark ? "light" : "dark";

        applyTheme(newTheme);

        // Сохраняем выбор пользователя
        localStorage.setItem("lab5-theme", newTheme);
    });

    // Функция применения темы
    function applyTheme(theme) {
        if (theme === "dark") {
            document.body.classList.add("dark-theme");

            themeIcon.textContent = "🌙";
            themeTitle.textContent = "Тёмная тема";
            themeDescription.textContent =
                "Сейчас используется тёмное оформление.";

            themeButton.textContent = "☀️ Включить светлую тему";
            themeButton.setAttribute("aria-pressed", "true");
        } else {
            document.body.classList.remove("dark-theme");

            themeIcon.textContent = "☀️";
            themeTitle.textContent = "Светлая тема";
            themeDescription.textContent =
                "Сейчас используется светлое оформление.";

            themeButton.textContent = "🌙 Включить тёмную тему";
            themeButton.setAttribute("aria-pressed", "false");
        }
    }
}



// ==========================================
// Компонент №4 — Калькулятор
// ==========================================

const calcResult = document.getElementById("calc-result");

if (calcResult) {
    const firstInput = document.getElementById("calc-first");
    const secondInput = document.getElementById("calc-second");
    const operationButtons =
        document.querySelectorAll("[data-calc-operation]");
    const clearButton = document.getElementById("calc-clear");

    operationButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            // Проверяем, заполнены ли поля
            if (firstInput.value.trim() === "" ||
                secondInput.value.trim() === "") {
                calcResult.textContent = "Введите оба числа";
                return;
            }

            const a = Number(firstInput.value);
            const b = Number(secondInput.value);
            const operation = button.dataset.calcOperation;

            let result;

            switch (operation) {
                case "add":
                    result = a + b;
                    break;

                case "subtract":
                    result = a - b;
                    break;

                case "multiply":
                    result = a * b;
                    break;

                case "divide":
                    if (b === 0) {
                        calcResult.textContent =
                            "На ноль делить нельзя";
                        return;
                    }

                    result = a / b;
                    break;

                default:
                    return;
            }

            // Округляем результат, чтобы избежать длинных дробей
            calcResult.textContent =
                String(Number(result.toFixed(10)));
        });
    });

    // Очистка калькулятора
    clearButton.addEventListener("click", function () {
        firstInput.value = "";
        secondInput.value = "";
        calcResult.textContent = "—";
        firstInput.focus();
    });
}




// ==========================================
// Компонент №6 — Модальное окно
// ==========================================

const modal = document.getElementById("demo-modal");

if (modal) {
    const openButton = document.getElementById("modal-open");
    const closeCross = document.getElementById("modal-close-cross");
    const closeButton = document.getElementById("modal-close-button");

    // Открытие модального окна
    openButton.addEventListener("click", function () {
        modal.showModal();
    });

    // Закрытие по крестику
    closeCross.addEventListener("click", function () {
        modal.close();
    });

    // Закрытие по кнопке
    closeButton.addEventListener("click", function () {
        modal.close();
    });

    // Закрытие при нажатии на затемнённую область
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            const rect = modal.getBoundingClientRect();

            const clickedInside =
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom;

            if (!clickedInside) {
                modal.close();
            }
        }
    });

    // Клавишу Escape обрабатывает сам элемент dialog
}




// ==========================================
// Компонент №9 — Валидация формы
// ==========================================

const validationForm = document.getElementById("validation-form");

if (validationForm) {
    const nameInput = document.getElementById("form-name");
    const emailInput = document.getElementById("form-email");
    const passwordInput = document.getElementById("form-password");
    const confirmInput = document.getElementById("form-confirm");
    const formMessage = document.getElementById("form-message");

    function setFieldResult(input, errorId, message) {
        const errorElement = document.getElementById(errorId);

        errorElement.textContent = message;
        input.classList.toggle("input-invalid", message !== "");
        input.classList.toggle("input-valid", message === "");

        return message === "";
    }

    validationForm.addEventListener("submit", function (event) {
        // Предотвращаем отправку формы и перезагрузку страницы
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirm = confirmInput.value;

        let isValid = true;

        // Проверка имени
        if (name.length < 2) {
            isValid = setFieldResult(
                nameInput, "name-error",
                "Имя должно содержать минимум 2 символа."
            ) && isValid;
        } else {
            setFieldResult(nameInput, "name-error", "");
        }

        // Проверка электронной почты
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            isValid = setFieldResult(
                emailInput, "email-error",
                "Введите корректный адрес электронной почты."
            ) && isValid;
        } else {
            setFieldResult(emailInput, "email-error", "");
        }

        // Проверка пароля
        if (password.length < 8) {
            isValid = setFieldResult(
                passwordInput, "password-error",
                "Пароль должен содержать минимум 8 символов."
            ) && isValid;
        } else {
            setFieldResult(passwordInput, "password-error", "");
        }

        // Проверка подтверждения пароля
        if (confirm !== password || confirm === "") {
            isValid = setFieldResult(
                confirmInput, "confirm-error",
                "Пароли не совпадают."
            ) && isValid;
        } else {
            setFieldResult(confirmInput, "confirm-error", "");
        }

        if (isValid) {
            formMessage.textContent =
                "Данные успешно проверены! Ошибок нет.";
            formMessage.className = "form-message success";
        } else {
            formMessage.textContent =
                "Исправьте ошибки в отмеченных полях.";
            formMessage.className = "form-message failure";
        }
    });
}




// ==========================================
// Компонент №13 — Прогресс-бар
// ==========================================

const progressFill = document.getElementById("progress-fill");

if (progressFill) {
    const progressValue = document.getElementById("progress-value");
    const progressStatus = document.getElementById("progress-status");
    const progressTrack = document.getElementById("progress-track");

    const plusButton = document.getElementById("progress-plus");
    const minusButton = document.getElementById("progress-minus");
    const randomButton = document.getElementById("progress-random");
    const resetButton = document.getElementById("progress-reset");

    let progress = 0;

    function updateProgress() {
        // Ограничиваем значение от 0 до 100
        progress = Math.max(0, Math.min(100, progress));

        progressFill.style.width = progress + "%";
        progressValue.textContent = progress + "%";

        progressTrack.setAttribute("aria-valuenow", progress);

        progressFill.classList.toggle("completed", progress === 100);

        if (progress === 0) {
            progressStatus.textContent = "Задача ещё не начата.";
        } else if (progress === 100) {
            progressStatus.textContent = "Задача выполнена!";
        } else {
            progressStatus.textContent = "Задача выполняется...";
        }
    }

    plusButton.addEventListener("click", function () {
        progress += 10;
        updateProgress();
    });

    minusButton.addEventListener("click", function () {
        progress -= 10;
        updateProgress();
    });

    randomButton.addEventListener("click", function () {
        progress = Math.floor(Math.random() * 101);
        updateProgress();
    });

    resetButton.addEventListener("click", function () {
        progress = 0;
        updateProgress();
    });

    updateProgress();
}




// ==========================================
// Компонент №15 — Показать/скрыть пароль
// ==========================================

const passwordInput = document.getElementById("demo-password");

if (passwordInput) {
    const toggleButton = document.getElementById("password-toggle");
    const clearButton = document.getElementById("password-clear");
    const passwordStatus = document.getElementById("password-status");

    // Переключение видимости пароля
    toggleButton.addEventListener("click", function () {
        const isHidden = passwordInput.type === "password";

        if (isHidden) {
            passwordInput.type = "text";
            toggleButton.textContent = "Скрыть";
            toggleButton.setAttribute("aria-label", "Скрыть пароль");
            toggleButton.setAttribute("aria-pressed", "true");
            passwordStatus.textContent = "Пароль отображается.";
        } else {
            passwordInput.type = "password";
            toggleButton.textContent = "Показать";
            toggleButton.setAttribute("aria-label", "Показать пароль");
            toggleButton.setAttribute("aria-pressed", "false");
            passwordStatus.textContent = "Пароль скрыт.";
        }
    });

    // Очистка поля
    clearButton.addEventListener("click", function () {
        passwordInput.value = "";
        passwordInput.type = "password";

        toggleButton.textContent = "Показать";
        toggleButton.setAttribute("aria-label", "Показать пароль");
        toggleButton.setAttribute("aria-pressed", "false");

        passwordStatus.textContent = "Пароль скрыт.";
        passwordInput.focus();
    });
}
