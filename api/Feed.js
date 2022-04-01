import fetch from "node-fetch"

export class Feed {
    constructor() {
        this.data = []
        this.parsed_data = []
    }
    getData = () => this.data
    getParsedData = () => this.parsed_data
    setData = (new_data) => {
        this.data = [...new_data]
    }
    fetchData = async(url) => {
        const request = await fetch(url)
        const response = await request.json()
        this.setData(response.streams)
    }
    // parseElements = () => {
    //     this.parsed_data = this.data.map(item => parse(item))
    // }
}

export class Image {
    constructor(height, width, orientation, url) {
        this.declared_height = height
        this.declared_width = width
        this.orientation = orientation
        this.url = url
    }
} 
