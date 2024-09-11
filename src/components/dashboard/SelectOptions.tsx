import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectOptionsProps = {
    setOptions: (value: string) => void;
    optionsList: string[];
    option: string
    
}
const SelectOptions = ({option,setOptions,optionsList}:SelectOptionsProps) => {
  return (
    <Select value={option} onValueChange={(value) => setOptions(value)}>
      <SelectTrigger className="w-[150px] rounded-2xl border-gray-300 outline-none">
        <SelectValue/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            {optionsList.map((option,index) => (
                <SelectItem key={index} value={option}>{option}</SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectOptions;
