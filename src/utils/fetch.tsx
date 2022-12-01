import { BoardsBody, Body, ColumnBody } from './types';

const url = 'https://final-task-backend-production-e4cb.up.railway.app';

export async function createUser(body: Body) {
  try {
    const response = await fetch(`${url}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (response.status === 200) {
      const user = await response.json();
      console.log('succsess sign up', user);
      return user;
    }
    if (response.status !== 200) {
      throw new Error(`Something went wrong... Error code: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function loginUser(body: Body) {
  try {
    const response = await fetch(`${url}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (response.status === 200) {
      const user = await response.json();
      console.log('succsess sign in', user);
      return user;
    }
    if (response.status !== 200) {
      throw new Error(`Something went wrong... Error code: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getUsers(token: string | null) {
  try {
    const response = await fetch(`${url}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const users = await response.json();
      return users;
    }
    if (response.status !== 200) {
      throw new Error(`Something went wrong... Error code: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function putUser(id: string | null, token: string | null, body: Body) {
  try {
    const response = await fetch(`${url}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (response.status === 200) {
      const user = await response.json();
      return user;
    }
    if (response.status !== 200) {
      throw new Error(`Something went wrong... Error code: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(id: string | null, token: string | null) {
  try {
    const response = await fetch(`${url}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const user = await response.json();
      return user;
    }
    if (response.status !== 200) {
      throw new Error(`Something went wrong... Error code: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getBoards(token: string | null) {
  try {
    const response = await fetch(`${url}/boards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const boards = await response.json();
      return boards;
    }
    if (response.status !== 200) {
      throw new Error(`Something went wrong... Error code: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createBoard(body: BoardsBody, token: string | null) {
  try {
    const response = await fetch(`${url}/boards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (response.status === 200) {
      const board = await response.json();
      console.log('succsess', board);
      return board;
    }
    if (response.status !== 200) {
      throw new Error(`Something went wrong... Error code: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getBoard(token: string | null, boardId: string | null) {
  try {
    const response = await fetch(`${url}/boards/${boardId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const board = await response.json();
      return board;
    }
    if (response.status !== 200) {
      throw new Error(`Something went wrong... Error code: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getColumns(token: string | null, boardId: string | null) {
  try {
    const response = await fetch(`${url}/boards/${boardId}/columns`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const columns = await response.json();
      return columns;
    }
    if (response.status !== 200) {
      throw new Error(`Something went wrong... Error code: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createColumn(body: ColumnBody, token: string | null, boardId: string | null) {
  try {
    const response = await fetch(`${url}/boards/${boardId}/columns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (response.status === 200) {
      const column = await response.json();
      console.log('succsess', column);
      return column;
    }
    if (response.status !== 200) {
      throw new Error(`Something went wrong... Error code: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}
