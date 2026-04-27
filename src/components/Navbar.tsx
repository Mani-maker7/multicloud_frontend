import { Cloud, LayoutGrid } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center space-x-2 text-blue-600 font-bold text-xl">
        <LayoutGrid className="w-6 h-6 stroke-[2.5]" />
        <span className="tracking-tight text-slate-900">CloudNexus Analytics</span>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-[#ff9900] mr-2" />
            AWS Production
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-[#4285f4] mr-2" />
            GCP Analytics
          </div>
        </div>
      </div>
    </nav>
  );
}
