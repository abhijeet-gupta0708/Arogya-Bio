import React, { useState } from 'react';
import { GOOGLE_APPS_SCRIPT_CODE } from '../data/landingData';
import { getActiveWebhookUrl, setActiveWebhookUrl, resetActiveWebhookUrl, getStoredLeadsHistory } from '../services/leadService';

interface WebhookSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WebhookSetupModal: React.FC<WebhookSetupModalProps> = ({ isOpen, onClose }) => {
  const [urlInput, setUrlInput] = useState(getActiveWebhookUrl());
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'instructions' | 'script' | 'leads'>('instructions');
  const [savedSuccessMessage, setSavedSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const leadsHistory = getStoredLeadsHistory();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      setActiveWebhookUrl(urlInput.trim());
    } else {
      resetActiveWebhookUrl();
    }
    setSavedSuccessMessage(true);
    setTimeout(() => setSavedSuccessMessage(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-[#E8E8DF] overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#1B4D1B] text-white p-5 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-2xl text-[#FDC34D]">table_chart</span>
            <div>
              <h2 className="font-bold text-lg leading-snug">Google Sheet Lead Storage Setup</h2>
              <p className="text-xs text-emerald-200">Connect lead capture directly to your CRM Google Sheet</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E8E8DF] bg-[#FAFAF3] px-4 text-xs font-bold text-[#41493F]">
          <button
            onClick={() => setActiveTab('instructions')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${activeTab === 'instructions' ? 'border-[#1B4D1B] text-[#1B4D1B] bg-white' : 'border-transparent hover:text-[#0D2B0D]'}`}
          >
            <span className="material-symbols-outlined text-sm">integration_instructions</span>
            1. Setup Instructions
          </button>
          <button
            onClick={() => setActiveTab('script')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${activeTab === 'script' ? 'border-[#1B4D1B] text-[#1B4D1B] bg-white' : 'border-transparent hover:text-[#0D2B0D]'}`}
          >
            <span className="material-symbols-outlined text-sm">code</span>
            2. Apps Script Code
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${activeTab === 'leads' ? 'border-[#1B4D1B] text-[#1B4D1B] bg-white' : 'border-transparent hover:text-[#0D2B0D]'}`}
          >
            <span className="material-symbols-outlined text-sm">history</span>
            3. Local Leads Log ({leadsHistory.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm text-[#41493F]">
          
          {/* TAB 1: Instructions & URL Configuration */}
          {activeTab === 'instructions' && (
            <div className="space-y-6">
              
              {/* Webhook Endpoint Input Form */}
              <div className="bg-[#FAFAF3] p-5 rounded-2xl border border-[#E8E8DF]">
                <label className="block text-xs font-bold text-[#0D2B0D] uppercase tracking-wider mb-2">
                  Google Apps Script Web App Endpoint URL (VITE_LEADS_WEBHOOK_URL)
                </label>
                <form onSubmit={handleSaveUrl} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="flex-1 px-3.5 py-2.5 bg-white border border-[#C1C9BB] rounded-xl text-xs font-mono focus:outline-none focus:border-[#1B4D1B]"
                  />
                  <button
                    type="submit"
                    className="bg-[#1B4D1B] hover:bg-[#0D2B0D] text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <span className="material-symbols-outlined text-base">save</span>
                    सहेजें (Save Endpoint)
                  </button>
                </form>

                {savedSuccessMessage && (
                  <p className="text-xs text-emerald-700 font-bold mt-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    Webhook URL सफलतापूर्वक अपडेट हो गया!
                  </p>
                )}
              </div>

              {/* Step by Step Instructions */}
              <div className="space-y-4">
                <h3 className="font-bold text-[#0D2B0D] text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#1B4D1B] text-white text-xs flex items-center justify-center font-bold">1</span>
                  Create Google Sheet
                </h3>
                <p className="pl-8 text-xs leading-relaxed text-[#41493F]">
                  Create a new Google Sheet named <strong className="text-[#0D2B0D]">"Gouthealth Combo Leads"</strong> and paste these exact column headers in row 1:
                </p>
                
                {/* Column Headers Visual Copy */}
                <div className="pl-8 overflow-x-auto">
                  <div className="bg-slate-800 text-slate-100 p-3 rounded-xl text-[11px] font-mono select-all">
                    Created, Name, Email address, Source, Form, Channel, Stage, Owner, Labels, Phone, Secondary phone number, WhatsApp number
                  </div>
                </div>

                <h3 className="font-bold text-[#0D2B0D] text-base flex items-center gap-2 pt-2">
                  <span className="w-6 h-6 rounded-full bg-[#1B4D1B] text-white text-xs flex items-center justify-center font-bold">2</span>
                  Open Apps Script
                </h3>
                <p className="pl-8 text-xs text-[#41493F]">
                  In your Google Sheet, click <strong className="text-[#0D2B0D]">Extensions → Apps Script</strong>. Replace all code with the provided <code className="bg-gray-100 px-1 py-0.5 rounded text-[#1B4D1B]">doPost(e)</code> script from Tab 2.
                </p>

                <h3 className="font-bold text-[#0D2B0D] text-base flex items-center gap-2 pt-2">
                  <span className="w-6 h-6 rounded-full bg-[#1B4D1B] text-white text-xs flex items-center justify-center font-bold">3</span>
                  Deploy as Web App
                </h3>
                <ul className="pl-12 list-disc text-xs space-y-1 text-[#41493F]">
                  <li>Click <strong>Deploy → New deployment</strong></li>
                  <li>Select type: <strong>Web app</strong></li>
                  <li>Execute as: <strong>Me</strong></li>
                  <li>Who has access: <strong>Anyone</strong> (critical for Meta Ads lead submission)</li>
                  <li>Click <strong>Deploy</strong>, authorize permissions, and copy the generated <strong>Web App URL</strong>.</li>
                </ul>
              </div>

            </div>
          )}

          {/* TAB 2: Apps Script Code */}
          {activeTab === 'script' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#0D2B0D]">
                  Ready-to-paste Google Apps Script (doPost & doGet)
                </span>
                <button
                  onClick={handleCopyCode}
                  className="bg-[#1B4D1B] hover:bg-[#0D2B0D] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-base">content_copy</span>
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>

              <pre className="bg-slate-900 text-emerald-400 p-4 rounded-2xl text-xs font-mono overflow-x-auto max-h-[380px] leading-relaxed select-all">
                {GOOGLE_APPS_SCRIPT_CODE}
              </pre>
            </div>
          )}

          {/* TAB 3: Saved Leads Log */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#0D2B0D]">
                  Lead Captures in Browser Backup Storage ({leadsHistory.length})
                </span>
              </div>

              {leadsHistory.length === 0 ? (
                <div className="p-8 text-center bg-[#FAFAF3] rounded-2xl border border-[#E8E8DF]">
                  <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">inbox</span>
                  <p className="text-xs text-gray-500">अभी कोई सबमिशन दर्ज नहीं हुआ है। फॉर्म भरकर टेस्ट करें।</p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-[#E8E8DF] rounded-2xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#EEEEE7] text-[#0D2B0D] font-bold">
                      <tr>
                        <th className="p-2.5">Created</th>
                        <th className="p-2.5">Name</th>
                        <th className="p-2.5">Phone (+91)</th>
                        <th className="p-2.5">Source</th>
                        <th className="p-2.5">Stage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E8DF] font-mono text-[11px]">
                      {leadsHistory.map((lead, i) => (
                        <tr key={i} className="hover:bg-amber-50/50">
                          <td className="p-2.5 text-gray-600">{lead.created}</td>
                          <td className="p-2.5 font-bold text-[#0D2B0D]">{lead.name}</td>
                          <td className="p-2.5 text-[#1B4D1B] font-bold">{lead.phone}</td>
                          <td className="p-2.5">{lead.source}</td>
                          <td className="p-2.5"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">{lead.stage}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-[#FAFAF3] p-4 border-t border-[#E8E8DF] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#1B4D1B] text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-[#0D2B0D] cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
