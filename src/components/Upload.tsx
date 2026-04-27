import React, { useState, useRef } from 'react';
import { FileJson, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { awsApi } from '../api/api';
import Loader from './Loader';
import { cn } from '../lib/utils';
import { AnalyticsResponse } from '../types';

interface UploadProps {
  onSuccess?: (data: AnalyticsResponse) => void;
}

export default function Upload({ onSuccess }: UploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setMessage(null);
    } else {
      setMessage({ type: 'error', text: 'Please select a valid CSV file' });
    }
  };

  const uploadFile = async () => {
    if (!file) return;

    setLoading(true);
    setMessage(null);

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const content = e.target?.result;

        // 🔥 CALL AWS
      const res = await awsApi.post('/upload', {
  file: content as string
});

let parsed;

if (res.data.body) {
  parsed = JSON.parse(res.data.body);
} else {
  parsed = res.data;
}

console.log("FINAL PARSED:", parsed);

if (onSuccess) {
  onSuccess(parsed.analytics);
}

        setMessage({
          type: 'success',
          text: `File "${file.name}" processed successfully (AWS + GCP)`
        });

        setFile(null);

      } catch (err) {
        console.error('Upload Error:', err);

        setMessage({
          type: 'error',
          text: 'Processing failed. Check backend.'
        });
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setMessage({
        type: 'error',
        text: 'Error reading file'
      });
      setLoading(false);
    };

    reader.readAsText(file);
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-fit">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-sm font-bold text-slate-600 uppercase tracking-widest">
          AWS File Upload
        </h2>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 uppercase">
          Ready
        </span>
      </div>

      <div className="p-6">
        <p className="text-sm text-slate-500 mb-6 font-medium">
          Process sales CSV for multi-cloud synchronisation.
        </p>

        <label
          className={cn(
            "relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition",
            file ? "border-blue-600 bg-blue-50/10" : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"
          )}
        >
          <input
            type="file"
            className="hidden"
            accept=".csv"
            onChange={handleFileChange}
            ref={fileInputRef}
          />

          <div className="flex flex-col items-center justify-center p-4">
            <AnimatePresence mode="wait">
              {file ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-2" />
                  <p className="text-sm font-bold">{file.name}</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <FileJson className="w-8 h-8 text-slate-300 mb-3" />
                  <p className="text-sm font-bold">Drop csv file</p>
                  <p className="text-xs text-slate-400">Max 10MB</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </label>

        {loading && <div className="mt-4"><Loader /></div>}

        {message && (
          <div className={cn(
            "mt-4 p-3 rounded-lg text-xs font-semibold",
            message.type === 'success' ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"
          )}>
            {message.text}
          </div>
        )}

        <button
          onClick={uploadFile}
          disabled={!file || loading}
          className={cn(
            "w-full py-3 mt-4 rounded-lg font-bold text-sm",
            file && !loading
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          )}
        >
          {loading ? 'Processing...' : 'Initialize Upload'}
        </button>
      </div>
    </div>
  );
}