function AuthenticatedApp({ handleLogout }) {
  return (
    <>
      <button onClick={handleLogout}>Log out</button>
    </>
  )
}

export default AuthenticatedApp
