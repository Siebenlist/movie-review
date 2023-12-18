const Settings = () => {
  return (
    <section className="flex flex-col justify-center mx-auto max-w-[900px]">
      <h1 className="text-4xl font-bold mt-5 mb-10 text-gray">
        Account Settings.
      </h1>
      <div className="flex flex-col gap-5 w-[500px] md:w-[900px]">
        <div class="max-w-sm mx-auto">
          <label class="block mb-2 text-sm font-medium text-gray-900">
            Change your username
          </label>
          <div className="inline-flex gap-3">
            <input
              type="username"
              class="bg-input border border-gray-300 text-white placeholder:text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              placeholder="username"
            />
            <button
              type="submit"
              class="text-white bg-button hover:bg-buttonHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
            >
              Update
            </button>
          </div>
        </div>
        <div class="max-w-sm mx-auto">
          <label class="block mb-2 text-sm font-medium text-gray-900">
            Change your email
          </label>
          <div className="inline-flex gap-3">
            <input
              type="email"
              class="bg-input border border-gray-300 text-white placeholder:text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              placeholder="email@email.com"
            />
            <button
              type="submit"
              class="text-white bg-button hover:bg-buttonHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
            >
              Update
            </button>
          </div>
        </div>
        <div class="max-w-sm mx-auto">
          <label class="block mb-2 text-sm font-medium text-gray-900">
            Change your password
          </label>
          <div className="inline-flex gap-3">
            <input
              type="password"
              class="bg-input border border-gray-300 text-white placeholder:text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              placeholder="password"
            />
            <button
              type="submit"
              class="text-white bg-button hover:bg-buttonHover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
