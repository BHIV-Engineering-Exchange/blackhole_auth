import { useEffect, useState } from 'react'
import { Video, Download, Loader2, CheckCircle, PlayCircle, FileVideo } from 'lucide-react'
import { contentAPI } from '../services/api'

interface VideoPreviewProps {
  videoId: string | null
  processingState: 'idle' | 'uploading' | 'generating' | 'completed' | 'error'
}

export default function VideoPreview({ videoId, processingState }: VideoPreviewProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (videoId && processingState === 'completed') {
      loadVideo()
    }
  }, [videoId, processingState])

  const loadVideo = async () => {
    if (!videoId) return

    try {
      setLoading(true)
      
      // streamVideo returns a URL string directly (not a promise)
      const streamUrl = contentAPI.streamVideo(videoId)
      console.log('Stream URL:', streamUrl)
      setVideoUrl(streamUrl)
    } catch (err) {
      console.error('Failed to load video:', err)
      setVideoUrl(null)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!videoId) return

    try {
      const blob = await contentAPI.downloadVideo(videoId)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `video-${videoId}.mp4`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error('Download failed:', err)
      alert('Failed to download video. Please try again.')
    }
  }

  const renderContent = () => {
    // Idle state
    if (processingState === 'idle') {
      return (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
            <Video className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">No content yet</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Upload a file to preview it here
          </p>
        </div>
      )
    }

    // Uploading state
    if (processingState === 'uploading') {
      return (
        <div className="text-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">Uploading file...</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Please wait while we upload your content
          </p>
        </div>
      )
    }

    // Generating state
    if (processingState === 'generating') {
      return (
        <div className="text-center py-16">
          <div className="relative inline-block mb-4">
            <FileVideo className="h-16 w-16 text-primary-600" />
            <div className="absolute -top-1 -right-1">
              <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
            </div>
          </div>
          <h3 className="text-xl font-medium mb-2">Generating video...</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Our AI is creating your video. This may take a few moments.
          </p>
          <div className="max-w-xs mx-auto">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
              <span>Processing</span>
              <span>Please wait...</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-primary-600 to-purple-600 h-2 rounded-full animate-pulse-slow" style={{ width: '70%' }} />
            </div>
          </div>
        </div>
      )
    }

    // Error state
    if (processingState === 'error') {
      return (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
            <Video className="h-10 w-10 text-red-500" />
          </div>
          <h3 className="text-xl font-medium mb-2 text-red-600 dark:text-red-400">
            Generation failed
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Something went wrong. Please try again.
          </p>
        </div>
      )
    }

    // Completed state
    if (processingState === 'completed' && videoId) {
      if (loading) {
        return (
          <div className="text-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Loading video...</h3>
          </div>
        )
      }

      return (
        <div>
          {/* Success Banner */}
          <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
            <div>
              <p className="font-medium text-green-700 dark:text-green-300">
                Content uploaded successfully!
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                Your content is ready to preview and download
              </p>
            </div>
          </div>

          {/* Content Player/Viewer */}
          {videoUrl ? (
            <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
              {/* Try video first, fallback to image if video fails */}
              <video
                src={videoUrl}
                controls
                className="w-full h-full"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'%3E%3Crect fill='%23000' width='800' height='450'/%3E%3C/svg%3E"
                onError={(e) => {
                  console.log('Video failed to load, trying as image')
                  // If video fails, try displaying as image
                  const videoEl = e.target as HTMLVideoElement
                  const imgEl = document.createElement('img')
                  imgEl.src = videoUrl
                  imgEl.className = 'w-full h-full object-contain'
                  imgEl.alt = 'Uploaded content'
                  videoEl.parentElement?.replaceChild(imgEl, videoEl)
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center text-white">
                <PlayCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Content preview not available</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleDownload}
              className="flex-1 btn btn-primary flex items-center justify-center space-x-2 py-3"
            >
              <Download className="h-5 w-5" />
              <span>Download Content</span>
            </button>
            <button
              onClick={loadVideo}
              className="btn btn-secondary px-6 py-3"
              title="Reload video"
            >
              <PlayCircle className="h-5 w-5" />
            </button>
          </div>

          {/* Content Info */}
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 className="font-medium mb-2">Content Details</h4>
            <div className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <p>Content ID: <code className="text-xs bg-gray-200 dark:bg-gray-600 px-1 rounded">{videoId}</code></p>
              <p>Status: <span className="text-green-600 dark:text-green-400 font-medium">Ready</span></p>
              <p>Stream URL: <code className="text-xs bg-gray-200 dark:bg-gray-600 px-1 rounded break-all">{videoUrl}</code></p>
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold mb-6">Content Preview</h2>
      {renderContent()}
    </div>
  )
}
