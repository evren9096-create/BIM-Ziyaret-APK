import { useMemo, useState } from "react";


import { createFileRoute, useNavigate } from "@tanstack/react-router";


import { BarChart3, CalendarDays, FileText, History, Pencil, Plus, Settings2, Store as StoreIcon, Trash2 } from "lucide-react";


import { toast } from "sonner";


import { Button } from "@/components/ui/button";


import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";


import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";


import { Input } from "@/components/ui/input";


import { Label } from "@/components/ui/label";


import { useAppStore } from "@/lib/app-store";


import type { Store } from "@/lib/types";




export const Route = createFileRoute("/")({ component: Home });




function startOfDay(ts: number) { const d = new Date(ts); return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(); }


function elapsedDays(ts: number | null) { if (ts === null) return null; return Math.max(0, Math.floor((startOfDay(Date.now()) - startOfDay(ts)) / 86400000)); }


function formatShortDate(ts: number | null) { if (ts === null) return "Henüz ziyaret yok"; return new Date(ts).toLocaleDateString("tr-TR"); }




function Home() {


  const navigate = useNavigate();


  const stores = useAppStore((s) => s.stores);


  const visits = useAppStore((s) => s.visits);


  const addStore = useAppStore((s) => s.addStore);


  const renameStore = useAppStore((s) => s.renameStore);


  const deleteStore = useAppStore((s) => s.deleteStore);


  const createVisit = useAppStore((s) => s.createVisit);


  const [addOpen, setAddOpen] = useState(false);


  const [newName, setNewName] = useState("");


  const [renameTarget, setRenameTarget] = useState<Store | null>(null);


  const [renameValue, setRenameValue] = useState("");


  const [deleteTarget, setDeleteTarget] = useState<Store | null>(null);


  const ordered = useMemo(() => [...stores].sort((a, b) => a.order - b.order), [stores]);


  const rows = useMemo(() => ordered.map((store) => {


    const last = visits.filter((v) => v.storeId === store.id).sort((a, b) => b.createdAt - a.createdAt)[0];


    const days = elapsedDays(last?.createdAt ?? null);


    const status = days === 0 ? "today" : days !== null && days <= 3 ? "normal" : "overdue";


    return { store, last, days, status };


  }), [ordered, visits]);


  const overdueCount = rows.filter((r) => r.status === "overdue").length;


  const onTimeCount = rows.length - overdueCount;


  function startVisit(store: Store) { const visit = createVisit(store.id); if (!visit) return; toast.success(`${store.name} · ${visit.number}. ziyaret açıldı`); void navigate({ to: "/ziyaret/$visitId", params: { visitId: visit.id } }); }


  function openLast(store: Store) { const last = visits.filter((v) => v.storeId === store.id).sort((a, b) => b.createdAt - a.createdAt)[0]; if (!last) { toast.message("Henüz ziyaret yok"); return; } void navigate({ to: "/ziyaret/$visitId", params: { visitId: last.id } }); }


  function submitAdd() { const name = newName.trim(); if (!name) return; const store = addStore(name); setAddOpen(false); setNewName(""); toast.success(`${store.name} eklendi`); }


  function submitRename() { if (!renameTarget) return; renameStore(renameTarget.id, renameValue); setRenameTarget(null); toast.success("Mağaza adı güncellendi"); }


  return (


    <main className="mx-auto min-h-dvh max-w-5xl px-4 pb-28 sm:px-6" style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}>


      <header className="pt-2">


        <div className="flex items-center justify-between gap-3"><div><div className="inline-flex items-center gap-2"><span className="rounded-xl bg-[#e30613] px-3 py-1.5 text-lg font-black tracking-tight text-white">BİM</span><span className="text-lg font-bold text-fg">Ziyaret</span></div><h1 className="mt-4 text-2xl font-bold tracking-tight text-fg">Mağaza Seçimi</h1><p className="mt-1 text-sm text-muted">Ziyaret etmek istediğiniz mağazayı seçin</p></div><Button variant="outline" size="icon" aria-label="Ayarlar" onClick={() => navigate({ to: "/sablon" })}><Settings2 className="size-4" /></Button></div>


        <section className="mt-5 grid grid-cols-3 gap-2"><div className="rounded-2xl border border-border bg-surface p-3"><div className="flex items-center gap-2 text-xs font-medium text-muted"><CalendarDays className="size-4" />Bugünün Tarihi</div><div className="mt-2 text-base font-bold text-fg">{new Date().toLocaleDateString("tr-TR")}</div></div><div className="rounded-2xl border border-border bg-surface p-3"><div className="text-xs font-medium text-muted">Toplam Mağaza</div><div className="mt-2 text-2xl font-bold text-fg">{rows.length}</div></div><div className="rounded-2xl border border-border bg-surface p-3"><div className="text-xs font-medium text-muted">Zamanında</div><div className="mt-2 text-2xl font-bold text-fg">{onTimeCount}</div></div></section>


        <div className="mt-3 grid grid-cols-2 gap-2"><div className="rounded-2xl border border-red-200 bg-red-50 p-3"><div className="text-xs font-semibold text-red-700">4 Gün +</div><div className="mt-1 text-xl font-bold text-red-700">{overdueCount}</div></div><div className="rounded-2xl border border-border bg-surface p-3"><div className="text-xs font-semibold text-muted">Zamanında</div><div className="mt-1 text-xl font-bold text-fg">{onTimeCount}</div></div></div>


      </header>


      <section id="magazalar" className="mt-6"><div className="mb-3 flex items-center justify-between"><div><h2 className="text-base font-bold text-fg">Mağazalar</h2><p className="text-xs text-muted">Son ziyaret tarihine göre durum</p></div><button type="button" onClick={() => setAddOpen(true)} className="inline-flex items-center gap-1 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-fg"><Plus className="size-4" />Mağaza ekle</button></div>


        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{rows.map(({ store, last, days, status }) => { const cardClass = status === "today" ? "border-emerald-300 bg-emerald-50" : status === "overdue" ? "border-red-300 bg-red-50" : "border-border bg-surface"; const titleClass = status === "today" ? "text-emerald-800" : status === "overdue" ? "text-red-800" : "text-fg"; return <article key={store.id} className={`rounded-2xl border p-3 shadow-sm ${cardClass}`}><div className="flex items-start justify-between gap-2"><div className="min-w-0"><h3 className={`truncate text-sm font-bold ${titleClass}`}>{store.name}</h3><p className="mt-1 text-[11px] text-muted">Son ziyaret: {formatShortDate(last?.createdAt ?? null)}</p></div><StoreIcon className={`size-4 shrink-0 ${titleClass}`} /></div><div className={`mt-2 text-xs font-semibold ${titleClass}`}>{days === null ? "Henüz ziyaret yok" : days === 0 ? "Bugün ziyaret edildi" : `${days} gün önce`}</div><div className="mt-3 grid grid-cols-2 gap-1.5"><button type="button" onClick={() => startVisit(store)} className="rounded-xl bg-ink px-2 py-2 text-[11px] font-semibold text-white">Yeni Ziyaret</button><button type="button" onClick={() => openLast(store)} className="rounded-xl border border-border bg-white/70 px-2 py-2 text-[11px] font-semibold text-fg">Son Ziyaret</button></div><div className="mt-2 flex gap-1"><button type="button" onClick={() => navigate({ to: "/magaza/$storeId", params: { storeId: store.id } })} className="flex-1 rounded-lg px-2 py-1.5 text-[10px] font-medium text-muted hover:bg-white/60">Aç</button><button type="button" onClick={() => { setRenameTarget(store); setRenameValue(store.name); }} className="rounded-lg p-1.5 text-muted hover:bg-white/60"><Pencil className="size-3.5" /></button><button type="button" onClick={() => setDeleteTarget(store)} className="rounded-lg p-1.5 text-muted hover:bg-white/60"><Trash2 className="size-3.5" /></button></div></article>; })}</div>


      </section>


      <section className="mt-4 rounded-2xl border border-border bg-surface p-3"><div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted"><span className="inline-flex items-center gap-2"><span className="size-3 rounded-full bg-emerald-500" />Bugün</span><span className="inline-flex items-center gap-2"><span className="size-3 rounded-full bg-foreground" />1–3 gün</span><span className="inline-flex items-center gap-2"><span className="size-3 rounded-full bg-red-500" />4 gün ve üzeri</span></div></section>


      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur"><div className="mx-auto grid max-w-5xl grid-cols-5 items-end gap-1"><button type="button" onClick={() => document.getElementById("magazalar")?.scrollIntoView({ behavior: "smooth" })} className="flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-semibold text-fg"><StoreIcon className="size-5" />Mağazalar</button><button type="button" onClick={() => toast.message("Geçmiş ekranı sonraki V15 adımında bağlanacak.")} className="flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-medium text-muted"><History className="size-5" />Geçmiş</button><button type="button" onClick={() => document.getElementById("magazalar")?.scrollIntoView({ behavior: "smooth" })} className="flex -translate-y-2 flex-col items-center gap-1 rounded-2xl bg-ink px-3 py-3 text-[10px] font-bold text-white shadow-lg"><Plus className="size-6" />Yeni Ziyaret</button><button type="button" onClick={() => toast.message("Raporlar ekranı sonraki V15 adımında bağlanacak.")} className="flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-medium text-muted"><BarChart3 className="size-5" />Raporlar</button><button type="button" onClick={() => navigate({ to: "/sablon" })} className="flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-medium text-muted"><FileText className="size-5" />Ayarlar</button></div></nav>


      <Dialog open={addOpen} onOpenChange={setAddOpen}><DialogContent><DialogHeader><DialogTitle>Yeni mağaza</DialogTitle><DialogDescription>Listeye yeni bir mağaza ekler. Şablon tüm mağazalarda ortaktır.</DialogDescription></DialogHeader><Label htmlFor="store-name">Mağaza adı</Label><Input id="store-name" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Örn. YENİ MAHALLE" autoFocus onKeyDown={(e) => { if (e.key === "Enter") submitAdd(); }} /><DialogFooter><Button variant="outline" onClick={() => setAddOpen(false)}>Vazgeç</Button><Button variant="ink" onClick={submitAdd}>Ekle</Button></DialogFooter></DialogContent></Dialog>


      <Dialog open={Boolean(renameTarget)} onOpenChange={(o) => !o && setRenameTarget(null)}><DialogContent><DialogHeader><DialogTitle>Mağazayı yeniden adlandır</DialogTitle></DialogHeader><Input value={renameValue} onChange={(e) => setRenameValue(e.target.value)} autoFocus onKeyDown={(e) => { if (e.key === "Enter") submitRename(); }} /><DialogFooter><Button variant="outline" onClick={() => setRenameTarget(null)}>Vazgeç</Button><Button variant="ink" onClick={submitRename}>Kaydet</Button></DialogFooter></DialogContent></Dialog>


      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(o) => !o && setDeleteTarget(null)}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Mağaza silinsin mi?</AlertDialogTitle><AlertDialogDescription>{deleteTarget?.name} ve bu mağazaya ait tüm ziyaret raporları kalıcı olarak silinir.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Vazgeç</AlertDialogCancel><AlertDialogAction onClick={() => { if (deleteTarget) { deleteStore(deleteTarget.id); toast.success("Mağaza silindi"); } setDeleteTarget(null); }}>Sil</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>


    </main>


  );


}
