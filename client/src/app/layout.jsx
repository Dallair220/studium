// import { Nunito } from 'next/font/google';
import './global.css';

// const nunito = Nunito({
//   subsets: ['latin'],
// });

export const metadata = {
  title: 'League Ladder - Bachelorarbeit',
  description:
    'League Ladder is a web platform developed at TH Köln, enabling League of Legends players to track and compare their leaderboard positions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={nunito.className}> */}
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
