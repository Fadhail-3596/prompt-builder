export type OutputFormat = 'Teks' | 'Poin-poin' | 'Tabel' | 'Langkah-langkah';
export type ToneStyle = 'Profesional' | 'Santai' | 'Formal' | 'Kreatif';
export type LengthStyle = 'Singkat' | 'Sedang' | 'Terperinci';

export interface KifFormData {
  // K - Konteks
  roleOrSituation: string;
  audience: string;

  // I - Instruksi
  instruction: string;

  // F - Format
  format: OutputFormat;
  tone: ToneStyle;
  length: LengthStyle;

  // Teknik Lanjutan (Opsional)
  aiRole: string;
  aiSpecialization: string;
  stepByStep: boolean;
  fewShotExamples: string;
  constraints: string;

  // Iterasi
  revisionFeedback?: string;
}
