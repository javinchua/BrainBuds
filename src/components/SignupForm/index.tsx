import { ButtonComponent } from '../Button'
import { Auth, createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import React from 'react'
import { useRouter } from 'next/router'
import { InputContainer } from '../InputContainer'
import { useAuth } from 'context/AuthContext'
import { RedirectComponent } from '../Redirect'

export const SignupForm: React.FC = () => {
  // State
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [confirmPassword, setConfirmPassword] = React.useState<string>('')
  const [countdownTime, setCountdownTime] = React.useState<number>(5)
  const [signupSuccess, setSignupSuccess] = React.useState<boolean>(false)
  // TODO: Handle validations
  const [emailInUsed, setEmailInUsed] = React.useState<boolean>(false)
  const [passwordInvalid, setPasswordInvalid] = React.useState<boolean>(false)
  const [confirmPasswordValid, setConfirmPasswordValid] = React.useState<boolean>(false)
  const router = useRouter()

  const auth = getAuth()
  const { user } = useAuth()

  // For Dialog
  const [isOpen, setIsOpen] = React.useState<boolean>(true)
  const cancelButtonRef = React.useRef(null)

  // TODO: Handle sign up
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      setConfirmPasswordValid(false)
    } else {
      handleFirebaseUserCreation(auth, email, password)
    }
  }

  const handleFirebaseUserCreation = (auth: Auth, email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSignupSuccess(true)
      })
      .catch((error) => {
        console.error(error.code)
        if (error.code === 'auth/email-already-in-use') {
          setEmailInUsed(true)
        } else if (error.code === 'auth/weak-password') {
          setPasswordInvalid(true)
        }
      })
  }

  const redirect = () => {
    router.push('/')
    return null
  }
  if ((user && user.uid) || signupSuccess) {
    setTimeout(() => {
      if (countdownTime > 0) {
        setCountdownTime(countdownTime - 1)
      }
    }, 1000)
    return countdownTime > 0 ? (
      <RedirectComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        cancelButtonRef={cancelButtonRef}
        setLogInSuccess={setSignupSuccess}
      />
    ) : (
      redirect()
    )
  }

  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center h-screen px-8 py-8 mx-auto lg:py-0">
        <div className="w-full bg-gray-800 border border-gray-700 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
              Register for an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <InputContainer
                condition={emailInUsed}
                type={'email'}
                labelName="Your email"
                onChange={(e) => {
                  setEmail(e.target.value)
                  setEmailInUsed(false)
                }}
                placeHolder={'name@company.com'}
              />
              {emailInUsed && <span className="text-xs text-pink">Email is in use!</span>}
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
              {passwordInvalid && <span className="text-xs text-pink">Password invalid!</span>}
              <InputContainer
                condition={confirmPasswordValid}
                type={'password'}
                labelName="Confirm Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  setConfirmPasswordValid(false)
                }}
                placeHolder="••••••••"
              />
              {confirmPasswordValid === false && (
                <span className="text-xs text-pink">Password not equal!</span>
              )}
              <ButtonComponent type="submit" onClick={handleSubmit}>
                Register
              </ButtonComponent>
              <p className="text-sm font-light text-gray-400">
                Have an existing acccount?{' '}
                <a href="/login" className="font-medium hover:underline text-primary-500">
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
