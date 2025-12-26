import { Loader2 } from 'lucide-react'

const Loading = () => {
  return (
  <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
      </div>
  )
}

export default Loading