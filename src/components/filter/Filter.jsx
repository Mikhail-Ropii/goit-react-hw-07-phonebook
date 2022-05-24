import { useContacts } from 'components/redux/Slices';

export const Filter = () => {
  const { filter, filterContacts } = useContacts();

  const onChangeFilter = evt => {
    filterContacts(evt.currentTarget.value);
  };

  return (
    <form>
      <label>
        Find contacts by name
        <input type="text" value={filter} onChange={onChangeFilter} />
      </label>
    </form>
  );
};
