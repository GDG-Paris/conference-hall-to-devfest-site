'use strict';

const fs = require('fs');
const {extractCategory} = require('./category');
const {extractFormat} = require('./format');
const {normalizeString} = require('./common');

const LANGUAGE = {
  'Français': 'french',
  'French': 'french',
  'France': 'french',
  'Francais': 'french',
  'French, English': 'french',
  'English': 'english',
  'English or French': 'french',
};

const conferenceHallSessionToDevFestSite = (jsonFile, speakers, baseOutputDir) => {
  const sessions = jsonFile.talks.map(talk => {
    const key = normalizeString(talk.title);
    return {
      key,
      id: talk.id,
      content: `---
key: ${key}
title: "${talk.title}"
id: ${talk.id}
language: ${LANGUAGE[talk.language]}
${extractFormat(talk.formats, jsonFile.formats)}
${extractCategory(talk.categories, jsonFile.categories)}
level: ${talk.level}
${_extractSpeakers(talk.speakers, speakers)}
---

${talk.abstract}
`
    };
  });

  sessions.forEach(session => {
    fs.writeFileSync(`${baseOutputDir}/content/sessions/${session.key}.md`, session.content);
    console.info(`🎤 Session ${session.key} parsed`)
  });
};

const _extractSpeakers = (conferenceHallSpeakers, speakers) => {
  let extract = '';
  conferenceHallSpeakers.forEach(chSpeaker => {
    extract += `  - ${speakers.find(speaker => speaker.id === chSpeaker).key}
`;
  });
  if (extract.length > 0) {
    return `speakers:
${extract}`;
  }
};

module.exports = {
  conferenceHallSessionToDevFestSite,
};
