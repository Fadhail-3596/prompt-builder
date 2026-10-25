/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { KifForm } from './components/KifForm';
import { PromptOutput } from './components/PromptOutput';
import { Toast } from './components/Toast';
import { KifFormData } from './types';
import { EXAMPLE_DATA } from './data/presets';
import { validateKifForm, generateStructuredPrompt } from './utils/promptGenerator';

const INITIAL_FORM_DATA: KifFormData = {
  roleOrSituation: '',
  audience: '',
  instruction: '',
  format: 'Teks',
  tone: 'Profesional',
  length: 'Sedang',
  aiRole: '',
  aiSpecialization: '',
  stepByStep: false,
  fewShotExamples: '',
  constraints: '',
  revisionFeedback: '',
};

export default function App() {
  const [formData, setFormData] = useState<KifFormData>(INITIAL_FORM_DATA);
  const [promptText, setPromptText] = useState<string>('');
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    instruction?: string;
    roleOrSituation?: string;
  }>({});

  const [toast, setToast] = useState<{
    show: boolean;
    type: 'success' | 'error' | 'info';
    message: string;
  }>({
    show: false,
    type: 'success',
    message: '',
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 2800);
  };

  const handleFieldChange = (field: keyof KifFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === 'instruction' && errors.instruction) {
      setErrors((prev) => ({ ...prev, instruction: undefined }));
    }
    if (field === 'roleOrSituation' && errors.roleOrSituation) {
      setErrors((prev) => ({ ...prev, roleOrSituation: undefined }));
    }
  };

  const handleGeneratePrompt = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateKifForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      showToast('Lengkapi kolom wajib terlebih dahulu.', 'error');
      return;
    }

    setErrors({});
    const result = generateStructuredPrompt(formData);
    setPromptText(result);
    setHasGenerated(true);

    showToast('Prompt berhasil dibuat!', 'success');

    // Smoothly scroll to output
    setTimeout(() => {
      const outputEl = document.getElementById('hasil-prompt');
      outputEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const handleFillExample = () => {
    setFormData({ ...EXAMPLE_DATA });
    setErrors({});
    const result = generateStructuredPrompt(EXAMPLE_DATA);
    setPromptText(result);
    setHasGenerated(true);
    showToast('Contoh berhasil diisi!', 'info');

    setTimeout(() => {
      const outputEl = document.getElementById('hasil-prompt');
      outputEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const handleApplyFeedback = (feedback: string) => {
    const updated: KifFormData = {
      ...formData,
      revisionFeedback: feedback,
    };
    setFormData(updated);
    const result = generateStructuredPrompt(updated);
    setPromptText(result);
    showToast('Prompt diperbarui dengan instruksi perbaikan!', 'success');
  };

  const handleCopy = async (text: string) => {
    if (!text.trim()) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }

      setCopied(true);
      showToast('Prompt berhasil disalin!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Gagal menyalin teks.', 'error');
    }
  };

  const handleEditSave = (newText: string) => {
    setPromptText(newText);
    showToast('Perubahan disimpan.', 'success');
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setPromptText('');
    setHasGenerated(false);
    setErrors({});
    showToast('Formulir dikosongkan.', 'info');
  };

  const hasContent = Boolean(
    formData.roleOrSituation ||
      formData.instruction ||
      formData.audience ||
      formData.aiRole ||
      formData.aiSpecialization ||
      formData.stepByStep ||
      formData.fewShotExamples ||
      formData.constraints ||
      formData.revisionFeedback ||
      hasGenerated
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar
        onFillExample={handleFillExample}
        onReset={handleReset}
        hasContent={hasContent}
      />

      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-6 sm:py-8">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 space-y-6">
          <KifForm
            formData={formData}
            onChange={handleFieldChange}
            onSubmit={handleGeneratePrompt}
            errors={errors}
          />

          {hasGenerated && (
            <PromptOutput
              promptText={promptText}
              onCopy={handleCopy}
              onEditSave={handleEditSave}
              onReset={handleReset}
              onApplyFeedback={handleApplyFeedback}
              copied={copied}
            />
          )}
        </div>
      </main>

      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
}
