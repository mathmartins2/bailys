import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [{ duration: '1m', target: 5 }],
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomSentence() {
  const words = [
    'Lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'Integer',
    'nec',
    'odio',
    'Praesent',
    'libero',
    'Sed',
    'cursus',
    'ante',
    'dapibus',
    'diam',
    'Sed',
    'nisi',
    'Nulla',
    'quis',
    'sem',
    'at',
    'nibh',
    'elementum',
    'imperdiet',
    'Duis',
    'sagittis',
    'ipsum',
    'Praesent',
    'mauris',
    'Fusce',
    'nec',
    'tellus',
    'sed',
    'augue',
    'semper',
    'porta',
    'Mauris',
    'massa',
    'Vestibulum',
    'lacinia',
    'arcu',
    'eget',
    'nulla',
    'Class',
    'aptent',
    'taciti',
    'sociosqu',
    'ad',
    'litora',
    'torquent',
    'per',
    'conubia',
    'nostra',
    'per',
    'inceptos',
    'himenaeos',
  ];

  const sentenceLength = getRandomInt(5, 15);
  let sentence = '';
  for (let i = 0; i < sentenceLength; i++) {
    sentence += words[getRandomInt(0, words.length - 1)] + ' ';
  }
  return sentence.trim();
}

export default function () {
  const url = 'http://localhost:3000/whatsapp/send';
  const payload = JSON.stringify({
    to: '558196259153@s.whatsapp.net',
    message: getRandomSentence(),
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let res = http.post(url, payload, params);
  check(res, {
    'status was 200': (r) => r.status === 200,
  });

  sleep(1);
}
