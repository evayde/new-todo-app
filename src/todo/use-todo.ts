import { Plugins } from '@capacitor/core';
import { useEffect, useState } from 'react';
import * as CapacitorSQLPlugin from 'capacitor-data-storage-sqlite';

const { CapacitorDataStorageSqlite, Device } = Plugins;

export interface Todo {
  title: string;
  duedate: Date;
  done?: boolean;
}

const useTodo = () => {
  const [db, setDb] = useState<CapacitorSQLPlugin.CapacitorDataStorageSqlitePlugin>();
  const [todos, setTodos] = useState<Todo[]>([]);

  /**
   * returning web/android driver for sqlite, depending on the current platform
   * @param {string} platform - platform should be "web" or "android" 
   */
  const getAdapterByPlatform = (platform: string) => {
    let sqlLite;

    if (platform === "android") {
      sqlLite = CapacitorDataStorageSqlite as CapacitorSQLPlugin.CapacitorDataStorageSqlitePlugin;
    } 
    else if (platform === "web") {
      sqlLite = CapacitorSQLPlugin.CapacitorDataStorageSqlite;
    } 
    else {
      throw new Error("Unsupported feature");
    }

    return sqlLite;
  }

  /**
   * add a todo to database
   * @param {Todo} todo
   */
  const addTodo = async ({ title, duedate = new Date()}: Todo) => {
    if (!db || !title) {
      return;
    }

    const newTodos = [{title, duedate, done: false}, ...todos];
    await db.set({key: "todos", value: JSON.stringify(newTodos)});
    setTodos(newTodos);
  }

  /**
   * toggle a todo 
   * @param {Todo} todo
   */
  const toggleTodo = async ({title, duedate}: Todo) => {
    if (!db || !title) {
      return;
    }

    const newTodos = todos.map(t => {
      if (t.title === title && t.duedate === duedate) {
        t.done = !t.done;
      }

      return t;
    });
    await db.set({key: "todos", value: JSON.stringify(newTodos)});
    setTodos(newTodos)
  }

  /**
   * Initialize the database and select the right table
   */
  useEffect(() => {
    Device.getInfo()
      .then(async (info) => {
        const adapter = getAdapterByPlatform(info.platform);
        
        setDb(adapter);
        adapter.openStore({database: "todoapp", table: "todos"});
      })
      .catch(err => {
        console.log({err})
      });
  }, []);

  /**
   * Load initial todos.
   */
  useEffect(() => {
    if (!db) {
      return;
    }

    db.get({key: "todos"})
      .then((res: CapacitorSQLPlugin.capDataStorageResult) => {
        if (res) {
          setTodos(JSON.parse(res.value || "[]"));
        }
      });
  }, [db]);

  return { addTodo, todos, toggleTodo };
}

export default useTodo;