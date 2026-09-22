// three-forms-of-evidence: the canonical evidence forms
//
// All substrate observations carry evidence. There are exactly THREE forms.
// Each form is structurally distinct and verifiable through a different test:
//
// 1. DIRECT evidence: the observation's payload IS the evidence (e.g., a hash,
//    a measurement, a record). Verified by recomputation.
// 2. WITNESS evidence: the observation names witnesses who confirmed it (e.g.,
//    another node, an attestor). Verified by asking the witnesses.
// 3. PATTERN evidence: the observation is one of many that all together form a
//    recognized pattern (e.g., a trend, a periodic signal). Verified by
//    accumulating more instances.
//
// The forms are not equivalent. Direct is the strongest; pattern the weakest;
// witness lies between. This ordering is canonical (R10).

const FORMS = Object.freeze({
  DIRECT: 'direct',
  WITNESS: 'witness',
  PATTERN: 'pattern',
});

const FORM_PRIORITY = {
  direct: 1.0,
  witness: 0.7,
  pattern: 0.4,
};

function classifyEvidence(observation) {
  if (!observation || !observation.type) {
    return { form: null, confidence: 0, note: 'no type given' };
  }

  if (observation.type === 'measurement' || observation.type === 'hash' || observation.type === 'record') {
    return { form: FORMS.DIRECT, confidence: 0.95, note: 'payload is the evidence' };
  }
  if (observation.type === 'attestation' || observation.type === 'witness_statement') {
    return { form: FORMS.WITNESS, confidence: 0.7, note: 'named witnesses confirm' };
  }
  if (observation.type === 'trend' || observation.type === 'pattern_match' || observation.type === 'cluster') {
    return { form: FORMS.PATTERN, confidence: 0.5, note: 'many instances form a pattern' };
  }
  return { form: null, confidence: 0.3, note: 'unclassified' };
}

function trustScore(observation, weights = {}) {
  const w = { direct: 1.0, witness: 0.7, pattern: 0.5, ...weights };
  const { form, confidence } = classifyEvidence(observation);
  return confidence * (form ? w[form] : 0.3);
}

module.exports = { FORMS, FORM_PRIORITY, classifyEvidence, trustScore };
