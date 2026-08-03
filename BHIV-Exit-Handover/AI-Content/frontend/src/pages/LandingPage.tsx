import { useNavigate } from 'react-router-dom'
import { Sparkles, Video, FileText, Image, Zap, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              AI Content Generator
            </span>
          </div>
          <button
            onClick={() => navigate('/auth')}
            className="btn btn-primary flex items-center space-x-2"
          >
            <span>Sign In</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Hero Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full mb-8">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">Powered by AI Technology</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            AI Content Generator
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Convert your ideas, words, or images into engaging text videos
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate('/auth')}
            className="btn btn-primary text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all inline-flex items-center space-x-2"
          >
            <span>Get Started</span>
            <ArrowRight className="h-5 w-5" />
          </button>

          {/* Demo Link */}
          <p className="mt-6 text-gray-500 dark:text-gray-400">
            No credit card required. Start creating in seconds.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
          {/* Feature 1 */}
          <div className="card p-8 hover:shadow-xl transition-all animate-slide-up">
            <div className="bg-primary-100 dark:bg-primary-900 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <FileText className="h-7 w-7 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Text to Video</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Transform your written content into captivating video presentations with AI-powered generation.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="card p-8 hover:shadow-xl transition-all animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-purple-100 dark:bg-purple-900 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Image className="h-7 w-7 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Image Integration</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Upload images and let AI create compelling video narratives around your visual content.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="card p-8 hover:shadow-xl transition-all animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-pink-100 dark:bg-pink-900 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Video className="h-7 w-7 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Professional Videos</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Generate high-quality videos ready for social media, presentations, or marketing campaigns.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-32 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Upload Your Content</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Upload text files, documents, or images to get started.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">AI Processing</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our AI analyzes your content and creates an engaging video script.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Download & Share</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Preview, download, and share your professionally crafted video.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-32 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Create Amazing Videos?</h2>
          <button
            onClick={() => navigate('/auth')}
            className="btn btn-primary text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all inline-flex items-center space-x-2"
          >
            <span>Start Creating Now</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-32">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>© 2025 AI Content Generator. Frontend Only Build — Backend integration already exists.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
