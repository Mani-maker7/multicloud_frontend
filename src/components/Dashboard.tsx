import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { PieChart as PieIcon, BarChart3, TrendingUp, Package, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';
import { AnalyticsResponse } from '../types';

const COLORS = ['#0f172a', '#334155', '#64748b', '#94a3b8', '#cbd5e1'];

export default function Dashboard({ externalData }: { externalData: AnalyticsResponse | null }) {
  const data = externalData;

  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 6;

  if (!data) {
    return (
      <div className="h-[400px] flex items-center justify-center text-slate-400 font-semibold">
        Upload a CSV to see analytics
      </div>
    );
  }

  // 🔥 SORT DATA
  const sortedData = [...data.data].sort((a, b) => b.revenue - a.revenue);

  // 🔥 TOP & LOW PRODUCT (NEW FEATURE)
  const topProduct = sortedData[0];
  const lowProduct = [...data.data].sort((a, b) => a.revenue - b.revenue)[0];

  // 🔥 PIE PAGINATION
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
  const start = page * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pieData = sortedData.slice(start, end);

  return (
    <div className="space-y-6">

      {/* 🔥 TOP / LOW FEATURE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <p className="text-xs font-bold text-green-700 uppercase">Top Product</p>
          <h3 className="text-lg font-bold text-green-900">
            {topProduct.product} (₹{topProduct.revenue})
          </h3>
        </div>

        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <p className="text-xs font-bold text-red-700 uppercase">Lowest Product</p>
          <h3 className="text-lg font-bold text-red-900">
            {lowProduct.product} (₹{lowProduct.revenue})
          </h3>
        </div>

      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-slate-100 rounded-lg">
              <Package className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Inventory Units</p>
              <h3 className="text-2xl font-bold text-slate-900">
                {data.totalProducts.toLocaleString()}
              </h3>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Gross Revenue</p>
              <h3 className="text-2xl font-bold text-slate-900">
                ₹{data.totalRevenue.toLocaleString('en-IN')}
              </h3>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Bar Chart (UNCHANGED) */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
        >
          <div className="flex items-center space-x-2 mb-6">
            <BarChart3 className="w-4 h-4 text-slate-400" />
            <h3 className="text-sm font-bold text-slate-600 uppercase tracking-widest">
              Revenue per Product
            </h3>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                
                <XAxis 
                  dataKey="product" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />

                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />

                <Tooltip formatter={(value: number) => `₹${value}`} />

                <Bar 
                  dataKey="revenue" 
                  fill="#4285f4" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie Chart (FIXED) */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
        >
          <div className="flex items-center space-x-2 mb-6">
            <PieIcon className="w-4 h-4 text-slate-400" />
            <h3 className="text-sm font-bold text-slate-600 uppercase tracking-widest">
              Distribution
            </h3>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="revenue"
                  nameKey="product"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip formatter={(value: number) => `₹${value}`} />

                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ fontSize: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-4">

            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              className="px-3 py-1 bg-slate-100 rounded disabled:opacity-30"
            >
              ←
            </button>

            <span className="text-xs font-semibold text-slate-500">
              Page {page + 1} / {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              disabled={page === totalPages - 1}
              className="px-3 py-1 bg-slate-100 rounded disabled:opacity-30"
            >
              →
            </button>

          </div>

          <div className="mt-4 flex justify-center">
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-slate-900">
                Live Data
              </span>
            </div>
          </div>

        </motion.div>

      </div>
    </div>
  );
}