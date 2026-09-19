import { createRouter, Link } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-3 px-6 text-center">
      <p className="text-sm font-semibold">Sayfa bulunamadı</p>
      <p className="text-sm text-muted">Ana listeye dönüp mağazadan devam edin.</p>
      <Link to="/" className="mt-2 text-sm font-medium underline">
        Mağazalar
      </Link>
    </main>
  );
}

export function getRouter() {
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    defaultNotFoundComponent: NotFound,
  });
}
