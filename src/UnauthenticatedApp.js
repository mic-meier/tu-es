function UnauthenticatedApp({
  handleSignUp,
  email,
  handleEmailChange,
  password,
  handlePasswordChange,
  handleLogin,
}) {
  return (
    <>
      <div>Hello</div>
      <div>Sign up:</div>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </>
  )
}

export default UnauthenticatedApp
