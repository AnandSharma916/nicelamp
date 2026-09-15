import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  UploadCloud,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Loader2,
  Search,
  Filter,
} from 'lucide-react';
import { uploadService } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { ImageUploader } from '../../components/admin/ImageUploader';
import { ConfirmModal } from '../../components/admin/ConfirmModal';

export const MediaLibrary = () => {
  const { addToast } = useToast();

  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // Deletion modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadMedia = async () => {
    try {
      setLoading(true);
      const res = await uploadService.getMediaLibrary();
      if (res.success) {
        setMediaList(res.files || res.media || []);
      }
    } catch (err) {
      addToast('Failed to load media assets.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleCopyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    addToast('Asset URL copied to clipboard.', 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      setDeleting(true);
      const res = await uploadService.deleteMedia(itemToDelete._id || itemToDelete.id);
      if (res.success) {
        addToast('Asset removed from library.', 'info');
        setDeleteModalOpen(false);
        setItemToDelete(null);
        loadMedia();
      }
    } catch (err) {
      addToast('Error removing media asset.', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const filteredMedia = mediaList.filter((m) =>
    (m.filename || m.url || m.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-luxury text-[#9a7442] font-bold block mb-1">
            Digital Asset Management
          </span>
          <h1 className="text-2xl font-serif-luxury font-bold text-slate-900 tracking-wide">
            Media & Photography Library
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Storefront photographs, specification schematics, PDF spec sheets, and high-resolution CAD assets.
          </p>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <h2 className="text-sm font-serif-luxury font-bold text-slate-900 mb-3">
          Upload New Assets
        </h2>
        <ImageUploader
          label="Drag & Drop Luminaire Imagery (JPG, PNG, WebP, PDF)"
          onUploadSuccess={() => loadMedia()}
        />
      </div>

      {/* Search & Counter Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between gap-4 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search media files by name..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#b58d57] focus:bg-white text-xs transition-colors"
          />
        </div>

        <span className="text-xs text-slate-500 font-mono">
          {filteredMedia.length} Assets Registered
        </span>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-20 text-center text-xs text-slate-400">
          <Loader2 className="w-8 h-8 text-[#b58d57] animate-spin mx-auto mb-2" />
          <span>Scanning storage repository...</span>
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
          <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-700">No media assets in library</p>
          <p className="text-xs text-slate-400 mt-1">
            Drag and drop images into the upload zone above to begin building your luminaire gallery.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredMedia.map((media, idx) => {
            const id = media._id || media.id || idx;
            const url = media.url || media.path || '';
            const name = media.filename || media.name || `Asset-${idx + 1}`;
            return (
              <div
                key={id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm group hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                {/* Thumbnail Preview */}
                <div className="h-36 bg-slate-50 relative overflow-hidden flex items-center justify-center p-2">
                  <img
                    src={url}
                    alt={name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/favicon.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-white/90 hover:bg-white text-slate-800 transition-colors shadow-sm"
                      title="Open full size"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleCopyUrl(url, id)}
                      className="p-2 rounded-lg bg-[#b58d57] text-white hover:bg-[#9a7442] transition-colors shadow-sm"
                      title="Copy URL to clipboard"
                    >
                      {copiedId === id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Info & Footer */}
                <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="truncate text-slate-700 font-mono text-[11px]" title={name}>
                    {name}
                  </span>
                  <button
                    onClick={() => {
                      setItemToDelete(media);
                      setDeleteModalOpen(true);
                    }}
                    className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0 ml-1"
                    title="Delete media"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Media Asset?"
        message="Are you sure you want to delete this photographic asset? Any products referencing this specific URL will require new imagery."
        confirmText="Delete File"
        confirmVariant="danger"
        loading={deleting}
        onConfirm={confirmDelete}
        onClose={() => {
          setDeleteModalOpen(false);
          setItemToDelete(null);
        }}
      />
    </div>
  );
};
