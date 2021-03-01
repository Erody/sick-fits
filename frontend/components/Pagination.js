import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

export const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        _allProductsMeta {
            count
        }
    }
`;

function Pagination({ page }) {
    const { data, error, loading } = useQuery(PAGINATION_QUERY);
    if (loading) return 'Loading...';
    if (error) return <DisplayError error={error} />;
    const { count } = data._allProductsMeta;
    const pageCount = Math.ceil(count / perPage);
    return (
        <PaginationStyles>
            <Head>
                <title>Sick Fits - Page {page} of ?</title>
            </Head>
            <Link href={`/products/${page - 1}`}>
                <a aria-disabled={page <= 1}>⬅ Prev</a>
            </Link>
            <p>
                Page {page} of {pageCount}
            </p>
            <p>{count} items total</p>
            <Link href={`/products/${page + 1}`}>
                <a aria-disabled={page >= pageCount}>Next ➡</a>
            </Link>
        </PaginationStyles>
    );
}

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
};

export default Pagination;
