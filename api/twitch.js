import { Feed, Image } from "./Feed.js"
import fetch from "node-fetch"

const TWITCH_FEED = new Feed()
const APP_URL = "https://ryxjogfhxnvjuptmzkhk.tv.twitch.tv"

TWITCH_FEED.fetchData = async function(url, params) {
    const request_games = await fetch(url, params)
    const response_games = await request_games.json()
    const games_ids = response_games.data.map(game => game.id)
    const videos = []
    const URL_PREFIX = "https://api.twitch.tv/helix/videos?game_id="
    const URL_SUFFIX = "&sort=views"
    for (let i=0; i<games_ids.length; i++) {
        const URL = URL_PREFIX + games_ids[i] + URL_SUFFIX
        const request_video = await fetch(URL, params)
        const response_video = await request_video.json()
        videos.push(response_video.data[0])
    }
    this.setData(videos)
}

TWITCH_FEED.parseElements = function() {
    this.parsed_data = this.data.map(item => parse(item))
}

const parseImg = (url) => {
    const img_url = url.replace("%{width}x%{height}", "640x360")
    return new Image(
        360,
        640,
        "portrait",
        img_url
    )
}

const parse = (item) => {
    const get_thumbnails = (url) => [parseImg(url)]
    const get_duration = (duration) => Number(parseInt(duration))
    const get_deeplink = (string) => APP_URL+"/videos/"+string
    return new Object({
        ...item,
        id: item.id,
        title: item.title,
        description: item.description,
        created_time: item.created_at,
        thumbnails: get_thumbnails(item.thumbnail_url),
        deeplink: get_deeplink(item.id),
        media_type: "Clip",
        mode: "vod",
        declared_language: item.language,
        available_countries: ["ALL"],
        duration: get_duration(item.duration)
    })
}

export default TWITCH_FEED
