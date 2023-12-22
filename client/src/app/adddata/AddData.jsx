"use client";
import React, { useState } from "react";
import loginSvg from "../../assets/login.svg";
import Image from "next/image";

import { taost, toast } from "react-toastify";

const AddData = () => {
  // console.log("this is add task component");

  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "none",
    // temp solution
    userId: "64a506ab413f1d5bcafcdbec",
  });

 
  return (
      <div className="grid grid-cols-12 justify-center">
      <div className="col-span-4 col-start-5 p-5 shadow-md rounded-lg bg-white">
        <div className="my-8 flex justify-center">
          <Image src={loginSvg} style={{ width: "50%" }} alt="Login banner" />
        </div>
        <h1 className="text-3xl text-center">Add your task here</h1>

        <form action="#!">
          <div className="mt-4">
            <label htmlFor="task_title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
              id="task_title"
              name="task_title"
              onChange={(event) => {
                setTask({
                  ...task,
                  title: event.target.value,
                });
              }}
              value={task.title}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="task_content" className="block text-sm font-medium mb-2">
              Content
            </label>
            <textarea
              className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
              id="task_content"
              rows={5}
              name="task_content"
              onChange={(event) => {
                setTask({
                  ...task,
                  content: event.target.value,
                });
              }}
              value={task.content}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="task_status" className="block text-sm font-medium mb-2">
              Status
            </label>
            <select
              id="task_status"
              className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
              name="task_status"
              onChange={(event) => {
                setTask({
                  ...task,
                  status: event.target.value,
                });
              }}
              value={task.status}
            >
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="mt-4 flex justify-center">
            <button className="bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800">
              Add Task
            </button>
            <button className="bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 ms-3">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddData;
