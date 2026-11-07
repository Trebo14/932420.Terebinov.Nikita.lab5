let userName = prompt("Введите ваше имя:", "Гость");
if (userName === null || userName === "")
    userName = "Гость";

alert("Привет, " + userName + "! Добро пожаловать на страницу музыканта и звукорежиссёра.");
console.log("Пользователь " + userName + " зашёл на страницу");

const trackVolumes = [70, 85, 110, 65, 92, 75, 105]; 

function findMaxVolume(volumes) {
    let max = volumes[0];
    for (let v of volumes) {
        if (v > max)
            max = v;
    }
    return max;
}

function filterLoudTracks(volumes, threshold) {
    let result = [];
    for (let v of volumes) {
        if (v > threshold)
            result.push(v);
    }
    return result;
}

function calculateSum(volumes) {
    let sum = 0;
    for (let v of volumes)
        sum += v;
    return sum;
}

function analyzeQuietTracks(volumes) {
    let count = 0;
    let sum = 0;
    for (let v of volumes) {
        if (v <= 75) {
            count++;
            sum += v;
        }
    }
    
    return { 
        count: count, 
        average: count > 0 ? sum / count : 0
    };
}

const maxVol = findMaxVolume(trackVolumes);
const loudTracks = filterLoudTracks(trackVolumes, 90);
const sum = calculateSum(trackVolumes);
const averageVolume = sum / trackVolumes.length;
const quietStats = analyzeQuietTracks(trackVolumes);

alert("Средняя громкость – " + averageVolume.toFixed(1) + " дБ, " + loudTracks.length + " треков – громкие");

console.log("Количество тихих треков – " + quietStats.count);
console.log("Средняя громкость тихих треков – " + quietStats.average.toFixed(1) + " дБ");

if (maxVol >= 105) {
    console.log("Такая громкость может повредить слух – используйте наушники с ограничением");
}

