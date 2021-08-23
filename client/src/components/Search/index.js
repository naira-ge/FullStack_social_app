import { useDispatch } from 'react-redux';
import { filterSearchPost } from '../../features/posts/postAction';

import { FaSearch } from "react-icons/fa";
import styles from './styles.module.scss';

const Search = () => {
    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        const { value } = e.target;
        dispatch(filterSearchPost(value));
    };

    return (
        <div className={styles.searchbar}>
            <FaSearch className={styles.searchIcon} />
            <input
                type="text"
                name="search"
                autoComplete="off"
                onChange={handleOnChange}
                placeholder="Search"
                className={styles.searchInput} />
        </div>
    )
};

export default Search;
