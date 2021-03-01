import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
    return {
        keyArgs: false, // tells apollo we will take care of everything
        read(existing = [], { args, cache }) {
            const { skip, first } = args;
            // Read the number of items on the page from the cache
            const data = cache.readQuery({ query: PAGINATION_QUERY });
            const count = data?._allProductsMeta?.count;
            const page = skip / first + 1;
            const pages = Math.ceil(count / first);
            // Check if we have existing items
            const items = existing.slice(skip, skip + first).filter((x) => x);
            // if
            // there are items
            // and there aren't enough items to satisfy how many were requested (perPage)
            // and we are on the last page
            // then just send it
            if (items.length && items.length !== first && page === pages) {
                return items;
            }
            if (items.length !== first) {
                // we don't have any items, we must go to the network to fetch them
                return false;
            }
            if (items.length) {
                console.log(`There are ${items.length} items in the cache.`);
                return items;
            }
            return false; // fallback to network
        },
        merge(existing, incoming, { args }) {
            const { skip, first } = args;
            const merged = existing ? existing.slice(0) : [];
            for (let i = skip; i < skip + incoming.length; i += 1) {
                merged[i] = incoming[i - skip];
            }
            return merged;
        },
    };
}
