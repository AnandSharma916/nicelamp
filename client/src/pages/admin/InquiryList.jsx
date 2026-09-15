import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Trash2,
  CheckCircle2,
  Clock,
  ExternalLink,
  Loader2,
  X,
  Search,
  Filter,
} from 'lucide-react';
import { inquiryService } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { ConfirmModal } from '../../components/admin/ConfirmModal';

export const InquiryList = () => {
  const { addToast } = useToast();

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // View modal
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Deletion modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [inquiryToDelete, setInquiryToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadInquiries = async () => {
    try {
      setLoading(true);
      const res = await inquiryService.getInquiries();
      if (res.success) {
        setInquiries(res.inquiries || []);
      }
    } catch (err) {
      addToast('Failed to load inquiries list.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await inquiryService.updateInquiry(id, { status: newStatus });
      if (res.success) {
        addToast(`Inquiry status updated to ${newStatus}.`, 'success');
        setInquiries((prev) =>
          prev.map((i) => (i._id === id ? { ...i, status: newStatus } : i))
        );
        if (selectedInquiry?._id === id) {
          setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      addToast('Error updating status.', 'error');
    }
  };

  const confirmDelete = async () => {
    if (!inquiryToDelete) return;
    try {
      setDeleting(true);
      const res = await inquiryService.deleteInquiry(inquiryToDelete._id);
      if (res.success) {
        addToast('Inquiry record deleted.', 'info');
        setDeleteModalOpen(false);
        setInquiryToDelete(null);
        if (selectedInquiry?._id === inquiryToDelete._id) {
          setSelectedInquiry(null);
        }
        loadInquiries();
      }
    } catch (err) {
      addToast('Failed to delete inquiry.', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    const matchesSearch =
      (inq.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.message || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-luxury text-[#9a7442] font-bold block mb-1">
            CRM & Client Inquiries
          </span>
          <h1 className="text-2xl font-serif-luxury font-bold text-slate-900 tracking-wide">
            Architectural Project Requests
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage bespoke luminaire quote requests and technical specification consultations from interior designers & architects.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search inquiries by client name, email, or message..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#b58d57] focus:bg-white text-xs transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          {['all', 'new', 'contacted', 'resolved'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-luxury transition-all ${
                statusFilter === st
                  ? 'bg-[#b58d57] text-white font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase tracking-luxury font-semibold border-b border-slate-200 text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Client</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Project / Interest</th>
                <th className="py-3.5 px-4">Received</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    Loading client requests...
                  </td>
                </tr>
              ) : filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center">
                    <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-medium text-slate-700">No client inquiries found</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      New requests submitted through the storefront will display here immediately.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr
                    key={inq._id}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                    onClick={() => setSelectedInquiry(inq)}
                  >
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-900 block">{inq.name}</span>
                      {inq.company && (
                        <span className="text-[11px] text-slate-500 block">{inq.company}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      <div className="flex items-center gap-1 text-slate-700">
                        <Mail className="w-3 h-3 text-[#b58d57]" />
                        <span>{inq.email}</span>
                      </div>
                      {inq.phone && (
                        <div className="flex items-center gap-1 text-slate-500 mt-0.5">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{inq.phone}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <span className="text-xs font-semibold text-[#9a7442] block">
                        {inq.productTitle || inq.projectType || 'General Consultation'}
                      </span>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {inq.message || inq.subject}
                      </p>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border focus:outline-none ${
                          inq.status === 'new'
                            ? 'text-amber-800 bg-amber-50 border-amber-200'
                            : inq.status === 'contacted'
                            ? 'text-blue-800 bg-blue-50 border-blue-200'
                            : 'text-emerald-800 bg-emerald-50 border-emerald-200'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => {
                          setInquiryToDelete(inq);
                          setDeleteModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed View Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setSelectedInquiry(null)}
          />

          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl z-10 flex flex-col max-h-[90vh] overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-6 shrink-0 bg-white">
              <div>
                <span className="text-[10px] uppercase tracking-luxury text-[#9a7442] font-bold block">
                  Inquiry Details
                </span>
                <h3 className="text-xl font-serif-luxury font-bold text-slate-900">
                  {selectedInquiry.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 space-y-4 text-xs overflow-y-auto flex-1 modal-scrollbar">
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-luxury block mb-1">
                    Email
                  </span>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="text-[#9a7442] hover:underline font-semibold"
                  >
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-luxury block mb-1">
                    Phone
                  </span>
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="text-slate-800 hover:text-[#9a7442]"
                  >
                    {selectedInquiry.phone || 'Not provided'}
                  </a>
                </div>
              </div>

              {selectedInquiry.productTitle && (
                <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/60">
                  <span className="text-[10px] text-[#9a7442] font-bold uppercase tracking-luxury block mb-0.5">
                    Luminaire of Interest
                  </span>
                  <span className="font-semibold text-slate-900">
                    {selectedInquiry.productTitle}
                  </span>
                </div>
              )}

              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-luxury block mb-1.5">
                  Message / Technical Scope
                </span>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message || 'No written message provided.'}
                </div>
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="flex items-center justify-between p-4 sm:px-6 border-t border-slate-200 bg-slate-50 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 font-medium">Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleStatusChange(selectedInquiry._id, e.target.value)}
                  className="px-3 py-1 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <a
                href={`mailto:${selectedInquiry.email}?subject=Regarding your LightHut Lighting Inquiry`}
                className="btn-gold px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-luxury shadow-sm"
              >
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Client Inquiry?"
        message="Are you sure you want to permanently delete this client inquiry from the CRM log?"
        confirmText="Delete Record"
        confirmVariant="danger"
        loading={deleting}
        onConfirm={confirmDelete}
        onClose={() => {
          setDeleteModalOpen(false);
          setInquiryToDelete(null);
        }}
      />
    </div>
  );
};
