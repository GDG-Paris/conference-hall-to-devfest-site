'use strict';

const fs = require('fs');
const { extractSocial } = require('./social');
const { normalizeString } = require('./common');

const conferenceHallSpeakerToDevFestSite = (jsonFile, featured, baseOutputDir) => {
  const speakers = jsonFile.speakers.map(speaker => {
    const key = normalizeString(speaker.displayName);
    return {
      key,
      id: speaker.uid,
      content: `---
key: ${key}
name: '${speaker.displayName}'
id: ${speaker.uid}
feature: ${featured}
company: '${speaker.company ? speaker.company : ""}'
city: ${_extractAddress(speaker.address)}
photoURL: '${speaker.photoURL}'
${extractSocial({ github: speaker.github, twitter: speaker.twitter })}
---

${speaker.bio ? speaker.bio : ""}
`
    };
  });

  speakers.forEach(speaker => {
    fs.writeFileSync(`${baseOutputDir}/content/speakers/${speaker.key}.md`, speaker.content);
    console.info(`🗣 Speaker ${speaker.key} parsed`);
  });

  return speakers;
};

const _extractAddress = address => {
  if (address) {
    return `${address.locality.long_name}, ${address.country.long_name}`;
  }
  return '""';
};

module.exports = {
  conferenceHallSpeakerToDevFestSite,
};
