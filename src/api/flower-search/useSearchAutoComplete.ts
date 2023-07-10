import { useSuspenseQuery } from '@suspensive/react-query';

import { http } from '../core/axios';
import { RequestSuccess } from '../core/types';

export const useSearchAutoComplete = (
  keyword: string,
  { enabled }: { enabled?: boolean } = {}
) => {
  return useSuspenseQuery({
    queryKey: useSearchAutoComplete.queryKey(keyword),
    queryFn: () => useSearchAutoComplete.queryFn(keyword),
    enabled,
    staleTime: Infinity,
    select: (response) => {
      const { data } = response.data;
      return data.autocompletes;
    },
  });
};

interface Response {
  autocompletes: string[];
}

useSearchAutoComplete.queryKey = (keyword: string) =>
  ['flower-search', 'autocomplete', keyword] as const;

useSearchAutoComplete.queryFn = (keyword: string) =>
  http.get<RequestSuccess<Response>>('/flower-search/autocomplete', {
    params: { searchText: keyword },
  });
