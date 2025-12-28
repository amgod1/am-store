import { FC } from "react"
import { ApiSchemas } from "@/shared/api/schema"
import { Badge } from "@/shared/ui/kit/badge"

type BeatTags = {
  tags: ApiSchemas["Tag"][]
}

const BeatTags: FC<BeatTags> = ({ tags }) => {
  return (
    <div className="flex flex-row gap-2">
      {tags.map((tag) => (
        <Badge key={tag.id} variant="secondary">
          {tag.title}
        </Badge>
      ))}
    </div>
  )
}

export default BeatTags
