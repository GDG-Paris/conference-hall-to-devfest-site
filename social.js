const extractSocial = socials => {
  let extract = '';
  if (socials.twitter) {
    const twitter = _extractName(socials.twitter);
    extract += `  - icon: twitter
    link: 'https://twitter.com/${twitter}'
    name: '${twitter}'
`;
  }
  if (socials.github) {
    const github = _extractName(socials.github);
    extract += `  - icon: github
    link: 'https://github.com/${github}'
    name: '${github}'`;
  }
  if (extract.length > 0) {
    return `socials:
${extract}`;
  } else {
    return '';
  }
};

const _extractName = social => {
  if (social.startsWith('http')) {
    let token = social.split('/');
    return token[token.length - 1];
  }
  return social;
};

module.exports = {
  extractSocial,
};
