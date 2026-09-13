# Weather Dashboard

A beautiful, real-time weather dashboard application that fetches weather data from the OpenWeatherMap API.

## ✨ Features

### Core Functionality
- 🌤️ **Real-time Weather** - Current weather for any location worldwide
- 📍 **Geolocation Support** - Automatically detect and display weather for your location
- 🔍 **City Search** - Search for weather in any city
- 📅 **5-Day Forecast** - View weather predictions for the next 5 days
- ⭐ **Favorites System** - Save and quickly access favorite locations
- 💾 **Persistent Storage** - Save API key and favorites locally

### Weather Information Displayed
- **Current Temperature** - With "feels like" temperature
- **Weather Conditions** - Description and emoji icons
- **Humidity** - Current humidity percentage
- **Pressure** - Atmospheric pressure in mb
- **Wind Speed** - Wind velocity in km/h
- **Visibility** - Visibility distance in km
- **Date & Day** - Current date and day of the week

### User Interface
- 🎨 **Beautiful Design** - Modern gradient background with clean cards
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast & Smooth** - Smooth animations and transitions
- 🎯 **Intuitive Controls** - Easy-to-use search and location features
- 🌈 **Weather Icons** - Visual emoji representations of weather conditions

## 🚀 Getting Started

### Requirements
- A free OpenWeatherMap API key (no credit card required)
- Modern web browser with geolocation support

### How to Get an API Key
1. Visit [OpenWeatherMap API](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to your API keys section
4. Copy your API key
5. When you first open the app, paste your API key when prompted

### Usage

1. **Open the Application**
   - Open `index.html` in your web browser
   - Enter your OpenWeatherMap API key when prompted

2. **Get Your Location's Weather**
   - Click "📍 Use My Location" button
   - Allow browser to access your location
   - Weather for your location will display

3. **Search for a City**
   - Type a city name in the search box
   - Click "Search" or press Enter
   - Weather data for that city will display

4. **View Forecast**
   - Scroll down to see the 5-day forecast
   - Each card shows high/low temperatures and conditions

5. **Save Favorites**
   - Click the star (☆) button on current weather
   - Favorites appear at the bottom of the page
   - Click a favorite to quickly view its weather
   - Click the × to remove from favorites

## 🛠️ Technical Details

### Technologies Used
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with gradients and animations
- **Vanilla JavaScript** - ES6+ with async/await
- **OpenWeatherMap API** - Real-time weather data
- **Geolocation API** - Browser location detection
- **Local Storage API** - Data persistence

### API Endpoints Used
- `weather` - Current weather data
- `forecast` - 5-day weather forecast

### Browser Compatibility
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires geolocation support for location feature

### Files
- `index.html` - HTML structure
- `styles.css` - Styling and responsive design
- `script.js` - Application logic and API integration
- `README.md` - Documentation

## 🏗️ Architecture

### WeatherDashboard Class
Manages all application logic:
- **setupApiKey()** - Handles API key setup and storage
- **handleSearch()** - Processes city search
- **getUserLocation()** - Gets user's geolocation
- **fetchWeatherByCity()** - Fetches weather for a city
- **fetchWeatherByCoordinates()** - Fetches weather by lat/lon
- **fetchForecast()** - Gets 5-day forecast
- **renderCurrentWeather()** - Displays current conditions
- **renderForecast()** - Displays forecast cards
- **toggleFavorite()** - Manages favorite locations
- **renderFavorites()** - Displays saved locations

### State Management
- `currentCity` - Current weather object
- `favorites` - Array of saved locations
- `apiKey` - OpenWeatherMap API key
- `unit` - Temperature unit (metric/imperial)

## 🎨 Design Features

- **Gradient Background** - Purple gradient for visual appeal
- **Card Layout** - Clean card-based UI for information
- **Smooth Animations** - Fade-in and slide animations
- **Responsive Grid** - Adapts to any screen size
- **Hover Effects** - Interactive feedback
- **Weather Icons** - Emoji representations for weather types

## 📊 Weather Icons Mapping

- Clear: ☀️
- Clouds: ☁️
- Rain: 🌧️
- Drizzle: 🌦️
- Thunderstorm: ⛈️
- Snow: ❄️
- Mist/Fog: 🌫️
- Tornado: 🌪️
- And more!

## 🔐 Privacy & Security

- API key is stored locally in your browser
- No data is sent to external servers (except OpenWeatherMap API)
- Geolocation data is only used for weather retrieval
- All data processing is done client-side

## 🚀 Future Enhancements

Potential improvements:
- 📈 Historical weather data
- 🌍 Air quality index (AQI)
- 🌡️ Temperature unit toggle
- 📍 Multiple location tracking
- 🔔 Weather alerts and notifications
- 📊 Weather charts and graphs
- 🎨 Custom themes
- 🌙 Dark mode
- ☁️ Cloud coverage visualization
- 🌊 UV index information

## 📝 License

Free to use and modify for personal or commercial projects.

## 🙏 Attribution

Weather data provided by [OpenWeatherMap](https://openweathermap.org/)

---

**Check the weather anywhere in the world! 🌍☀️**
