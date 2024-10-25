function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    }
    
function getLocality(latitude, longitude, coordNum) {
   const Mapdata = fetch (`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        .then((res) => res.json())
        .then((resJson) => {
            console.log("Response JSON:", resJson)
            document.getElementById(coordNum).innerText += `  Latitude: ${latitude}, Longitude: ${longitude} 

            Locality: ${resJson.locality}`;      
    })
}

window.onload = function() {
    const map = L.map("Map").setView([37.0902, -95.7129], 4);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,

        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const coordNums = [
        {latitude: getRandomInRange(30, 35, 3),
        longitude: getRandomInRange(-90, -100, 3)},

        {latitude: getRandomInRange(30, 35, 3),
        longitude: getRandomInRange(-90, -100, 3)},

        {latitude: getRandomInRange(30, 35, 3),
        longitude: getRandomInRange(-90, -100, 3)}];

        coordNums.forEach((Coord, index) => {
            const maker = L.marker([Coord.latitude, Coord.longitude]).addTo(map)

            const coordNum = `Coords${index + 1}`;
            getLocality(Coord.latitude, Coord.longitude, coordNum);
        });

        const Mapbalance = L.latLngBounds(coordNums.map(Coord => [Coord.latitude, Coord.longitude]));
}








