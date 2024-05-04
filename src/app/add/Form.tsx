"use client";
// !-- ここはClient Componentです！！！------!

import { useFormState,useFormStatus } from "react-dom";
import type {submitResponse} from "./onSubmit";
import type { Time } from "@prisma/client";
import { Modal } from "@mantine/core";

const RequireAsterisk = () => {
  return <a className="text-red-600">*</a>;
};

// useFormStatusでpendingを実装するために分離
const SubmitButton = () => {
  const {pending} = useFormStatus();
  return (
      <button
        type="submit"
        className="w-full text-black bg-cyan-500 hover:bg-cyan-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        disabled={pending}
      >
        {pending ? "Submitting..." : "Submit"}
      </button>
  )
}

// DBから取得したTimeのリストをSelectタグに変換
const SelectTime = ({times}:{times:Time[]}) => {
    return(
            <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" id="time"
                name='time'
            >
                <option>Select one</option>
                {times && times.map((time) => (
                    <option key={time.id} value={time.time}>{time.time}</option>
                ))}
            </select>
    )
}

export const SuccessModal = ({data}:{data:submitResponse}) => {
  // preIdとIdが違う時にModalを開く
  const idRef = useRef(0);
  // ProviderからくるModalのState
  const {opened,setModal}:{opened:boolean,setModal:(n:boolean) => void} = useModalState();
  console.log(data);
  if(data.isSuccess && idRef.current != data.data?.id){
    idRef.current = data.data?.id as number;
    setModal(true);
  }
  if(data.isSuccess == false) console.log("Error Occurred!!");
  return(
    <Modal opened={opened} onClose={() => setModal(false)} size="auto" withCloseButton={false}>
      {data.data ? <Success data={data.data}/> : null}
    </Modal>
  )
}


import {Success} from './Success';
import { useModalState } from "./ModalProvider";
import { memo, useRef } from "react";

export const Form = ({onSubmit,times}:{onSubmit:any,times:Time[],currentTicketNumber:number}) => {
  //*TODO FormReset用のRef 未実装 
  const formRef = useRef<HTMLFormElement>(null);
  // DBに登録した後に，エラーハンドリングする用
  const [responseString,formAction] = useFormState(onSubmit,"{}");
  // useFormStateがplain Objectしか返せないから，パワー
  const response = JSON.parse(responseString) as submitResponse;
  const MemoedModal = memo(SuccessModal);

  console.log(response.data);
  return (
    <>
    <MemoedModal data={response}/>
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Jenga
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Registration
            </h1>
            <form className="space-y-4 md:space-y-6" action={formAction} ref={formRef}>
              <div>
                <label
                  htmlFor="time"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Time
                  <RequireAsterisk />
                </label>
                <SelectTime times={times}/>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                  <RequireAsterisk />
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Jack"
                  required
                />
              </div>
              <div className="flex -mx-3">
                <div className="w-1/2 px-3">
                  <label
                    htmlFor="adults"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Adults
                    <RequireAsterisk />
                  </label>
                  <input
                    type="number"
                    min={0}
                    name="adults"
                    id="adults"
                    placeholder="0"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="w-1/2 px-3">
                  <label
                    htmlFor="children"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Children
                    <RequireAsterisk />
                  </label>
                  <input
                    type="number"
                    min={0}
                    name="children"
                    id="children"
                    placeholder="0"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Remarks
                </label>
                <textarea
                  id="description"
                  placeholder="description"
                  name='description'
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <SubmitButton/>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};
