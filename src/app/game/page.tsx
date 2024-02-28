import GameBoard from "@/components/TicTacToe/GameBoard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-3xl mb-10">Tic-Tac-Toe</h1>
        <GameBoard />
      </div>
    </main>
  );
}
