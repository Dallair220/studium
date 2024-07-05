export const metadata = {
  title: 'League Ladder - Praxisprojekt',
  description:
    'League Ladder is a web platform developed at TH Köln, enabling League of Legends players to track and compare their leaderboard positions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
