import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { UrlShortener } from '@/components/url-shortener/url-shortener';

export default function Home() {
  return (
    <div className=" min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-16">
        <div className="w-full max-w-3xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
              Shorten your links,{' '}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                expand your reach
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform long, unwieldy URLs into clean, shareable links with just one click.
            </p>
          </div>
          
          <UrlShortener />
        </div>
      </main>
      <Footer />
    </div>
  );
}