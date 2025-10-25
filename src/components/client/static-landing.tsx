export default function StaticLanding() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-amber-400 mb-4">ZAYTOUD</h1>
        <p className="text-amber-200">Nourish. Flourish. Bloom.</p>
        <div className="mt-8">
          <p className="text-amber-300">Loading beautiful hair care experience...</p>
          <div className="mt-4 animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}