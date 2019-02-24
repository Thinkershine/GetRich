import http from "./httpService";
import { apiUrl } from "../config.json";

export let levels = [];

export function getRealLevels() {
  http.get(apiUrl + "experience").then(function(response) {
    if (response) {
      console.log("RETURNING", response.data);
      levels = response.data;
      return response.data;
    }
  });
}

export function getRealExperienceForLevel(forLevel) {
  http.get(apiUrl + "experience/" + forLevel).then(function(response) {
    if (response) {
      console.log("RES FOR LEVEL", response.data);
      return response.data;
    }
  });
}
