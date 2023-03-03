"use strict"
import {games, setData, displayData} from "./index.js";

export default async function apiReq(cat) {

    let category = cat ? `?category=${cat}`: "";
    $("loadingScreen").show();

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b3643e4a93msh68edf5980566b32p17e064jsn68d6b386c52c',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    const apiRes = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games` + category, options)
    const data = await apiRes.json();

    setData(data);
    displayData(games);

    $(function () {
        $("#loadingScreen").hide();
    });
}