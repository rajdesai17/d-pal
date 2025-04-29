import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import image from '../assets/image.png'

const brands = [
  'Universal Music Group',
  'RPG',
  'Motilal Oswal',
  'Masters Union',
  'Decathlon',
]

const LandingPage: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center bg-light-bg dark:bg-dark-bg px-4 relative overflow-x-hidden text-light-text dark:text-dark-text">
      {/* Optional subtle grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-10 select-none" style={{backgroundImage: 'linear-gradient(0deg, transparent 24%, #e5e7eb 25%, #e5e7eb 26%, transparent 27%, transparent 74%, #e5e7eb 75%, #e5e7eb 76%, transparent 77%), linear-gradient(90deg, transparent 24%, #e5e7eb 25%, #e5e7eb 26%, transparent 27%, transparent 74%, #e5e7eb 75%, #e5e7eb 76%, transparent 77%)', backgroundSize: '40px 40px'}} />
      <div className="relative z-10 flex flex-col items-center w-full pt-24 pb-12">
        {/* Hero */}
        <div className="flex flex-col items-center text-center mb-14 w-full">
          <span className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-light-bg/80 dark:bg-dark-bg/80 text-xs font-medium text-light-text dark:text-dark-text border border-light-text/10 dark:border-dark-text/10">
            <span className="mr-2">✨</span> Powerful minimal writing for everyone
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-light-text dark:text-dark-text mb-6 leading-tight max-w-3xl">
            Stay Focused, Get Things Done, Superfast
          </h1>
          <p className="text-lg md:text-xl text-light-text dark:text-dark-text max-w-2xl mb-8">
            Empower your mind with a minimal note-taking app designed for clarity, focus, and speed. No clutter, just your words.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button
              onClick={() => navigate('/notes')}
              className="px-8 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-lg shadow-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
            >
              Start Writing
            </button>
            <button
              onClick={() => navigate('/notes')}
              className="px-8 py-3 rounded-full bg-light-bg dark:bg-dark-bg border border-light-text/20 dark:border-dark-text/20 text-light-text dark:text-dark-text font-semibold text-lg shadow-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
            >
              Try Demo
            </button>
          </div>
        </div>
        {/* Product screenshot image */}
        <div className="w-full flex justify-center mb-16">
          <div className="w-full max-w-3xl flex items-center justify-center bg-transparent rounded-2xl">
            <img
              src={image}
              alt="Minimal Notes App Screenshot"
              className="w-full h-80 object-contain rounded-2xl"
              style={{ background: 'none' }}
            />
          </div>
        </div>
        {/* Trusted by brands */}
        <div className="flex flex-col items-center mt-8 mb-4">
          <span className="text-xs text-light-text/70 dark:text-dark-text/70 mb-2 tracking-wide">TRUSTED BY TOP BRANDS</span>
          <div className="flex flex-wrap justify-center gap-6 opacity-80">
            {brands.map((brand) => (
              <span key={brand} className="text-sm font-medium uppercase tracking-wider text-light-text dark:text-dark-text/90">{brand}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage 