import React from 'react'

const SocialMediaButtons = ({ data }) => {
  const { freebase_id, freebase_mid, id, tvrage_id, ...rest } = data
  const SocialMediaAccounts = Object.entries(rest).filter((e) => { return e[1] !== null })
  const SocialDilemma = []
  Object.entries(SocialMediaAccounts).forEach(element => SocialDilemma.push({
    name: element[1][0].slice(0, -3),
    value: element[1][1],
    url: (element[1][0].slice(0, -3) === 'imdb') ? `https://${element[1][0].slice(0, -3)}.com/name/${element[1][1]}` : `https://${element[1][0].slice(0, -3)}.com/${element[1][1]}`
  }))
  return (
    <>
      <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' />
      <div>
        {SocialDilemma.map((account) => (
          <a key={account.name} title={account.name} href={account.url} className={`fa fa-${account.name}`} target='_blank' />
        ))}
      </div>
    </>
  )
}

export default SocialMediaButtons
