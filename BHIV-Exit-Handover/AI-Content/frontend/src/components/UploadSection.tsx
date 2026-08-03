import { useState, useRef } from 'react'
import { Upload, FileText, Image as ImageIcon, File, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { contentAPI, API_BASE_URL } from '../services/api'

interface UploadSectionProps {
  onVideoGenerated: (videoId: string) => void
  onProcessingStateChange: (state: 'idle' | 'uploading' | 'generating' | 'completed' | 'error') => void
}

export default function UploadSection({ onVideoGenerated, onProcessingStateChange }: UploadSectionProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const acceptedFileTypes = {
    'text': ['.txt', '.doc', '.docx'],
    'image': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  }

  const allAcceptedTypes = [...acceptedFileTypes.text, ...acceptedFileTypes.image].join(',')

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        setError('File size must be less than 50MB')
        return
      }
      setSelectedFile(file)
      setError(null)
      setUploadProgress(0)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      // Validate file size
      if (file.size > 50 * 1024 * 1024) {
        setError('File size must be less than 50MB')
        return
      }
      setSelectedFile(file)
      setError(null)
      setUploadProgress(0)
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setUploadProgress(0)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUploadAndGenerate = async () => {
    if (!selectedFile) {
      setError('Please select a file first')
      return
    }

    setIsProcessing(true)
    setError(null)
    onProcessingStateChange('uploading')

    try {
      // Upload file
      const uploadResponse = await contentAPI.uploadFile(selectedFile, (progress) => {
        setUploadProgress(progress)
      })

      console.log('Upload response:', uploadResponse)

      // Check if this is a text file that needs video generation
      const isTextFile = selectedFile.type.includes('text') || 
                         selectedFile.name.endsWith('.txt')

      let finalContentId = uploadResponse.content_id

      if (isTextFile) {
        // Generate video from text file
        onProcessingStateChange('generating')
        
        try {
          // Create FormData with the text file again for video generation
          const videoFormData = new FormData()
          videoFormData.append('file', selectedFile)
          videoFormData.append('title', selectedFile.name.replace(/\.[^/.]+$/, ''))
          
          const videoResponse = await fetch(`${API_BASE_URL}/generate-video`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
            },
            body: videoFormData
          })

          if (videoResponse.ok) {
            const videoData = await videoResponse.json()
            console.log('Video generation response:', videoData)
            finalContentId = videoData.content_id || videoData.video_id || finalContentId
          } else {
            console.warn('Video generation failed, using uploaded file')
          }
        } catch (genError) {
          console.error('Video generation error:', genError)
          // Continue with uploaded file if video generation fails
        }
      }

      // Notify parent component with the final content ID
      onVideoGenerated(finalContentId)
      onProcessingStateChange('completed')
      
      // Reset form after a delay
      setTimeout(() => {
        handleRemoveFile()
        setIsProcessing(false)
      }, 3000)

    } catch (err: any) {
      console.error('Upload error:', err)
      const errorMessage = err.response?.data?.detail || err.message || 'Failed to upload file'
      setError(errorMessage)
      onProcessingStateChange('error')
      setIsProcessing(false)
    }
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="h-8 w-8 text-purple-500" />
    } else if (file.type.includes('text') || file.name.endsWith('.txt')) {
      return <FileText className="h-8 w-8 text-blue-500" />
    } else {
      return <File className="h-8 w-8 text-gray-500" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold mb-6">Upload Content</h2>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          selectedFile
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
        }`}
      >
        {!selectedFile ? (
          <>
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium mb-2">
              Drag & drop your file here
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              or click to browse
            </p>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              accept={allAcceptedTypes}
              className="hidden"
              id="file-upload"
              disabled={isProcessing}
            />
            <label
              htmlFor="file-upload"
              className="btn btn-primary inline-block cursor-pointer"
            >
              Select File
            </label>
            <p className="text-xs text-gray-400 mt-4">
              Supported: Text files (.txt, .doc, .docx) and Images (.jpg, .png, .gif)
            </p>
          </>
        ) : (
          <div className="flex items-center justify-between bg-white dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-4 flex-1">
              {getFileIcon(selectedFile)}
              <div className="text-left flex-1">
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            {!isProcessing && (
              <button
                onClick={handleRemoveFile}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Upload Progress */}
      {isProcessing && uploadProgress > 0 && uploadProgress < 100 && (
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">Uploading...</span>
            <span className="text-primary-600 dark:text-primary-400">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2 text-red-700 dark:text-red-400">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Success Message */}
      {isProcessing && uploadProgress === 100 && !error && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center space-x-2 text-green-700 dark:text-green-400">
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm">File uploaded successfully!</span>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUploadAndGenerate}
        disabled={!selectedFile || isProcessing}
        className="w-full btn btn-primary mt-6 py-3 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Upload className="h-5 w-5" />
            <span>Upload Content</span>
          </>
        )}
      </button>

      {/* File Type Info */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <FileText className="h-6 w-6 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
          <p className="text-xs font-medium text-blue-700 dark:text-blue-300">Text Files</p>
          <p className="text-xs text-blue-600 dark:text-blue-400">.txt, .doc, .docx</p>
        </div>
        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <ImageIcon className="h-6 w-6 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
          <p className="text-xs font-medium text-purple-700 dark:text-purple-300">Images</p>
          <p className="text-xs text-purple-600 dark:text-purple-400">.jpg, .png, .gif</p>
        </div>
      </div>
    </div>
  )
}
