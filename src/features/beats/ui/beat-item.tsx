import { FaShoppingCart } from "react-icons/fa"
import { FaCirclePlay } from "react-icons/fa6"
import type { ApiSchemas } from "@/shared/api/schema"
import { Button } from "@/shared/ui/kit/button"
import { Card } from "@/shared/ui/kit/card"

type Beat = ApiSchemas["Beat"]

const BeatItem = ({ beat }: { beat: Beat }) => {
  const { title, bpm } = beat
  return (
    <Card className="p-3 flex flex-row justify-between items-center">
      <div className="flex flex-row items-center gap-4">
        <Button variant="icon">
          <FaCirclePlay size="2rem" />
        </Button>
        <div className="flex flex-col gap-1">
          <h3>{title}</h3>
          <p>{bpm} BPM</p>
        </div>
      </div>
      <Button variant="icon">
        <FaShoppingCart size={"1.5rem"} />
      </Button>
    </Card>
  )
}

export default BeatItem
