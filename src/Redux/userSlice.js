import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { Logout, setCredentials } from "./auhSlice.js";

// zidUtilisateur
export const zidUtilisateur = createAsyncThunk(
  "user/zidUtilisateur",
  async (formValue, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/",
        formValue
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (
    { formValue, navigate, toast },
    { rejectWithValue, getState, dispatch }
  ) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/auth",
        formValue
      );

      // Stocker le token JWT dans un cookie
      Cookies.set("jwt", data.token, { expires: 1 });

      // Autres actions à effectuer après la connexion réussie
      toast.success("Logged In Successfully");

      dispatch(setCredentials(data));

      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (
    { formValue, navigate, toast },
    { rejectWithValue, getState, dispatch }
  ) => {
    axios.defaults.withCredentials = true;
    console.log(formValue);
    try {
      const { data } = await axios
        .post("http://localhost:5000/api/users", formValue)
        .then(() => {
          navigate("/login");
        })
        .then(() => {
          toast.success("Registred  Successfully");
        });

      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const AdminUpdateUtilisateur = createAsyncThunk(
  "user/AdminUpdateUtilisateur",
  async ({ id, ...formValue }, { rejectWithValue }) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/users/usersadmin/${id}`,
        formValue
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const updateProfile = createAsyncThunk(
//   "user/updateProfile",
//   async ({ id, ...formValue }, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.put(
//         `http://localhost:5000/api/users/profile`,
//         formValue
//       );
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

//
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (
    { formValue, toast, navigate },
    { rejectWithValue, getState, dispatch }
  ) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios
        .put("http://localhost:5000/api/users/profile", formValue)
        .then(() => {
          dispatch(Logout());
        });

      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

// getAllUser
export const getAllUtilisateurs = createAsyncThunk(
  "user/getAllUtilisateurs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// supprimerUtilisateur
export const supprimerUtilisateur = createAsyncThunk(
  "user/supprimerUtilisateur",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      return id; // Return the ID of the deleted user  for state update
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    utilisateurslkol: [], // Assurez-vous que le state est initialisé avec une valeur par défaut (tableau vide)
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loggedUser = action.payload;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
    });
    ///////////zidutilisateur ///////////////////////////
    builder.addCase(zidUtilisateur.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(zidUtilisateur.fulfilled, (state, action) => {
      state.utilisateurslkol.push(action.payload); // Add the new film to the array
      state.loading = false;
    });
    builder.addCase(zidUtilisateur.rejected, (state, action) => {
      state.loading = false;
    });
    /////////////////////////////////////////////////////////
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.registredUser = action.payload;
      state.loading = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
    });
    /////////////////////////////////////////////////////////
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.updatedUser = action.payload;
      state.loading = false;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
    });
    // Admin update user
    builder.addCase(AdminUpdateUtilisateur.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(AdminUpdateUtilisateur.fulfilled, (state, action) => {
      state.majUtilisateurAdmin = action.payload;
      state.loading = false;
    });
    builder.addCase(AdminUpdateUtilisateur.rejected, (state, action) => {
      state.loading = false;
    });
    //// getAllUtilisateurs
    builder.addCase(getAllUtilisateurs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUtilisateurs.fulfilled, (state, action) => {
      state.utilisateurslkol = action.payload; // Assurez-vous que les données d'utilisateurs sont correctement stockées ici
      state.loading = false;
    });
    builder.addCase(getAllUtilisateurs.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
