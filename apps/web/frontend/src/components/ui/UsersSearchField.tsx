import Input from './Input';
import styles from 'UsersSearchField.module.css';

const getUsers = async () => {
    // TODO: Implement user search API call, it should use a 200ms debounce to avoid excessive calls, it should use current value in the Input component as the search query, and it should return an array of users with user names matching the search query
    return [];
}

export default function UsersSearchField() {
    return (
        <>
            <Input type="search" name="userSearch" value="" onChange={getUsers} placeholder="Search users..." className={styles.searchField} />
            <ul className={styles.resultsList}>
            </ul>
        </>
    )
}