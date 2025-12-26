/** biome-ignore-all lint/suspicious/noExplicitAny: testing */
import { keepPreviousData } from "@tanstack/react-query"
import { rqClient } from "@/shared/api/instance"
import type { ApiSchemas } from "@/shared/api/schema"

type UseBeatsListParams = {
  limit?: number
  search?: string
  sort?: "createdAt" | "updatedAt" | "lastOpenedAt" | "name"
}

export const useBeatsList = ({
  limit = 5,
  search,
  sort,
}: UseBeatsListParams) => {
  const { data, isFetchingNextPage, isPending, hasNextPage } =
    rqClient.useInfiniteQuery(
      "get",
      "/beats",
      {
        params: {
          query: {
            page: 1,
            limit,
            search,
            sort,
          },
        },
      },
      {
        initialPageParam: 1,
        pageParamName: "page",
        getNextPageParam: (
          lastPage: ApiSchemas["BeatsResponse"],
          _: any,
          lastPageParams: any,
        ) =>
          Number(lastPageParams) < lastPage.totalPages
            ? Number(lastPageParams) + 1
            : null,

        placeholderData: keepPreviousData,
      },
    )

  const beats = data?.pages.flatMap((page) => page.list) ?? []

  return { beats, isFetchingNextPage, isPending, hasNextPage }
}
