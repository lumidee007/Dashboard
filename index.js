let getElement = (id_class) => document.querySelector(id_class)
let author = getElement('#author')
let imageText = JSON.parse(localStorage.getItem("imageText"))
let coinName = getElement('#coinName')
let coinImage = getElement('#coinImg')
let coinInfo = getElement('#coin-info')
let time = getElement('#time')
let greeting = getElement('#greeting')
let weather = getElement('#weather')
let settings = getElement('.setting')
let tabSettings = getElement('.setting-tab')
let cancelChange = getElement('.cancel-change')
let saveChange = getElement('.save-change')


imageText = !imageText ? localStorage.setItem("imageText", JSON.stringify('Nature')) : JSON.parse(localStorage.getItem("imageText"))

// Getting random images from unsplash
const getBgImage = async(text) => {
    try {
        const res = await fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=${text}`)
        const data = await res.json()
        let image = data.urls.regular
        document.body.style.backgroundImage = `url(${image})`
        author.textContent = `Image by: ${data.user.name}`

    } catch (err) {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1426604966848-d7adac402bff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjUwMDg0MTQ&ixlib=rb-1.2.1&q=80&w=1080)`
        author.textContent = "By: Famoochi"
    }
}
getBgImage(imageText)


// Coingecko API call 
fetch("https://api.coingecko.com/api/v3/coins/solana")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {

        coinName.textContent = `${data.name}`
        coinImage.setAttribute("src", `${data.image.small}`)

        coinInfo.innerHTML += `
            <p>Price: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `
    })
    .catch(err => console.error(err))


    // Getting current time.
function getCurrentTime() {
    const date = new Date()
    time.textContent = date.toLocaleTimeString("en-us", { timeStyle: "medium" })
}

(function greetings() {
    let d = new Date();
    let n = d.getHours();
    console.log("n = ", n)
    let welcome = n == 0 || n <= 11 ? "Good morning" : n == 12 || n <= 17 ? "Good afternoon" : n == 18 || n <= 22 ? "Good evening" : "Go to bed";
    greeting.textContent = welcome;
})();

setInterval(getCurrentTime, 1000)

// Getting the users location
navigator.geolocation.getCurrentPosition(pos => {
    let lat = pos.coords.latitude
    let long = pos.coords.longitude
    let pw = "ae8183305930109bde697b966d0122af"
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${pw}&units=imperial`
    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            let city = data.name
            let temp = Math.round(data.main.temp)
            let icon = data.weather[0].icon
            weather.innerHTML += `
                    <img src=https://openweathermap.org/img/wn/${icon}@2x.png class="weather">
                    <p class="temp">${temp}º</p>
                    <p class="city">${city}</p>
                `
        })
        .catch(e => console.error(e))
});


settings.addEventListener('click', () => tabSettings.style.display = "flex")

cancelChange.addEventListener('click', () => tabSettings.style.display = "none")

// Saving background image text to local storage
function saveSetting() {
    let inputText = document.getElementById('filter').value;
    if (inputText) {
        localStorage.setItem("imageText", JSON.stringify(inputText))
        imageText = JSON.parse(localStorage.getItem("imageText"))
        document.getElementById('filter').value = ''

        getBgImage(imageText)
    }
    tabSettings.style.display = "none"
}
saveChange.addEventListener('click', saveSetting)


document.addEventListener('keyup', (e) => e.key === 'Enter' ? saveSetting() : null)
