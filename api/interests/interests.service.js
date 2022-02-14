const db = require('_helpers/db')

async function crawlInterests(params) {
    const newInterest = {
        'fingerPrint': params.body.fingerPrint,
        'urlPaths': params.body.urlPaths
    }

    const result = await db.Interest.findOne({ fingerPrint: newInterest.fingerPrint });

    if (result) {
        const urlPathStr = (newInterest.urlPaths[0].path).toString()
        // search in path objects
        db.Interest.findOne({ 'urlPaths': { $elemMatch: { path: urlPathStr } } }, function (err, path) {

            if (err) {
                console.log(err);
            }
            if (path) {
                // console.log("URL PATH FOUND")
            } else {
                (async () => {
                    // console.log("URL PATH NOT FOUND")
                    await db.Interest.findOneAndUpdate({ fingerPrint: newInterest.fingerPrint }, { $push: { urlPaths: { $each: newInterest.urlPaths } } })
                })()
            }
        })

    } else {
        const interestRecord = new db.Interest(newInterest)
        await interestRecord.save()
    }

}

async function interestFeed(params) {
    console.log(1231312)
}

module.exports = {
    crawlInterests,
    interestFeed
}