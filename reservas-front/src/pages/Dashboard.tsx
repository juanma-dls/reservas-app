import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';

export default function Dashboard() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <section className="
            min-h-[calc(100vh-4rem)] 
            bg-gradient-to-b from-primary/10 to-secondary/5 
            text-center rounded-b-3xl 
            flex items-center justify-center 
            pt-16 sm:pt-0"
        >
          <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
              </div>
            </div>
          </div>
        </div>
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
