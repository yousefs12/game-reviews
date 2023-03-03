"use strict"

export default class Game {
    constructor(id ,title, img, price = "free", desc, genre, platform, link) {
        this.id = id;
        this.title = title;
        this.img = img
        this.price = price;
        this.desc = desc;
        this.genre = genre;
        this.platform = platform;
        this.link = link;
    }

    async getFullData() {
        if (this.status) return;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b3643e4a93msh68edf5980566b32p17e064jsn68d6b386c52c',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        const apiRes = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${this.id}`, options)
        const data = await apiRes.json();

        this.description = data.description;
        this.platform2 = data.platform;
        this.status = data.status;
    }

    display(container) {
        $(container).html(
            `<div class="col-md-4">
                <img src="${this.img}" alt="Game Thumbnail" class="w-100">
            </div>

            <div class="col-md-8">
                <div>
                    <h3>Title: ${this.title}</h3>
                    <p>Category: <span class="bg-primary text-dark px-2 py-1 rounded-2">${this.genre}</span></p>
                    <p>Platform: <span class="bg-primary text-dark px-2 py-1 rounded-2">${this.platform2}</span></p>
                    <p>Status: <span class="bg-primary text-dark px-2 py-1 rounded-2">Live</span></p>

                    <p>${this.description}</p>

                    <a href="${this.link}" class="btn btn-outline-warning text-white" target="_blank">Show Game</a>
                </div>
            </div>`);
    }
}