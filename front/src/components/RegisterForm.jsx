"use client";

const RegisterForm = () => {
  return (
    <form className="flex flex-col gap-10  text-black" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="py-2 px-4 rounded-sm bg-input placeholder:bg-input"
      />
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="py-2 px-4 rounded-sm bg-input placeholder:bg-input"
      />
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="py-2 px-4 rounded-sm bg-input placeholder:bg-input"
      />

      <label htmlFor="" className="text-white">
        <input type="checkbox" className="mr-3" />I agree with the{" "}
        <a href="#" className="text-button">
          Terms and conditions.
        </a>
      </label>
      <button
        type="submit"
        className="text-white text-center rounded-sm font-bold px-4 py-2 bg-button duration-300 hover:bg-buttonHover"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
