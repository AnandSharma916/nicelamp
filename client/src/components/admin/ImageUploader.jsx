import React, { useState, useRef } from 'react';
import { UploadCloud, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { uploadService } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const ImageUploader = ({ onUploadSuccess, label = 'Upload Image' }) => {
  const { addToast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      addToast('File size must be under 10MB.', 'error');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const data = await uploadService.uploadSingle(formData);
      if (data.success && data.file) {
        addToast('File uploaded successfully.', 'success');
        if (onUploadSuccess) {
          onUploadSuccess(data.file.url, data.file);
        }
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to upload image.', 'error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
          dragActive
            ? 'border-[#b58d57] bg-[#b58d57]/5'
            : 'border-slate-300 hover:border-[#b58d57] bg-slate-50/70 hover:bg-slate-50'
        } ${uploading ? 'opacity-60 pointer-events-none' : ''}`}
      >
        <div className="flex flex-col items-center justify-center space-y-2.5">
          {uploading ? (
            <Loader2 className="w-8 h-8 text-[#b58d57] animate-spin mb-1" />
          ) : (
            <UploadCloud className="w-8 h-8 text-[#b58d57] mb-1 group-hover:scale-110 transition-transform" />
          )}
          <span className="text-xs font-semibold text-slate-800 uppercase tracking-luxury">
            {uploading ? 'Uploading to Server...' : label}
          </span>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-[#9a7442] border border-[#b58d57]/40 text-xs font-semibold shadow-sm transition-all">
            <span>📁 Browse File from PC</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Click to choose or drag & drop image file directly here (Max 10MB)
          </p>
        </div>
      </div>
    </div>
  );
};
