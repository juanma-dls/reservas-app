import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';

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
        <section
          className="
            min-h-[calc(100vh-4rem)] 
            bg-gradient-to-b from-primary/10 to-secondary/5 
            text-center rounded-b-3xl 
            pt-16 sm:pt-0"
        >
          <div className="flex flex-col flex-1 px-4 lg:px-6 py-6">
            <Outlet />
          </div>
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
