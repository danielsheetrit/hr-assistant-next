import React, {
  createContext,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import { localStorageAvailable, isValidToken, setSession } from "@/utils";

const HOST = process.env.HOST;

const Types = {
  INITIAL: "INITIAL",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  authHeader: null,
};

const cleanUser = (user) => {
  const parsed = JSON.parse(user);
  const newUser = { ...parsed };
  newUser._id = newUser._id.$oid;
  delete newUser.password;
  return newUser;
};

function reducer(state, action) {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
      authHeader: action.payload.authHeader,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
      authHeader: action.payload.authHeader,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      authHeader: null,
    };
  }
  return state;
}

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable
        ? localStorage.getItem("accessToken")
        : "";

      if (accessToken && isValidToken(accessToken)) {
        const authHeader = setSession(accessToken);

        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        };

        const res = await fetch(`${HOST}/user-by-id`, options);
        const data = await res.json();

        const { user } = data;
        const cleanedUser = cleanUser(user);

        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user: cleanedUser,
            authHeader,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
            authHeader: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
          authHeader: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = useCallback(async (username, password) => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await fetch(`${HOST}/login`, options);
      const data = await res.json();

      const { token, user } = data;
      const cleanedUser = cleanUser(user);
      const authHeader = setSession(token);

      dispatch({
        type: Types.LOGIN,
        payload: {
          user: cleanedUser,
          authHeader,
        },
      });

      return res;
    } catch (err) {
      console.log(err);
      dispatch({
        type: Types.LOGOUT,
      });
    }
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: "jwt",
      login,
      logout,
      authHeader: state.authHeader,
    }),
    [
      state.authHeader,
      state.isAuthenticated,
      state.isInitialized,
      state.user,
      login,
      logout,
    ]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};
