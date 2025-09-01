import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, CalendarClock, ChevronRight, FileSignature, Settings, LogOut, Sparkles, Edit3 } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';

export default function ClientPortal() {
  const { signOut } = useAuth();
  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <Helmet><title>Client • My Portal</title></Helmet>
      <div className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-violet-600 grid place-items-center">CP</div>
            <span className="font-medium text-slate-200">My Client Portal</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="text-slate-300 hover:text-white"><Settings className="h-4 w-4 mr-2" /> Settings</Button>
            <Button onClick={signOut} className="bg-violet-600 hover:bg-violet-700"><LogOut className="h-4 w-4 mr-2" /> Logout</Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-8 space-y-6">
          <Card><CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div><p className="text-slate-400 text-xs">Your progress</p><p className="text-2xl font-semibold mt-1">Anxiety Toolkit</p></div>
              <div className="text-right"><p className="text-3xl font-bold">64%</p><p className="text-xs text-slate-400">12 / 19 pages completed</p></div>
            </div>
            <div className="h-2 rounded-full bg-white/10 mt-4"><div className="h-2 rounded-full bg-violet-600" style={{ width: '64%' }} /></div>
          </CardContent></Card>

          <Card><CardContent className="p-0 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <h3 className="font-medium">Your pages</h3>
              <Button variant="ghost" className="text-slate-300 hover:text-white">View all</Button>
            </div>
            <div className="divide-y divide-white/10">
              {[
                { title: 'Intro & Goals', status: 'Done' },
                { title: 'Grounding Exercise', status: 'In progress' },
                { title: 'Thought Reframe', status: 'Not started' },
                { title: 'Weekly Check-in', status: 'Not started' },
              ].map((p) => (
                <div key={p.title} className="px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-violet-400" />
                    <div><p className="font-medium">{p.title}</p><p className="text-xs text-slate-400">{p.status}</p></div>
                  </div>
                  <Button size="sm" className="bg-violet-600 hover:bg-violet-700">Continue <ChevronRight className="h-4 w-4 ml-1" /></Button>
                </div>
              ))}
            </div>
          </CardContent></Card>
        </section>

        <aside className="lg:col-span-4 space-y-6">
          <Card><CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3"><CalendarClock className="h-5 w-5 text-violet-400" /><h4 className="font-medium">Upcoming</h4></div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between"><span className="text-slate-300">Session with Alex</span><span className="text-slate-400">Thu 3:00 PM</span></div>
              <div className="flex items-center justify-between"><span className="text-slate-300">Sign consent form</span><span className="text-slate-400">Due tomorrow</span></div>
            </div>
          </CardContent></Card>

          <Card><CardContent className="p-5 space-y-3">
            <h4 className="font-medium">Quick actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" className="justify-start bg-violet-600"><Edit3 className="h-4 w-4 mr-2" /> Journal</Button>
              <Button variant="secondary" className="justify-start bg-violet-600"><FileSignature className="h-4 w-4 mr-2" /> Sign</Button>
              <Button variant="ghost" className="justify-start"><Sparkles className="h-4 w-4 mr-2" /> AI Coach</Button>
              <Button variant="ghost" className="justify-start"><Settings className="h-4 w-4 mr-2" /> Settings</Button>
            </div>
          </CardContent></Card>
        </aside>
      </div>
    </div>
  );
}
