import { useState } from "react";
import {
  Box,
  Text,
  Heading,
  Input,
  Button,
  Stack,
  HStack,
  Container,
  Spacer,
  Checkbox,
  useCheckboxGroup,
} from "@chakra-ui/react";

const Header = () => (
  <Box bg="teal.100" py={1}>
    <HStack mx={4} align="baseline">
      <Heading>react todo</Heading>
      <Text fontSize="sm">with chakra ui</Text>
      <Text></Text>
    </HStack>
  </Box>
);

const Todo = () => {
  const [todo, setTodo] = useState<{ title: string }[]>([]);

  const [input, setInput] = useState<string>("");

  const { value, setValue, getCheckboxProps } = useCheckboxGroup();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleAdd = () => {
    // when input is empty, do nothing
    if (!input) {
      return;
    }
    setTodo([...todo, { title: input }]);
    setInput("");
  };

  const handleDone = () => {
    setTodo(todo.filter((_, i) => !value.includes(i.toString())));
    // clear checkbox checked state
    setValue([]);
  };

  return (
    <Box>
      <Container>
        <Stack>
          <HStack>
            <Input
              type="text"
              placeholder="Enter your task"
              value={input}
              onChange={handleInput}
            />
            <Button onClick={handleAdd}>Add</Button>
          </HStack>
          <Stack>
            {todo.map((a, i) => (
              <Checkbox key={i} {...getCheckboxProps({ value: i })}>
                {a.title}
              </Checkbox>
            ))}
            {todo.length === 0 && <Text>All tasks complited.</Text>}
            {todo.length !== 0 && (
              <Button isDisabled={value.length === 0} onClick={handleDone}>
                Done
              </Button>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default function App() {
  return (
    <Box>
      <Header />
      <Spacer py={2} />
      <Todo />
    </Box>
  );
}
