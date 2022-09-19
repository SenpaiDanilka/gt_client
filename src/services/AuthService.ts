import Cookie from 'js-cookie'

export async function logout(navigate: Function) {
  Cookie.remove('fauna-session')
  return navigate('/sign_in')
}