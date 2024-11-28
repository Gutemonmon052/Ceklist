"use client";

import { Card } from "@/components/card";
import { Navbar } from "@/components/navbar";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [inputValues, setInputValues] = useState("");
  const [status, setStatus] = useState("typing");
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState<JSX.Element[]>([]);
  const [countTask, setCountTask] = useState(0);
  const [countCom, setTaskCom] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const calPercentage = () => {
      if (countTask == 0) {
        setPercentage(0);
      } else {
        setPercentage(Math.round(((countCom) / countTask) * 100));
      }
    };
    calPercentage();
  }, [countTask, countCom + 1]);

  const handelTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues(e.target.value);
  };

  const handleDelete = async (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo, index) => index !== id));
    setTaskCom(countCom - 1);
  };

  const handleCompleted = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, index) => {
        if (index == id) {
          setTaskCom(countCom + 1);
        }
        return todo;
      })
    );
  };

  const handleSubmit = async () => {
    await submitToDo(inputValues);
    setStatus("submitting");
    try {
      setStatus("submitted");
    } catch (error: boolean | any) {
      setStatus("error");
      setError(error);
    }
  };

  const submitToDo = async (inputValues: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let sError = inputValues.length <= 0;
        if (sError) {
          reject("Error");
        } else {
          setCountTask(1 + countTask);
          const newCard = (
            <Card
              task={inputValues}
              numtask={countTask + 1}
              handleDelete={() => handleDelete(countTask)}
              handleComplete={() => handleCompleted(countTask)}
            />
          );
          setTodos((prevTodos) => [...prevTodos, newCard]);
          resolve("success");
        }
      }, 1500);
    });
  };

  const useRealTime = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    return time;
  };

  const currentTime = useRealTime();

  const useRealTimeDate = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setDate(new Date());
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const currentDate = useRealTimeDate();
  const date = new Date(currentDate);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  return (
    <div>
      <Navbar total={countTask} completed={countCom} percentage={percentage} />
      <div>
        <div className="date-time-content">
          <div className="date-content">
            <div className="date-month">
              <h2>{day}</h2>
              <p>{month.slice(0, 3)}</p>
            </div>
            <div className="year">
              <p>{year}</p>
            </div>
          </div>
          <div className="time">
            <h3>{currentTime.toLocaleTimeString()}</h3>
          </div>
        </div>
        <div className="content1">
          <div className="list-content">
            {todos.map((todo, index) => (
              <Card
                key={index}
                task={todo.props.task}
                numtask={todo.props.numtask}
                handleComplete={() => handleCompleted(index)}
                handleDelete={() => handleDelete(index)}
              />
            ))}
          </div>
        </div>
        <div className="content2">
          <div className="todo-notif">
            <p>tunggu sebentar</p>
          </div>
          <div className="todo-chat">
            <input
              type="text"
              name="todo"
              onChange={handelTextInput}
              placeholder="Do something bud..."
            />
            <button>
              <Image
                src="../assets/Send-Icon.svg"
                onClick={() => handleSubmit()}
                alt="send"
                width={30}
                height={30}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

