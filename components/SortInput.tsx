// sorts value by the selected value i.e price, name, etc
interface SortInputProps {
  handleSort: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  sortValues: string[];
}

const SortInput = ({ handleSort, sortValues }: SortInputProps) => {
  return (
    <div>
      <select onChange={handleSort}>
        {sortValues.map((sortValue: string) => (
          <option key={sortValue} value={sortValue}>
            {sortValue}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortInput;
