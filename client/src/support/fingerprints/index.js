import FingerprintJS from '@fingerprintjs/fingerprintjs'

const getVisitorData = async () => {
  try {
    // Initialize an agent at application startup.
    const fpPromise = FingerprintJS.load()
    // Get the visitor identifier when you need it.
    const fp = await fpPromise
    const result = await fp.get()
    // This is the visitor identifier:
    return result
  } catch (err) {
    console.error(`Something went wrong generating visitor ids: ${err}`)
    throw err
  }
}

export { getVisitorData }
