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

document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.getElementById("theme-btn");
    const hideBtn = document.querySelector("#hide-btn");
    const playlistSection = document.querySelector("#playlist-section");
    const formInputs = document.querySelectorAll("#track-form input");

    if (!themeBtn || !hideBtn || !playlistSection || formInputs.length === 0) {
        console.error("Критическая ошибка: Не найдены необходимые элементы DOM на странице!");
        return;
    }

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
    }

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        if (document.body.classList.contains("light-theme")) {
            localStorage.setItem("theme", "light");
        } 
        else {
            localStorage.setItem("theme", "dark");
        }
    });

    const isPlaylistHidden = localStorage.getItem("playlistHidden");

    if (isPlaylistHidden === "true") {
        playlistSection.classList.add("hidden");
    }

    hideBtn.addEventListener("click", () => {
        playlistSection.classList.toggle("hidden");
        if (playlistSection.classList.contains("hidden")) {
            localStorage.setItem("playlistHidden", "true");
        } 
        else {
            localStorage.setItem("playlistHidden", "false");
        }
    });

    const trackForm = document.getElementById("track-form");
    const trackNameInput = document.getElementById("track-name");
    const trackDurationInput = document.getElementById("track-duration");
    const playlistContainer = document.getElementById("playlist-container");
    const clearBtn = document.getElementById("clear-btn");

    if (!trackForm || !trackNameInput || !trackDurationInput || !playlistContainer || !clearBtn) {
        console.error("Ошибка: Не найдены элементы формы или контейнера плейлиста!");
        return;
    }

    let playlistData = [];
    const savedPlaylist = localStorage.getItem("playlist");

    if (savedPlaylist) {
        try {
            playlistData = JSON.parse(savedPlaylist);
        } 
        catch (error) {
            console.error("Ошибка чтения данных плейлиста:", error);
            playlistData = [];
        }
    }

    function savePlaylistToStorage() {
        localStorage.setItem("playlist", JSON.stringify(playlistData));
    }

    function renderPlaylist() {
        playlistContainer.innerHTML = "";
        playlistData.forEach((track) => {
            const li = document.createElement("li");
            li.className = "track-item";
            const span = document.createElement("span");
            span.textContent = `${track.name} — ${track.duration}`;
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = track.favorite;
            checkbox.addEventListener("change", () => {
                track.favorite = checkbox.checked;
                savePlaylistToStorage();
            });
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Удалить";
            deleteBtn.addEventListener("click", () => {
                playlistData = playlistData.filter(t => t !== track); 
                savePlaylistToStorage();
                renderPlaylist();
            });
            li.appendChild(span);
            li.appendChild(checkbox);
            li.appendChild(deleteBtn);
            playlistContainer.appendChild(li);
        });
    }

    trackForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = trackNameInput.value.trim();
        const duration = trackDurationInput.value.trim();
        if (name === "" || duration === "") {
            alert("Пожалуйста, заполните название и длительность!");
            return;
        }
        playlistData.push({
            name: name,
            duration: duration,
            favorite: false
        });

        savePlaylistToStorage();
        renderPlaylist();
        trackForm.reset();
    });

    clearBtn.addEventListener("click", () => {
        if (confirm("Вы уверены, что хотите удалить все треки?")) {
            playlistData = [];
            savePlaylistToStorage();
            renderPlaylist();
        }
    });

    renderPlaylist();
});