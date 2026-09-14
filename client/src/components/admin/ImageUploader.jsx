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
            ? 'border-[#c5a880] bg-[#c5a880]/5'
            : 'border-white/10 hover:border-[#c5a880]/50 bg-black/20'
        } ${uploading ? 'opacity-60 pointer-events-none' : ''}`}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          {uploading ? (
            <Loader2 className="w-8 h-8 text-[#c5a880] animate-spin mb-1" />
          ) : (
            <UploadCloud className="w-8 h-8 text-[#c5a880] mb-1" />
          )}
          <span className="text-xs font-semibold text-white uppercase tracking-luxury">
            {uploading ? 'Uploading to Storage...' : label}
          </span>
          <p className="text-[11px] text-neutral-400">
            Drag & drop an image or PDF here, or click to browse (Max 10MB)
          </p>
        </div>
      </div>
    </div>
  );
};
