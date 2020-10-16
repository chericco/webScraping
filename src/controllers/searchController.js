const axios = require('axios').default;
const cheerio = require('cheerio');



exports.search_googleplay_get = async function (req, res) {

    let response = []
    const top5 = 5

    const webURL = "https://play.google.com/store/apps"

    const urls = await getApplicationLinks(webURL)

    for (let i = 0; i < top5; i++) {

        response.push(await getApplicationData(urls[i]))
    }

    res.status(200).json(response)
};


exports.search_googleplay_category_get = async function (req, res) {

    let response = []
    const top5 = 5

    const category = req.params.category

    const webURL = "https://play.google.com/store/apps/category/"+category

    const urls = await getApplicationLinks(webURL)

    for (let i = 0; i < top5; i++) {

        response.push(await getApplicationData(urls[i]))
    }

    res.status(200).json(response)
};


async function getApplicationLinks(url) {

    let appUrls = []

    await axios.get(url).then((res) => {

        const $ = cheerio.load(res.data)

        $('.wXUyZd').each((index, element) => {

            appUrls.push("https://play.google.com" + $(element).children('a').attr('href'))

        })

    })

    return appUrls
}

async function getApplicationData(url) {

    let result = {}

    await axios.get(url).then((res) => {

        const $ = cheerio.load(res.data)

        result.title = $('.AHFaub').text()
        result.countDonwload = $('.AYi5wd.TBRnV').text()
        result.description = $('.DWPxHb').text()

    })

    return result

}