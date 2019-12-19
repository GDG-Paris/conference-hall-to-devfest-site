'use strict';

const fs = require('fs');
const {conferenceHallSessionToDevFestSite} = require('./session');
const {conferenceHallSpeakerToDevFestSite} = require('./speaker');

const app = () => {
  const conferenceHallExportJson = JSON.parse(fs.readFileSync(process.argv[2]));
  const featured = process.argv[3] || false;
  const baseOutputDir = process.argv[4] || `${__dirname}/output`;

  const speakers = conferenceHallSpeakerToDevFestSite(
    conferenceHallExportJson,
    featured,
    baseOutputDir);

  conferenceHallSessionToDevFestSite(
    conferenceHallExportJson,
    speakers,
    baseOutputDir);
};

app();
