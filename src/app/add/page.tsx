import { prisma } from '@/lib/prismaClient';
import type { Customer } from '@/lib/prismaClient';
import { onSubmit } from './onSubmit';

const RequireAsterisk = () => {
  return <a className="text-red-600">*</a>;
};

const Form = ({onSubmit}:{onSubmit:(event: FormData) => void}) => {
  return (
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
            <form className="space-y-4 md:space-y-6" action={onSubmit}>
              <div>
                <label
                  htmlFor="time"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Time
                  <RequireAsterisk />
                </label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  id="time"
                  name='time'
                >
                  <option >Select one</option>
                  <option value="4/3 12:00">4/3 12:00</option>
                  <option value="4/3 13:00">4/3 13:00</option>
                </select>
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
              <button
                type="submit"
                className="w-full text-black bg-cyan-500 hover:bg-cyan-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

import {Success} from './Success';

export default async function Home() {
  return (
    <div>
      <Form onSubmit={onSubmit}/>
      {/* <Success/> */}
    </div>
  )
}