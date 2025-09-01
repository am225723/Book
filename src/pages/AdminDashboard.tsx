import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, FileSignature, CalendarClock, BarChart3, ChevronRight, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';

export default function AdminDashboard() {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <Helmet><title>Admin • Client Portal</title></Helmet>
      <div className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-indigo-600 grid place-items-center">AD</div>
            <span className="font-medium text-slate-200">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="text-slate-300 hover:text-white"><Settings className="h-4 w-4 mr-2" /> Settings</Button>
            <Button onClick={signOut} className="bg-indigo-600 hover:bg-indigo-700"><LogOut className="h-4 w-4 mr-2" /> Logout</Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 space-y-6">
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: 'Active Clients', value: 42, icon: Users },
            { label: 'Pending Signatures', value: 7, icon: FileSignature },
            { label: 'Sessions This Week', value: 29, icon: CalendarClock },
            { label: 'Completion Rate', value: '86%', icon: BarChart3 },
          ].map(({ label, value, icon: Icon }) => (
            <Card key={label}><CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div><p className="text-slate-400 text-xs">{label}</p><p className="text-2xl font-semibold mt-1">{value}</p></div>
                <Icon className="h-5 w-5 text-indigo-400" />
              </div>
            </CardContent></Card>
          ))}
        </div>

        <Card><CardContent className="p-0 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <h3 className="font-medium">Recent Clients</h3>
            <Button variant="ghost" className="text-slate-300 hover:text-white">View all</Button>
          </div>
          <div className="divide-y divide-white/10">
            {[
              { name: 'Eric M.', book: 'Anxiety Toolkit', progress: '64%', sessions: 3 },
              { name: 'Jenna K.', book: 'Self-Love Journey', progress: '82%', sessions: 5 },
              { name: 'Kai P.', book: 'Confidence Builder', progress: '41%', sessions: 2 },
            ].map((row) => (
              <div key={row.name} className="px-5 py-4 grid grid-cols-12 items-center">
                <div className="col-span-4"><p className="font-medium">{row.name}</p><p className="text-xs text-slate-400">{row.book}</p></div>
                <div className="col-span-4 text-slate-300">Progress: {row.progress}</div>
                <div className="col-span-2 text-slate-300">Sessions: {row.sessions}</div>
                <div className="col-span-2 text-right">
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Open <ChevronRight className="h-4 w-4 ml-1" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent></Card>
      </div>
    </div>
  );
}
