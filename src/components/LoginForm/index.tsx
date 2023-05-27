import { ButtonComponent } from 'components/Button'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { useRouter } from 'next/router'
import { InputContainer } from 'components/InputContainer'
import { useAuth } from 'context/AuthContext'

const LoginForm: React.FC = (): JSX.Element | null => {
  // State
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [countdownTime, setCountdownTime] = React.useState<number>(5)
  const [logInSuccess, setLogInSuccess] = React.useState<boolean>(false)
  const [userNotFound, setUserNotFound] = React.useState<boolean>(false)
  const [passwordInvalid, setPasswordInvalid] = React.useState<boolean>(false)

  const { user } = useAuth()
  const router = useRouter()

  const login = (email: string, password: string) => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLogInSuccess(true)
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          setUserNotFound(true)
        } else if (error.code === 'auth/wrong-password') {
          setPasswordInvalid(true)
        }
      })
  }
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    login(email, password)
  }
  const redirect = () => {
    router.push('/')
    return null
  }
  if (user && user.uid) {
    setTimeout(() => {
      if (countdownTime > 0) {
        setCountdownTime(countdownTime - 1)
      }
    }, 1000)
    return countdownTime > 0 ? (
      <div>
        <h1>Logged in!</h1>
        <p>Redirecting in {countdownTime}</p>
      </div>
    ) : (
      redirect()
    )
  }

  if (logInSuccess) {
    return redirect()
  }

  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-gray-800 border border-gray-700 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <InputContainer
                condition={userNotFound}
                type={'email'}
                labelName="Your email"
                onChange={(e) => {
                  setEmail(e.target.value)
                  setUserNotFound(false)
                }}
                placeHolder={'name@company.com'}
              />
              <InputContainer
                condition={passwordInvalid}
                type={'password'}
                labelName="Password"
                onChange={(e) => {
                  setPassword(e.target.value)
                  setPasswordInvalid(false)
                }}
                placeHolder="••••••••"
              />
              {userNotFound && <span className="text-xs text-pink">Email is not registered!</span>}
              {passwordInvalid && <span className="text-xs text-pink">Incorrect password!</span>}
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 bg-gray-700 border border-gray-600 rounded focus:ring-3 focus:ring-primary-600 ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium hover:underline text-primary-500">
                  Forgot password?
                </a>
              </div>
              <ButtonComponent type="submit" onClick={handleSubmit}>
                Sign in
              </ButtonComponent>
              <p className="text-sm font-light text-gray-400">
                Don’t have an account yet?{' '}
                <a href="/signup" className="font-medium hover:underline text-primary-500">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginForm
