
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Image, 
  Video, 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  Download,
  Share,
  Edit,
  Trash2,
  Eye,
  Star,
  Folder,
  Tag,
  Grid,
  List,
  Play,
  Pause,
  Volume2
} from 'lucide-react'
import { toast } from 'sonner'

interface MediaAsset {
  id: string
  name: string
  type: 'image' | 'video' | 'document' | 'audio'
  category: string
  size: string
  url: string
  thumbnail?: string
  uploadDate: string
  lastModified: string
  tags: string[]
  isStarred: boolean
  dimensions?: string
  duration?: string
}

export default function MediaCenter() {
  const [assets, setAssets] = useState<MediaAsset[]>([
    {
      id: '1',
      name: 'Tax Season 2024 Hero Banner',
      type: 'image',
      category: 'Marketing',
      size: '2.4 MB',
      url: '/media/tax-hero-banner.jpg',
      thumbnail: '/media/thumbnails/tax-hero-banner.jpg',
      uploadDate: '2024-01-15',
      lastModified: '2024-01-20',
      tags: ['marketing', 'banner', 'tax-season', 'hero'],
      isStarred: true,
      dimensions: '1920x1080'
    },
    {
      id: '2',
      name: 'Client Testimonial - Sarah Johnson',
      type: 'video',
      category: 'Testimonials',
      size: '45.2 MB',
      url: '/media/testimonial-sarah.mp4',
      thumbnail: '/media/thumbnails/testimonial-sarah.jpg',
      uploadDate: '2024-01-10',
      lastModified: '2024-01-10',
      tags: ['testimonial', 'client', 'video', 'social-proof'],
      isStarred: true,
      duration: '2:34'
    },
    {
      id: '3',
      name: 'Individual Tax Return Checklist',
      type: 'document',
      category: 'Client Materials',
      size: '1.2 MB',
      url: '/media/individual-tax-checklist.pdf',
      uploadDate: '2024-01-05',
      lastModified: '2024-01-18',
      tags: ['checklist', 'individual', 'client-materials', 'pdf'],
      isStarred: false
    },
    {
      id: '4',
      name: 'Business Tax Consultation Video',
      type: 'video',
      category: 'Training',
      size: '128.5 MB',
      url: '/media/business-consultation-training.mp4',
      thumbnail: '/media/thumbnails/business-training.jpg',
      uploadDate: '2024-01-08',
      lastModified: '2024-01-08',
      tags: ['training', 'business', 'consultation', 'internal'],
      isStarred: false,
      duration: '15:42'
    },
    {
      id: '5',
      name: 'Social Media Post - Quick Tips',
      type: 'image',
      category: 'Social Media',
      size: '856 KB',
      url: '/media/social-tips-post.jpg',
      thumbnail: '/media/thumbnails/social-tips.jpg',
      uploadDate: '2024-01-12',
      lastModified: '2024-01-14',
      tags: ['social-media', 'tips', 'instagram', 'facebook'],
      isStarred: false,
      dimensions: '1080x1080'
    }
  ])

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null)

  const categories = ['all', 'Marketing', 'Testimonials', 'Client Materials', 'Training', 'Social Media']

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleStar = (id: string) => {
    setAssets(prev => prev.map(asset => 
      asset.id === id ? { ...asset, isStarred: !asset.isStarred } : asset
    ))
    toast.success('Asset updated!')
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return Image
      case 'video': return Video
      case 'document': return FileText
      case 'audio': return Volume2
      default: return FileText
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'image': return 'bg-blue-100 text-blue-800'
      case 'video': return 'bg-purple-100 text-purple-800'
      case 'document': return 'bg-green-100 text-green-800'
      case 'audio': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Media Center Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Media Asset Library</h2>
          <p className="text-gray-600">Manage all your marketing materials, training content, and client resources</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
          <Upload className="h-4 w-4 mr-2" />
          Upload Assets
        </Button>
      </div>

      {/* Media Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3">
            <Image className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-blue-600">Images</p>
              <p className="text-2xl font-bold text-blue-800">
                {assets.filter(a => a.type === 'image').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-purple-50 border-purple-200">
          <div className="flex items-center gap-3">
            <Video className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-sm text-purple-600">Videos</p>
              <p className="text-2xl font-bold text-purple-800">
                {assets.filter(a => a.type === 'video').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-green-600">Documents</p>
              <p className="text-2xl font-bold text-green-800">
                {assets.filter(a => a.type === 'document').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-center gap-3">
            <Star className="h-8 w-8 text-yellow-600" />
            <div>
              <p className="text-sm text-yellow-600">Starred</p>
              <p className="text-2xl font-bold text-yellow-800">
                {assets.filter(a => a.isStarred).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search assets by name or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Asset Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'space-y-4'
      }>
        {filteredAssets.map((asset) => {
          const TypeIcon = getTypeIcon(asset.type)
          
          if (viewMode === 'grid') {
            return (
              <Card key={asset.id} className="group hover:shadow-lg transition-all cursor-pointer">
                <div className="relative">
                  {/* Asset Preview */}
                  <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center overflow-hidden">
                    {asset.thumbnail ? (
                      <img 
                        src={asset.thumbnail} 
                        alt={asset.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <TypeIcon className="h-12 w-12 text-gray-400" />
                    )}
                    {asset.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    )}
                  </div>
                  
                  {/* Star button */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`absolute top-2 right-2 ${
                      asset.isStarred ? 'text-yellow-500' : 'text-gray-400'
                    }`}
                    onClick={() => toggleStar(asset.id)}
                  >
                    <Star className={`h-4 w-4 ${asset.isStarred ? 'fill-current' : ''}`} />
                  </Button>
                </div>
                
                <CardContent className="p-4">
                  <div className="mb-2">
                    <Badge className={getTypeColor(asset.type)}>
                      <TypeIcon className="h-3 w-3 mr-1" />
                      {asset.type}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold mb-1 truncate" title={asset.name}>
                    {asset.name}
                  </h3>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Category: {asset.category}</p>
                    <p>Size: {asset.size}</p>
                    {asset.dimensions && <p>Dimensions: {asset.dimensions}</p>}
                    {asset.duration && <p>Duration: {asset.duration}</p>}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {asset.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {asset.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{asset.tags.length - 2} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex gap-1 mt-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          } else {
            return (
              <Card key={asset.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {asset.thumbnail ? (
                      <img 
                        src={asset.thumbnail} 
                        alt={asset.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <TypeIcon className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{asset.name}</h3>
                      <Badge className={getTypeColor(asset.type)}>
                        {asset.type}
                      </Badge>
                      {asset.isStarred && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{asset.category}</span>
                      <span>{asset.size}</span>
                      {asset.dimensions && <span>{asset.dimensions}</span>}
                      {asset.duration && <span>{asset.duration}</span>}
                      <span>Modified: {new Date(asset.lastModified).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {asset.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => toggleStar(asset.id)}
                      className={asset.isStarred ? 'text-yellow-500' : ''}
                    >
                      <Star className={`h-4 w-4 ${asset.isStarred ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>
              </Card>
            )
          }
        })}
      </div>

      {filteredAssets.length === 0 && (
        <Card className="p-12 text-center">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No assets found</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search terms' : 'Upload your first asset to get started'}
          </p>
        </Card>
      )}

      {/* Quick Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Quick Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Drop files here to upload</h3>
            <p className="text-gray-500 mb-4">
              Support for images, videos, documents, and audio files up to 100MB
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
