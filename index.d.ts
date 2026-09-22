// three-forms-of-evidence: type declarations for the canonical evidence forms (R10).

export type EvidenceForm = 'direct' | 'witness' | 'pattern';

export declare const FORMS: {
  readonly DIRECT: 'direct';
  readonly WITNESS: 'witness';
  readonly PATTERN: 'pattern';
};

/** Canonical ordering weights: direct strongest, pattern weakest. */
export declare const FORM_PRIORITY: {
  readonly direct: number;
  readonly witness: number;
  readonly pattern: number;
};

export interface ClassifiedEvidence {
  form: EvidenceForm | null;
  confidence: number;
  note: string;
}

export interface EvidenceWeights {
  direct?: number;
  witness?: number;
  pattern?: number;
  [form: string]: number | undefined;
}

/**
 * Classifies an observation's evidence form by its type.
 * direct (measurement|hash|record) > witness (attestation|witness_statement) > pattern (trend|pattern_match|cluster).
 */
export declare function classifyEvidence(observation: { type?: string } | null): ClassifiedEvidence;

/** Confidence × form-weight. Unclassified observations score 0.3 baseline. */
export declare function trustScore(
  observation: { type?: string } | null,
  weights?: EvidenceWeights
): number;
