import Cookie from 'js-cookie'

export async function logout(navigate: Function) {
  Cookie.remove('fauna-session')
  localStorage.removeItem("userId")
  navigate ? navigate('/sign_in') : window.location.reload()
}