import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Header />
      <main className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
