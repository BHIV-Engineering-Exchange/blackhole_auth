import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import UploadSection from '../components/UploadSection'
import VideoPreview from '../components/VideoPreview'

export default function Dashboard() {
  const { user } = useAuth()
  const [generatedVideoId, setGeneratedVideoId] = useState<string | null>(null)
  const [processingState, setProcessingState] = useState<'idle' | 'uploading' | 'generating' | 'completed' | 'error'>('idle')

  const handleVideoGenerated = (videoId: string) => {
    setGeneratedVideoId(videoId)
    setProcessingState('completed')
  }

  const handleProcessingStateChange = (state: 'idle' | 'uploading' | 'generating' | 'completed' | 'error') => {
    setProcessingState(state)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.username || 'User'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload your content and let AI create amazing videos
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Section: Upload */}
          <UploadSection 
            onVideoGenerated={handleVideoGenerated}
            onProcessingStateChange={handleProcessingStateChange}
          />

          {/* Right Section: Video Preview */}
          <VideoPreview 
            videoId={generatedVideoId}
            processingState={processingState}
          />
        </div>
      </main>
    </div>
  )
}
