const getBgImage = async () => {
    
    try {
        const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
        const data = await res.json()
        let image = data.urls.regular
        console.log(image)
        document.body.style.backgroundImage = `url(${image})`
        document.getElementById("author").textContent = `By: ${data.user.name}`
//         document.getElementById("author").textContent = "By: Oluwafemi Ayinla"
        
    } 
    catch (err) {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1426604966848-d7adac402bff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjUwMDg0MTQ&ixlib=rb-1.2.1&q=80&w=1080)`
        document.getElementById("author").textContent = "By: Oluwafemi Midemi"
    }
}
getBgImage()

fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {

        document.getElementById("coinName").textContent = `${data.name}`
        document.getElementById("coinImg").setAttribute("src", `${data.image.small}`)
        
        document.getElementById("coin-info").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `
    })
    .catch(err => console.error(err))


    function getCurrentTime() {
        const date = new Date()
        document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "medium"})
    }
    
    setInterval(getCurrentTime, 1000)



    navigator.geolocation.getCurrentPosition(pos => {
        let lat =pos.coords.latitude
        let long = pos.coords.longitude
        let pw = ""
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
                document.getElementById("weather").innerHTML += `
                    <img src=https://openweathermap.org/img/wn/${icon}@2x.png class="weather">
                    <p class="temp">${temp}º</p>
                    <p class="city">${city}</p>
                `
            })
            .catch (e => console.error(e)) 
    });
