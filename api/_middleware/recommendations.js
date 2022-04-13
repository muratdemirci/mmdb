const nodeCron = require('node-cron')

// https://api.themoviedb.org/3/search/multi?api_key=4d4ed145d3584846f5922b6a467e1f85&language=en-US&query=forrest&page=1&include_adult=false

const recommendationsCronJob = () => {
    // nodeCron.schedule('*/1 * * * *', () 
    // console.log('running every minute')
}

const findDecentFingerprint = (params) => {
    nodeCron.schedule('* * * * * *', () => {
        // console.log('running every second')
        console.log(new Date().toTimeString())
    })

    nodeCron.schedule('*/1 * * * *', () => {
        console.log('running every minute')
    })
    // recomendatations içindeki tüm finger printleri tek tek gez
    //
    // eger fingerprint 1 saat once guncellenmişse return fingerprinnt number
    // degilse return false
}

findDecentFingerprint()

const generateRecommendations = async (params) => {
    // oluştur ve Timestamp atob, buna göre belirli aralıklarla tekrar upsert yap içeri
    // https://api.themoviedb.org/3/search/multi?api_key=4d4ed145d3584846f5922b6a467e1f85&language=en-US&query=forrest&page=1&include_adult=false
    // 1) ilk sonucu al 
    // 2) bulduğunn sonucla get getSimilarMovies
    // console.log('12312')

}

export const searchEverything = async (squery) => {
    try {
      const response = await axios.get(
        `${BASE_URL_PATH}search/multi?api_key=${API_KEY}&language=en-US&query=${squery}&page=1&include_adult=false`
      )
      
      return response.data.results
    } catch (err) {
      console.error(`Something went wrong fetching the multi results: ${err}`)
      throw err
    }
  }

function ınsertRecommendations(params) {
    console.log(new Date().toLocaleString())
    generateRecommendations()
}

module.exports = recommendationsCronJob

