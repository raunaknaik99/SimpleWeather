<template>
  <div>
    <b-container id="box">
      <b-card class="mb-2" style="border: none">
        <b-card-text v-if="show" style=" margin-bottom: 20px">
          <h4 v-if="error">{{ error }}</h4>
          <div v-else-if="weather.description">
            <h4>
              <h1>Weather in {{ location }}</h1>
              {{ weather.description }}
              <br />
              Temperature: {{ weather.temperature }} &#176;C
              <br />
              Humidity: {{ weather.humidity }} %
              <br />
              Pressure: {{ weather.pressure }}
            </h4>
          </div>
        </b-card-text>
        <b-form>
          <b-form-group id="input-group-1">
            <b-form-input
              id="input-1"
              @input="clear"
              v-model="location"
              type="text"
              required
              placeholder="Enter any location"
            ></b-form-input>
          </b-form-group>
          <b-button @click.prevent="getWeather" variant="primary">Get Weather</b-button>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      location: "",
      weather: { temperature: "", description: "", humidity: "", pressure: "" },
      error: "",
      show: false
    };
  },
  methods: {
    convertKelvinToCelsius(kelvin) {
      if (kelvin < 0) {
        return "below absolute zero (0 K)";
      } else {
        return kelvin - 273.15;
      }
    },

    async getWeather() {
      this.error = "";
      this.weather.description = "";
      this.weather.temperature = "";
      this.weather.humidity = "";
      this.weather.pressure = "";
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&APPID=7ac65faf3ca6cdc9a47ba1b3411e411b`
        )
        .then(res => {
          console.log(res.data);
          let result = res.data;
          this.weather.temperature = Math.floor(
            this.convertKelvinToCelsius(result.main.temp)
          );
          this.weather.description = result.weather[0].description;
          this.weather.humidity = result.main.humidity;
          this.weather.pressure = result.main.pressure;
          this.show = true;
        })
        .catch(err => {
          if (err.response.status === 404) {
            this.error = "Location not found";
            this.show = true;
          } else {
            this.error = err;
            this.show = true;
          }
        });
    },
    clear() {
      this.show = false;
    }
  }
};
</script>

<style scoped>
#box {
  padding: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}
</style>
