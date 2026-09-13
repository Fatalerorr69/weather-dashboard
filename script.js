class WeatherDashboard {
    constructor() {
        this.apiKey = ''; // Users need to add their own API key
        this.currentCity = null;
        this.favorites = [];
        this.storageKey = 'weatherDashboardFavorites';
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
        this.unit = 'metric'; // celsius

        // DOM elements
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.locationBtn = document.getElementById('locationBtn');
        this.currentWeatherDiv = document.getElementById('currentWeather');
        this.forecastGrid = document.getElementById('forecastGrid');
        this.favoritesGrid = document.getElementById('favoritesGrid');
        this.favoritesSection = document.getElementById('favoritesSection');
        this.errorAlert = document.getElementById('errorAlert');
        this.loadingAlert = document.getElementById('loadingAlert');

        this.init();
    }

    init() {
        // Prompt user for API key if not set
        this.setupApiKey();
        this.loadFavorites();
        this.setupEventListeners();

        // Try to get user's location
        this.getUserLocation();
    }

    setupApiKey() {
        const stored = localStorage.getItem('weatherApiKey');
        if (stored) {
            this.apiKey = stored;
        } else {
            const key = prompt(
                'Please enter your OpenWeatherMap API key:\n\n' +
                'Get a free key at: https://openweathermap.org/api\n\n' +
                '(This will be saved locally in your browser)'
            );
            if (key) {
                this.apiKey = key;
                localStorage.setItem('weatherApiKey', key);
            } else {
                this.showError('API key is required to use this app');
            }
        }
    }

    setupEventListeners() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        this.locationBtn.addEventListener('click', () => this.getUserLocation());
    }

    handleSearch() {
        const city = this.searchInput.value.trim();
        if (!city) {
            this.showError('Please enter a city name');
            return;
        }
        this.fetchWeatherByCity(city);
        this.searchInput.value = '';
    }

    getUserLocation() {
        this.showLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    this.fetchWeatherByCoordinates(latitude, longitude);
                },
                (error) => {
                    this.showLoading(false);
                    this.showError('Unable to get your location. Please search for a city.');
                    console.error(error);
                }
            );
        } else {
            this.showLoading(false);
            this.showError('Geolocation is not supported. Please search for a city.');
        }
    }

    async fetchWeatherByCity(city) {
        try {
            this.showLoading(true);
            const response = await fetch(
                `${this.baseUrl}/weather?q=${city}&units=${this.unit}&appid=${this.apiKey}`
            );

            if (!response.ok) {
                throw new Error('City not found');
            }

            const data = await response.json();
            this.currentCity = data;
            this.fetchForecast(data.coord.lat, data.coord.lon);
            this.renderCurrentWeather();
            this.showLoading(false);
            this.showError('');
        } catch (error) {
            this.showLoading(false);
            this.showError(error.message || 'Error fetching weather data');
        }
    }

    async fetchWeatherByCoordinates(lat, lon) {
        try {
            const response = await fetch(
                `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&units=${this.unit}&appid=${this.apiKey}`
            );

            if (!response.ok) {
                throw new Error('Unable to fetch weather');
            }

            const data = await response.json();
            this.currentCity = data;
            this.fetchForecast(lat, lon);
            this.renderCurrentWeather();
            this.showLoading(false);
            this.showError('');
        } catch (error) {
            this.showLoading(false);
            this.showError(error.message || 'Error fetching weather data');
        }
    }

    async fetchForecast(lat, lon) {
        try {
            const response = await fetch(
                `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&units=${this.unit}&appid=${this.apiKey}`
            );

            if (!response.ok) throw new Error('Error fetching forecast');

            const data = await response.json();
            this.renderForecast(data.list);
        } catch (error) {
            console.error('Forecast error:', error);
        }
    }

    renderCurrentWeather() {
        if (!this.currentCity) return;

        const city = this.currentCity;
        const isFavorite = this.favorites.some(
            f => f.name === city.name && f.country === city.sys.country
        );

        const weatherIcon = this.getWeatherIcon(city.weather[0].main);
        const date = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        this.currentWeatherDiv.innerHTML = `
            <div class="weather-header">
                <div class="location-info">
                    <h2>${city.name}, ${city.sys.country}</h2>
                    <div class="location-date">${date}</div>
                </div>
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="app.toggleFavorite()">
                    ${isFavorite ? '⭐' : '☆'}
                </button>
            </div>

            <div class="current-conditions">
                <div class="weather-icon">${weatherIcon}</div>
                <div>
                    <div class="temperature-info">
                        <span class="temperature">${Math.round(city.main.temp)}</span>
                        <span class="temp-unit">°C</span>
                    </div>
                    <div class="weather-description">${city.weather[0].description}</div>
                </div>
            </div>

            <div class="weather-details">
                <div class="detail-item">
                    <span class="detail-label">Feels Like</span>
                    <span class="detail-value">${Math.round(city.main.feels_like)}°C</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Humidity</span>
                    <span class="detail-value">${city.main.humidity}%</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Pressure</span>
                    <span class="detail-value">${city.main.pressure} mb</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Wind Speed</span>
                    <span class="detail-value">${(city.wind.speed * 3.6).toFixed(1)} km/h</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">UV Index</span>
                    <span class="detail-value">-</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Visibility</span>
                    <span class="detail-value">${(city.visibility / 1000).toFixed(1)} km</span>
                </div>
            </div>
        `;
    }

    renderForecast(forecastData) {
        // Group forecast by day
        const dailyForecasts = {};

        forecastData.forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

            if (!dailyForecasts[day]) {
                dailyForecasts[day] = {
                    temps: [],
                    description: forecast.weather[0].main,
                    icon: forecast.weather[0].main
                };
            }
            dailyForecasts[day].temps.push(forecast.main.temp);
        });

        // Get first 5 days
        const forecastCards = Object.entries(dailyForecasts).slice(0, 5);

        this.forecastGrid.innerHTML = forecastCards.map(([day, data]) => {
            const minTemp = Math.round(Math.min(...data.temps));
            const maxTemp = Math.round(Math.max(...data.temps));
            const icon = this.getWeatherIcon(data.icon);

            return `
                <div class="forecast-card">
                    <div class="forecast-day">${day}</div>
                    <div class="forecast-icon">${icon}</div>
                    <div class="forecast-temp">${maxTemp}° / ${minTemp}°</div>
                    <div class="forecast-description">${data.description}</div>
                </div>
            `;
        }).join('');
    }

    getWeatherIcon(weatherMain) {
        const icons = {
            'Clear': '☀️',
            'Clouds': '☁️',
            'Rain': '🌧️',
            'Drizzle': '🌦️',
            'Thunderstorm': '⛈️',
            'Snow': '❄️',
            'Mist': '🌫️',
            'Smoke': '💨',
            'Haze': '🌫️',
            'Dust': '💨',
            'Fog': '🌫️',
            'Sand': '💨',
            'Ash': '💨',
            'Squall': '💨',
            'Tornado': '🌪️'
        };
        return icons[weatherMain] || '🌤️';
    }

    toggleFavorite() {
        if (!this.currentCity) return;

        const city = this.currentCity;
        const key = `${city.name}_${city.sys.country}`;
        const index = this.favorites.findIndex(
            f => f.name === city.name && f.country === city.sys.country
        );

        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push({
                name: city.name,
                country: city.sys.country,
                lat: city.coord.lat,
                lon: city.coord.lon,
                temp: city.main.temp,
                description: city.weather[0].main
            });
        }

        this.saveFavorites();
        this.renderCurrentWeather();
        this.renderFavorites();
    }

    renderFavorites() {
        if (this.favorites.length === 0) {
            this.favoritesSection.style.display = 'none';
            return;
        }

        this.favoritesSection.style.display = 'block';
        this.favoritesGrid.innerHTML = this.favorites.map(fav => {
            const icon = this.getWeatherIcon(fav.description);
            return `
                <div class="favorite-card" onclick="app.fetchWeatherByCoordinates(${fav.lat}, ${fav.lon})">
                    <button class="favorite-remove" onclick="event.stopPropagation(); app.removeFavorite('${fav.name}', '${fav.country}')">×</button>
                    <div class="favorite-name">${fav.name}</div>
                    <div>${icon}</div>
                    <div class="favorite-temp">${Math.round(fav.temp)}°C</div>
                </div>
            `;
        }).join('');
    }

    removeFavorite(name, country) {
        this.favorites = this.favorites.filter(
            f => !(f.name === name && f.country === country)
        );
        this.saveFavorites();
        this.renderFavorites();
    }

    saveFavorites() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
    }

    loadFavorites() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            this.favorites = JSON.parse(saved);
            this.renderFavorites();
        }
    }

    showError(message) {
        if (message) {
            this.errorAlert.textContent = message;
            this.errorAlert.style.display = 'block';
        } else {
            this.errorAlert.style.display = 'none';
        }
    }

    showLoading(show) {
        this.loadingAlert.style.display = show ? 'block' : 'none';
    }
}

// Initialize app
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new WeatherDashboard();
});