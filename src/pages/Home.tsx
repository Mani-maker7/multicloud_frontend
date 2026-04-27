import { useState } from 'react';
import Navbar from '../components/Navbar';
import Upload from '../components/Upload';
import Dashboard from '../components/Dashboard';
import { AnalyticsResponse } from '../types';

export default function Home() {
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6 p-6 overflow-hidden max-w-[1440px] mx-auto w-full">
        
        {/* Sidebar */}
        <aside className="space-y-6 flex flex-col">
          
          {/* 🔥 PASS CALLBACK TO UPLOAD */}
          <Upload onSuccess={(data) => setAnalytics(data)} />
          
          <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex-grow">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              Recent Logs
            </div>

            <div className="font-mono text-[10px] space-y-3">
              
              {analytics && (
                <div className="flex items-start space-x-2 text-emerald-600">
                  <span>[LIVE]</span>
                  <span>Analytics received from GCP</span>
                </div>
              )}

              <div className="flex items-start space-x-2 text-slate-400">
                <span>[INFO]</span>
                <span>Upload → AWS → Lambda → GCP → UI</span>
              </div>

              {analytics && (
                <div className="flex items-start space-x-2 text-blue-600">
                  <span>[DATA]</span>
                  <span>
                    Products: {analytics.totalProducts} | Revenue: ${analytics.totalRevenue}
                  </span>
                </div>
              )}

            </div>
          </section>
        </aside>

        {/* 🔥 PASS DATA TO DASHBOARD */}
        <div className="space-y-6 overflow-y-auto pb-6">
          <Dashboard externalData={analytics} />
        </div>

      </main>
    </div>
  );
}