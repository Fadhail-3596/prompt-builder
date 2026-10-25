import { KifFormData } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: {
    instruction?: string;
    roleOrSituation?: string;
  };
}

export function validateKifForm(data: KifFormData): ValidationResult {
  const errors: ValidationResult['errors'] = {};

  if (!data.instruction?.trim()) {
    errors.instruction = 'Instruksi tugas wajib diisi.';
  }

  if (!data.roleOrSituation?.trim()) {
    errors.roleOrSituation = 'Peran atau situasi wajib diisi.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateStructuredPrompt(data: KifFormData): string {
  const sections: string[] = [];

  // 1. Role Prompting (jika diisi)
  if (data.aiRole?.trim()) {
    const roleDesc = data.aiRole.trim();
    const specDesc = data.aiSpecialization?.trim()
      ? ` dengan keahlian/spesialisasi: ${data.aiSpecialization.trim()}`
      : '';
    sections.push(`PERAN AI:\nBertindaklah sebagai ${roleDesc}${specDesc}.`);
  }

  // 2. Konteks (K)
  const contextLines: string[] = [];
  if (data.roleOrSituation?.trim()) {
    contextLines.push(`- Peran / Situasi Pengguna: ${data.roleOrSituation.trim()}`);
  }
  if (data.audience?.trim()) {
    contextLines.push(`- Target Audiens: ${data.audience.trim()}`);
  }
  if (contextLines.length > 0) {
    sections.push(`KONTEKS (K):\n${contextLines.join('\n')}`);
  }

  // 3. Instruksi Utama (I)
  if (data.instruction?.trim()) {
    sections.push(`INSTRUKSI UTAMA (I):\n${data.instruction.trim()}`);
  }

  // 4. Langkah Kerja (Step-by-Step, jika diaktifkan)
  if (data.stepByStep) {
    sections.push(
      `LANGKAH KERJA (STEP-BY-STEP):\nKerjakan tugas ini secara terstruktur langkah demi langkah. Uraikan setiap tahap pengerjaan secara bertahap, sertakan ringkasan alasan pada keputusan penting, dan pastikan hasil tiap tahap dapat diperiksa dengan jelas sebelum melanjutkan.`
    );
  }

  // 5. Contoh Referensi (Few-Shot Examples, jika diisi)
  if (data.fewShotExamples?.trim()) {
    sections.push(
      `CONTOH REFERENSI (FEW-SHOT):\nGunakan contoh berikut sebagai acuan gaya penulisan atau struktur yang diinginkan:\n${data.fewShotExamples.trim()}`
    );
  }

  // 6. Format Output (F)
  const formatLines: string[] = [
    `- Bentuk: ${data.format}`,
    `- Gaya Bahasa: ${data.tone}`,
    `- Panjang: ${data.length}`,
  ];
  sections.push(`FORMAT OUTPUT (F):\n${formatLines.join('\n')}`);

  // 7. Constraints / Batasan Tambahan (jika diisi)
  if (data.constraints?.trim()) {
    sections.push(`BATASAN & KETENTUAN (CONSTRAINTS):\n${data.constraints.trim()}`);
  }

  // 8. Instruksi Revisi / Iterasi (jika ada feedback perbaikan)
  if (data.revisionFeedback?.trim()) {
    sections.push(
      `INSTRUKSI REVISI (ITERASI):\nPerbaiki draf di atas dengan memperhatikan catatan berikut: ${data.revisionFeedback.trim()}`
    );
  }

  return sections.join('\n\n');
}
