import { Nunito } from 'next/font/google';
import './global.css';
import ToastProvider from './lib/ToastProvider';

const nunito = Nunito({
  subsets: ['latin'],
});

export const metadata = {
  title: 'League Ladder - Bachelorarbeit',
  description:
    'League Ladder is a web platform developed at TH Köln, enabling League of Legends players to track and compare their leaderboard positions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <div id="root">
          <ToastProvider>{children}</ToastProvider>
        </div>
      </body>
    </html>
  );
}
