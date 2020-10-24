import { Button, FormGroup, Input } from './components/lib'

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
        <FormGroup>
          <label htmlFor="email">Email: </label>
          <Input
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="password">Password: </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormGroup>
        <Button variant="secondary" type="submit">
          Sign Up
        </Button>
      </form>
      <form onSubmit={handleLogin}>
        <FormGroup>
          <label htmlFor="email">Email: </label>
          <Input
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="password">Password: </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormGroup>
        <Button type="submit">Log In</Button>
      </form>
    </>
  )
}

export default UnauthenticatedApp
