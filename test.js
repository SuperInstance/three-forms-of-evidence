const { FORMS, classifyEvidence, trustScore } = require('./index.js');
const o1 = { type: 'measurement', value: 42 };
const o2 = { type: 'attestation', witnesses: ['jane', 'gpt'] };
const o3 = { type: 'trend', instances: 100 };
console.log('measurement →', classifyEvidence(o1).form, trustScore(o1));
console.log('attestation →', classifyEvidence(o2).form, trustScore(o2));
console.log('trend →', classifyEvidence(o3).form, trustScore(o3));
