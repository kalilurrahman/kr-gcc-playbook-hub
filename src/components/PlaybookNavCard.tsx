// Entry card for the GCC Leadership Playbook Viewer
// Drop this into any hub page to provide a navigation entry point

import { useNavigate } from 'react-router-dom';

export default function PlaybookNavCard() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/playbook')}
      className="group w-full text-left bg-gradient-to-br from-blue-900/40 to-gray-800 border border-blue-700/40 hover:border-blue-500 rounded-2xl p-6 transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/20"
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl">📕</div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition">GCC Leadership Playbook</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-3">
            Complete India GCC Reference — 3 Parts, chapters on landscape, maturity models, AI, deep tech, M&A and 2030 scenarios. Fully navigatable with search &amp; glossary.
          </p>
          <div className="flex gap-3">
            <span className="text-xs bg-blue-900/60 text-blue-300 px-2.5 py-1 rounded-full">📖 Chapters</span>
            <span className="text-xs bg-purple-900/60 text-purple-300 px-2.5 py-1 rounded-full">🔍 Full-text Search</span>
            <span className="text-xs bg-emerald-900/60 text-emerald-300 px-2.5 py-1 rounded-full">📚 Glossary</span>
          </div>
        </div>
        <svg className="text-gray-600 group-hover:text-blue-400 transition shrink-0 mt-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
    </button>
  );
}
