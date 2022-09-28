import Cookie from 'js-cookie'

export async function logout(navigate: Function) {
  Cookie.remove('fauna-session')
  localStorage.removeItem("userId")
  return navigate('/sign_in')
}