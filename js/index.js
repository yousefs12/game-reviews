"use strict"
import Game from "./classes-module.js";
import apiReq from "./api-module.js";

export let games = [];

for (const link of $(".nav-link")) {
    $(link).click(function (e) {
        e.preventDefault();
        apiReq($(e.target).attr("value"));
        $(".nav-link").removeClass("active");
        $(e.target).addClass("active");
    })
}

export function setData(data) {
    games = [];

    for (const x of data) {
        const game = new Game(x.id, x.title, x.thumbnail, x.price, x.short_description, x.genre, x.platform, x.game_url);
        games.push(game);
    }
}

export function displayData(games) {
    let container = ``;
    games.forEach(function (game, index) {
        let gameBox = `
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="border border-1 border-dark rounded-2 text-white gameBox">

                    <div class="p-3 position-relative">
                        <img src="${game.img}" alt="Game Thumbnail" class="w-100">
                    </div>

                    <div class="px-3 d-flex justify-content-between">
                        <span class="my-2">${game.title}</span>
                        <span class="p-2 rounded-2 my-2 bg-sec">${game.price}</span>
                    </div>

                    <div class="text-center">
                        <p class="p-2 mb-4 overflow-y-hidden gameBoxDesc">${game.desc}</p>
                    </div>

                    <div class="d-flex justify-content-between border border-1 border-dark p-3 m-0">
                        <span class="bg-secondary bg-opacity-25 p-1 rounded-2">${game.genre}</span>
                        <span class="bg-secondary bg-opacity-25 p-1 rounded-2">${game.platform}</span>
                    </div>

                    <a href="" class="stretched-link" value="${index}"></a>

                </div>
            </div>`

        container += gameBox;
    });

    $("#gamesContainer").html(container);

    $(".stretched-link").click(async function (e) {
        e.preventDefault();
        $("#loadingScreen").show();
        $("body").css("overflow", "hidden");
        await games[$(e.target).attr("value")].getFullData();
        $("#gameDetails").show();
        await games[$(e.target).attr("value")].display($("#gameReview"));
        $(function () {
            $("#loadingScreen").hide();
        });
    });
}

apiReq();

$("#btnClose").click(function() {
        $("#gameDetails").hide();
        $("body").css("overflow", "auto");
    })