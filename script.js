const form = document.querySelector(".form");
const nameInput = document.querySelector("#name");
const ownersNameInput = document.querySelector("#ownersName");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const agreeInput = document.querySelector("#agree");
const congratulation = document.querySelector("#congratulation");
const success = document.querySelector(".message--success");
const failure = document.querySelector("#failure");
const fail = document.querySelector(".message--fail");
const catsBtn = document.querySelector("#cats-btn");
const allCatsContainer = document.querySelector("#cats");
const lastCatBtn = document.querySelector("#last-cat-btn");
const lastCatName = document.querySelector("#last-cat-name");

form.addEventListener("submit", (event) => {
    // Предотвращает действие браузера по умолчанию. В данном случае — отправку формы
    // https://learn.javascript.ru/default-browser-action
    event.preventDefault();

    // Здесь твой код
    catsName = nameInput.value;
    ownersName = ownersNameInput.value;
    ownersEmail = emailInput.value;
    ownersPhone = phoneInput.value;
    ownersAgree = true;


    fetch(`http://46.21.248.81:3001/user`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer: dora'
            },
            body: JSON.stringify({
                "name": catsName,
                "secondName": ownersName,
                "phone": ownersPhone,
                "email": ownersEmail,
                "agree": ownersAgree
            })
        })
        .then((result) => result.json())
        .then(() => {
            congratulation.classList.remove("hidden");
            success.textContent = `${ownersName}, твоя анкета отправлена!`;
            form.reset();
        })
        .catch(() => {
            failure.classList.remove("hidden");
            fail.textContent = `Произошла ошибка :(`;
            form.reset();
        });

    allCatsContainer.classList.remove("show");
    lastCatName.classList.remove("show");
});

document.addEventListener("click", (e) => {
    if (!e.target.className.includes("message")) {
        congratulation.classList.add("hidden");
        failure.classList.add("hidden");
    }
})

catsBtn.addEventListener("click", function() {
    fetch('http://46.21.248.81:3001/my-users', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer: dora'
            }
        })
        .then((result) => {
            return result.json();
        })
        .then((cats) => {
            cats.forEach((cat) => {
                const item = document.createElement("li");
                item.textContent = `${cat.name}`;
                allCatsContainer.append(item);
            })
        });

    allCatsContainer.classList.toggle("show");
    allCatsContainer.textContent = "";
})

lastCatBtn.addEventListener("click", function() {
    fetch('http://46.21.248.81:3001/last-user', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer: dora'
            }
        })
        .then((result) => {
            return result.json();
        })
        .then((cat) => {
            if (cat.name === undefined) {
                return lastCatName.textContent = `Тут не было котиков`;
            } else {
                return lastCatName.textContent = `${cat.name}`;
            }
        })

    lastCatName.classList.toggle("show");
    lastCatName.textContent = "";
});