import { AddIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton, Stack, useColorModeValue } from '@chakra-ui/react';
import useColumnDrop from '../hook/useColumnDrop';
import useColumnTasks from '../../components/hook/useColumnTasks';
import { ColumnType } from '../../utils/enums';
import Task from '../Task/Task';
import { AutoResizeTextarea } from '../AutoResizeTextArea/AutoResizeTextArea';
import { useState } from 'react';
import style from './Column.module.css';

function Column({ column }: { column: ColumnType }) {
  const { tasks, addEmptyTask, deleteTask, dropTaskFrom, swapTasks, updateTask } =
    useColumnTasks(column);

  const { dropRef, isOver } = useColumnDrop(column, dropTaskFrom);

  const ColumnTasks = tasks.map((task, index) => (
    <Task
      key={task.id}
      task={task}
      index={index}
      onDropHover={swapTasks}
      onUpdate={updateTask}
      onDelete={deleteTask}
    />
  ));
  //
  const [columnTitle, setColumnTitle] = useState(column.toString());
  const [submitActive, setSubmitActive] = useState(false);
  function showSubmit() {
    setSubmitActive(true);
  }
  function handleCancelInput() {
    setSubmitActive(false);
  }
  //TODO
  function handleSubmitInput(e: React.MouseEvent<HTMLButtonElement>) {
    setColumnTitle('+');
    console.log(columnTitle);
  }
  return (
    <Box>
      <Stack
        ref={dropRef}
        display="flex"
        justifyContent="s"
        direction={{ base: 'row', md: 'column' }}
        h={{ base: 300, md: 600 }}
        p={4}
        mt={2}
        spacing={1}
        bgColor="white"
        rounded="lg"
        boxShadow="md"
        overflow="auto"
        opacity={isOver ? 0.85 : 1}
      >
        <Heading fontSize="md" letterSpacing="wide" position="relative">
          <AutoResizeTextarea
            id={column}
            border="none"
            fontWeight="bold"
            px={2}
            py={1}
            rounded="lg"
            fontSize="1.2rem"
            onFocus={showSubmit}
          >
            {columnTitle}
          </AutoResizeTextarea>
          {submitActive && (
            <div className={style.title__buttons}>
              <IconButton
                zIndex={100}
                aria-label={column}
                size="sm"
                colorScheme="solid"
                color="black"
                icon={<CheckIcon />}
                opacity={1}
                _groupHover={{
                  opacity: 1,
                }}
                onClick={(e) => handleSubmitInput(e)}
              />
              <IconButton
                zIndex={100}
                aria-label="cancel"
                size="sm"
                colorScheme="solid"
                color="black"
                icon={<CloseIcon />}
                opacity={1}
                _groupHover={{
                  opacity: 1,
                }}
                onClick={handleCancelInput}
              />
            </div>
          )}
        </Heading>
        {ColumnTasks}
      </Stack>
      <IconButton
        size="xs"
        w="full"
        color={useColorModeValue('gray.500', 'gray.400')}
        bgColor={useColorModeValue('gray.100', 'gray.700')}
        _hover={{ bgColor: useColorModeValue('gray.200', 'gray.600') }}
        py={2}
        mt={2}
        variant="solid"
        onClick={addEmptyTask}
        colorScheme="black"
        aria-label="add-task"
        icon={<AddIcon />}
        boxShadow="md"
      />
    </Box>
  );
}

export default Column;
