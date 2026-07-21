import type { FilterOptionsFn, FilterOptionsState } from './autocomplete.types';

export interface CreateFilterOptionsConfig<T> {
  /** Strip diacritics before comparing. Default `true`. */
  ignoreAccents?: boolean;
  /** Lowercase both sides before comparing. Default `true`. */
  ignoreCase?: boolean;
  /** Cap the number of suggestions returned. Default `null` (no cap). */
  limit?: number | null;
  /** Match anywhere in the string, or only at the start. Default `'any'`. */
  matchFrom?: 'any' | 'start';
  /** Turn an option into the string that gets matched. Defaults to the label. */
  stringify?: (option: T) => string;
  /** Trim trailing whitespace off the query. Default `false`. */
  trim?: boolean;
}

const stripDiacritics = (value: string): string =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

/**
 * Builds a `filterOptions` function. Same knobs as MUI's `createFilterOptions`.
 *
 *   filterOptions = createFilterOptions({ matchFrom: 'start', limit: 100 })
 */
export function createFilterOptions<T>(
  config: CreateFilterOptionsConfig<T> = {},
): FilterOptionsFn<T> {
  const {
    ignoreAccents = true,
    ignoreCase = true,
    limit = null,
    matchFrom = 'any',
    stringify,
    trim = false,
  } = config;

  return (options: readonly T[], state: FilterOptionsState<T>): T[] => {
    let query = trim ? state.inputValue.trim() : state.inputValue;
    if (ignoreCase) query = query.toLowerCase();
    if (ignoreAccents) query = stripDiacritics(query);

    const filtered = query
      ? options.filter((option) => {
          let candidate = String(
            (stringify ?? state.getOptionLabel)(option),
          );
          if (ignoreCase) candidate = candidate.toLowerCase();
          if (ignoreAccents) candidate = stripDiacritics(candidate);
          return matchFrom === 'start'
            ? candidate.startsWith(query)
            : candidate.includes(query);
        })
      : [...options];

    return limit == null ? filtered : filtered.slice(0, limit);
  };
}

/** The filter used when none is supplied — matches MUI's default. */
export const defaultFilterOptions = createFilterOptions<never>();

/** Pass this as `filterOptions` when the server already filtered (search-as-you-type). */
export const passThroughFilter = <T,>(options: readonly T[]): T[] => [...options];
