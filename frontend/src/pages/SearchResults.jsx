import React, { useContext, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
    const query = useQuery();
    const searchTerm = query.get('q')?.toLowerCase() || "";
    const { products } = useContext(ShopContext);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(searchTerm)
        );
        setResults(filtered);
    }, [products, searchTerm]);

    return (
        <div className="sm:px-20 px-10 py-10">
            <h1 className="text-[10px] uppercase text-[#A9ABAE] mb-4">
                Search Results for: "{searchTerm}"
            </h1>

            {results.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {results.map(product => (
                        <Link to={`/product/${product._id}`} key={product._id}>
                            <div className="p-6 rounded">
                                <img
                                    src={product.variants?.[0]?.images?.[0] || 'https://via.placeholder.com/150'}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                                <h2 className="mt-2 text-[10px] uppercase text-[#A9ABAE]">
                                    {product.name}
                                </h2>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center text-xl w-[100vw] h-[60vh] flex items-center justify-center">
                    <p className="text-[#A9ABAE]">No products found.</p>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
