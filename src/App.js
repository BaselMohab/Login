import React, {useReducer} from "react";

const initialState = {
  username: '',
  password: '',
  loggedin: false,
  error: ''
}

const LoginReducer = (state, action) => {
  switch(action.type){
    case 'field' : {
      return{...state, [action.feildName]: action.payload }
    }
    
    case 'logIn' : {
      return{...state, error: '' }
    }
    
    case 'success' : {
      return {
        ...state, loggedin: true, password: ''
      }
    }
    case 'error' : {
      return {
        ...state, error: 'Invalid username or password', username: '', password: '',
      }
    }
    case 'logOut': {
      return {...state, loggedin: false}
    }
    default : state
  }
}

function App() {


  const [state, dispatch] = useReducer(LoginReducer, initialState)

const handleSubmit = (e) => {
  e.preventDefault();
  dispatch({
    type: 'logIn'
  })
  try{
    if (state.username === 'Basel' && state.password === 'basel@1998'){
      dispatch({
        type: 'success'
      });
    }else{
      throw error
    }
  }
  catch(error){
    dispatch({type: 'error'})
  }
}

  return (
    <div className="App">
      <h1 className="text-2xl text-indigo-950  text-center font-semibold mt-7 ">Login To Your Account</h1>
      <div>
        {state.loggedin ? (
          <>
          <div className="flex flex-col items-center gap-4 mt-10">
          <h1 className="text-center text-3xl font-semibold">Welcome {state.username} !</h1>
          <button className=" text-center border rounded-lg bg-indigo-950 px-5 py-2 text-white hover:bg-indigo-600"
          onClick={() => dispatch({type: 'logOut'})}
          >Log Out</button>
          </div>
          </>
        ) : (
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4 mt-10 py-3">
              <input
              className="border rounded-md p-3 border-indigo-950"
              type="text"
              placeholder="Username"
              value={state.username}
              autoComplete="username"
              onChange={(e)=> dispatch({
                type: 'field',
                feildName: 'username',
                payload: e.target.value
              })}
              />
              <input
              className="border rounded-md p-3 border-indigo-950"
              type="password"
              placeholder="Password"
              value={state.password}
              autoComplete="currentPassword"
              onChange={(e)=> dispatch({
                type: 'field',
                feildName: 'password',
                payload: e.target.value
              })}
              />
              <button className="border rounded-lg bg-indigo-950 px-5 py-2 text-white hover:bg-indigo-600"
              type="submit"
              >Login</button>
            </form>
            <p className="text-red-600 text-center">{state.error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
