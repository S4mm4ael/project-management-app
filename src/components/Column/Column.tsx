import { AddIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton, Stack, useColorModeValue } from '@chakra-ui/react';
import useColumnDrop from '../hook/useColumnDrop';
import useColumnTasks from '../../components/hook/useColumnTasks';
import { ColumnType } from '../../utils/enums';
import Task from '../Task/Task';
import { AutoResizeTextarea } from '../AutoResizeTextArea/AutoResizeTextArea';
import { useState } from 'react';
import style from './Column.module.css';
import { Columns } from '../../utils/types';
import { updateColumn } from '../../utils/fetch';
import ModalConfirm from '../ModalConfirm/ModalConfirm';

function Column({
  column,
  title,
  boardId,
  columnId,
  handleGetColumns,
}: {
  column: ColumnType;
  item: Columns;
  title: string;
  boardId: string | null;
  columnId: string;
  handleGetColumns: () => Promise<void>;
}) {
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
  const TOKEN = localStorage.getItem('token');
  const BID = boardId;
  const ID = columnId;
  const [columnTitle, setColumnTitle] = useState(title);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [responseError, setResponseError] = useState(' ');

  const [submitActive, setSubmitActive] = useState(false);
  function showSubmit() {
    setSubmitActive(true);
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitActive(false);
  }

  const handleUpdateColumn = async () => {
    try {
      const body = {
        title: columnTitle,
        order: 3,
      };
      const response = await updateColumn(TOKEN, boardId, columnId, body);

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box id={ID}>
        <Stack
          ref={dropRef}
          display="flex"
          justifyContent="s"
          direction={{ base: 'row', md: 'column' }}
          h={{ base: 300, md: 430 }}
          w={220}
          p={2}
          mt={2}
          spacing={3}
          bgColor="white"
          rounded="lg"
          boxShadow="md"
          overflow="auto"
          opacity={isOver ? 0.85 : 1}
        >
          <Heading fontSize="md" letterSpacing="wide" position="relative">
            <form onSubmit={(e) => handleSubmit(e)}>
              <AutoResizeTextarea
                id={column}
                border="none"
                fontWeight="bold"
                px={2}
                py={1}
                rounded="lg"
                fontSize="1.2rem"
                onFocus={showSubmit}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setColumnTitle(e.target.value);
                }}
                value={columnTitle}
              ></AutoResizeTextarea>
              {submitActive && (
                <div className={style.title__buttons}>
                  <IconButton
                    type="submit"
                    zIndex={100}
                    id={column}
                    aria-label={column}
                    size="sm"
                    colorScheme="solid"
                    color="black"
                    icon={<CheckIcon />}
                    opacity={1}
                    _groupHover={{
                      opacity: 1,
                    }}
                    onClick={() => {
                      handleUpdateColumn();
                      handleGetColumns();
                    }}
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
                    onClick={() => {
                      setColumnTitle('');
                      setSubmitActive(false);
                    }}
                  />
                </div>
              )}
            </form>
          </Heading>
          {ColumnTasks}
        </Stack>
        <IconButton
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
        <IconButton
          w="full"
          color={useColorModeValue('white.500', 'gray.400')}
          bgColor={useColorModeValue('red.500', 'red.700')}
          _hover={{ bgColor: useColorModeValue('red.300', 'red.600') }}
          py={2}
          mt={2}
          variant="solid"
          onClick={() => setActiveModal(true)}
          colorScheme="black"
          aria-label="delete-column"
          icon={<CloseIcon />}
          boxShadow="md"
        />
      </Box>
      <ModalConfirm
        token={TOKEN}
        active={activeModal}
        setActive={setActiveModal}
        setError={setResponseError}
        boardId={BID}
        columnId={ID}
        handleGetColumns={handleGetColumns}
      />
    </>
  );
}

export default Column;
